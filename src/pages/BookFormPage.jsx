import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { BOOK_TYPE } from '../data/constants'
import { useAppContext } from '../contexts/AppContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { API } from '../services';
import TextInput from '../components/TextInput';
import Select from '../components/Select';
import makeMap from '../utils/makeMap';
import { useEffect, useMemo } from 'react';
import toApiUrl from '../utils/toApiUrl';
import toDownloadUrl from '../utils/toDownloadUrl'
import Tooltip from '../components/Tooltip';
import { useToast } from '../contexts/Toast';
import { useSearchContext } from '../contexts/SearchContext';
import manip from '../utils/propertyManip'
import classNames from 'classnames';

const bookTypeLabelMap = makeMap([
	[BOOK_TYPE.BOTH, 'Both'],
	[BOOK_TYPE.PHYSICAL, 'Physical'],
	[BOOK_TYPE.E_BOOK, 'E-book'],
])

async function createGetBookRequest({ queryKey }) {
	const [, slug] = queryKey
	const response = await API.getBook(slug)
	return response.data
}

async function createUpdateBookRequest(variables) {
	const response = await API.updateBook(variables.id, variables.data)
	return response.data
}

async function createCreateBookRequest(data) {
	const response = await API.addBook(data)
	return response.data
}

function BookFormPage({ isEdit }) {

	const { genres, authors, publishers } = useAppContext()
	const { slug } = useParams();
	const { data: book, isLoading } = useQuery({
		queryKey: ['getBook', slug],
		queryFn: createGetBookRequest,
		enabled: !!isEdit,
	})

	const { refresh } = useSearchContext() 

	const { show: showToast } = useToast()
	const navigate = useNavigate()
 	const { mutate: updateBook } = useMutation({
		mutationFn: createUpdateBookRequest,
		onSuccess: (data) => {
			showToast(`Successfully update book '${ data.title }'`, 'success')
			refresh()
			navigate('/admin', { state: { shouldRefresh: true } })
		},
		onError: err => {
			console.log(err)
			showToast('Failed to update book', 'error')
		}
	})

	const { mutate: createBook } = useMutation({
		mutationFn: createCreateBookRequest,
		onSuccess: (data) => {
			showToast(`Successfully add new book '${ data.title }'`, 'success')
			refresh()
			navigate('/admin', { state: { shouldRefresh: true } })
		},
		onError: err => {
			console.log(err)
			showToast('Failed to add new book', 'error')
		}
	})

	const validationSchema = yup.object().shape({
		title: yup.string().required('Title is required'),
		slug: yup.string().required('Slug is required').matches(/^[^\s]+$/i, 'Invalid slug'),
		authors: yup.array().required('Author is required').min(1, 'At least 1 author is required'),
		genres: yup.array().required('Genre is required').min(1, 'At least 1 genre is required'),
		bookType: yup.number().required('Book type is required').oneOf(Object.values(BOOK_TYPE)),
		description: yup.string().nullable(),
		publisher: yup.number().required('Publisher is required'),
		publishedDate: yup.date().required('Published date is required'),
		pageCount: yup.number().required('Page count is required').min(1),
		price: yup.number().required('Price is required').min(0),
		file: yup.mixed().when('bookType', (bookType, schema) => 
			bookType !== BOOK_TYPE.PHYSICAL && book?.link == null
				? schema.required('File is required for e-book') 
				: schema
		),
		image: yup.mixed()
	})

	const { 
		register, 
		handleSubmit, 
		reset,
		control,
		watch,
		formState: { errors, isValid },
	} = useForm({ 
		resolver: yupResolver(validationSchema),
		mode: 'onTouched'
	});

	useEffect(() => {
		if (book == null)
			return

		reset({
			title: book.title,
			slug: book.slug,
			authors: book.authors.map(a => a.id),
			genres: book.genres.map(g => g.id),
			bookType: book.book_type,
			description: book.description,
			publisher: book.publisher.id,
			publishedDate: book.published_date,
			pageCount: book.pageCount,
			price: book.price,
		})
	}, [book])

	const processData = async (data) => {

		let fileLink, imageLink
		if (data.file[0] != null)
			fileLink = await API.uploadFile(data.file[0], data.file[0].name)

		if (data.image[0] != null)
			imageLink = await API.uploadImage(data.image[0], data.image[0].name)

		const payload = manip(data)
			.replace('bookType', 'book_type')
			.optional('link', fileLink)
			.optional('image_url', imageLink)
			.finish()
			
		if (isEdit)
			updateBook({ id: book.id, data: payload })
		else
			createBook(payload)
	}

	const genreLabelMap = useMemo(() => {
		if (!genres)
			return new Map()
		else
			return makeMap(genres.map(genre => [genre.id, genre.name]))
	}, [genres])

	const authorLabelMap = useMemo(() => {
		if (!authors)
			return new Map()
		else
			return makeMap(authors.map(author => [author.id, author.name]))
	}, [authors])

	const publisherLabelMap = useMemo(() => {
		if (!publishers)
			return new Map()
		else
			return makeMap(publishers.map(pub => [pub.id, pub.name]))
	}, [publishers])

	return (
		<>
			<Link to="/admin">&lt; Back to book list</Link>
			<div className="flex flex-wrap gap-12 justify-center mt-12">
				<div className="max-w-sm h-full mr-12 flex-shrink-0">
					<img className="rounded" src={book?.image_url && toApiUrl(book.image_url)} alt="thumbnail"/>
				</div>
				<form onSubmit={handleSubmit(processData)} className="flex flex-col gap-4">
					<div className="flex justify-between items-center">
						<h1 className="text-4xl font-bold font-serif m-0">{ isEdit ? 'Edit book' : 'Add new book' }</h1>
						<button type="submit" className={classNames('btn btn-primary', {
							'btn-disabled': !isValid
						})} disabled={!isValid}>Save</button>
					</div>
					<div className="flex flex-wrap gap-4 items-center">
						<TextInput 
							label="Title" 
							placeholder="Enter book title..." 
							errorMessage={errors.title?.message} 
							{ ...register('title') }
							isRequired
						/>
						<TextInput 
							label="Slug" 
							placeholder="Enter slug..." 
							errorMessage={errors.slug?.message} 
							{ ...register('slug') }
							isRequired
						/>
						{/* <button className="btn">Generate</button> */}
					</div>
					<div className="flex flex-wrap gap-4 items-center">
						<Select
							title="Genres"
							labelMap={genreLabelMap}
							isMulti isClearable
							name='genres'
							control={control}
							isRequired
						/>
						<Select
							title="Authors"
							labelMap={authorLabelMap}
							isMulti isClearable
							name='authors'
							control={control}
							isRequired
						/>
						<Select 
							title="Book type"
							labelMap={bookTypeLabelMap}
							name='bookType'
							control={control}
							isRequired
						/>
					</div>
					<TextInput 
						label="Description" 
						placeholder="Enter book description..." 
						errorMessage={errors.description?.message} 
						{ ...register('description') }
						isTextArea
					/>
					<div className="flex flex-wrap gap-4 items-center">
						<Select
							title="Publisher"
							labelMap={publisherLabelMap}
							isClearable
							name='publisher'
							control={control}
							isRequired
						/>
						<TextInput 
							type="date"
							label="Published date" 
							errorMessage={errors.publishedDate?.message} 
							{ ...register('publishedDate') }
							isRequired
						/>
					</div>
					<div className="flex flex-wrap gap-4 items-center">
						<TextInput 
							type="number"
							label="Page count" 
							min={1}
							defaultValue={1}
							errorMessage={errors.pageCount?.message} 
							{ ...register('pageCount') }
							isRequired
						/>
						<TextInput 
							type="number"
							label="Price" 
							min={0}
							defaultValue={0}
							errorMessage={errors.price?.message} 
							{ ...register('price') }
							isRequired
						/>
					</div>
					<div className="flex justify-between">
						<div className="flex flex-wrap gap-4 items-center">
							<div className="flex flex-wrap gap-4 items-center">
								<TextInput 
									type="file"
									label="Upload file"
									disabled={watch('bookType') === BOOK_TYPE.PHYSICAL}
									errorMessage={errors.file?.message} 
									{ ...register('file') }
									isRequired={watch('bookType') !== BOOK_TYPE.PHYSICAL}
								/>
								<TextInput 
									type="file"
									accept="image/jpeg,image/png"
									label="Upload image"
									errorMessage={errors.image?.message} 
									{ ...register('image') }
								/>
							</div>
							{ book?.link && <div>
								<span>Current file: </span>
								<Tooltip tip={book?.link} isVisible>
									 <a href={toDownloadUrl(book.link)} className="ml-1 btn btn-sm">Download</a>
								</Tooltip> 
							</div> }
						</div>
					</div>
				</form>
			</div>
		</>
	)
}

export default BookFormPage