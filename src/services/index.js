import login from "./auth/login"
import register from "./auth/register"
import getProfile from "./auth/getProfile"
import getGenres from "./getGenres"
import getAuthors from './getAuthors';
import getPublishers from './getPublishers'
import getBooks from "./books/getBooks"
import getBook from './books/getBook'
import addBook from "./books/addBook"
import updateBook from "./books/updateBook"
import deleteBook from "./books/deleteBook"
import checkout from "./checkout"
import uploadFile from './uploadFile'

export const API = {
	login,
	register,
	getProfile,
	getGenres,
	getAuthors,
	getPublishers,
	getBooks,
	getBook,
	addBook,
	updateBook,
	deleteBook,
	checkout,
	uploadFile: (file, filename) => uploadFile(file, filename, ''),
	uploadImage: (file, filename) => uploadFile(file, filename, 'images/thumbnails/'),
}