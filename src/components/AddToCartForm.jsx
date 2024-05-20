import { useState } from "react"
import { BOOK_TYPE } from "../data/constants"
import Tooltip from "./Tooltip"
import { useCart } from '../contexts/CartContext'
import classNames from "classnames"

function AddToCartForm({ book }) {

	const [eBook, setEBook] = useState(book.book_type === BOOK_TYPE.E_BOOK)
	const [physical, setPhysical] = useState(book.book_type !== BOOK_TYPE.E_BOOK)
	const [amount, setAmount] = useState(1)

	const cart = useCart()
	const physCnt = cart.getPhysicalCount(book.id)
	const eCnt = cart.getEBookCount(book.id)

	const handleAddToCart = () => {
		if (physical)
			cart.addItem(book.id, true, amount)
		if (eBook) {
			cart.addItem(book.id, false)
			setEBook(false)
		}
	}

	return (
		<>
			<div>
				<h4>Book type:</h4>
				<div className="form-control w-fit">
					<Tooltip tip="Unavailable" isVisible={book.book_type === BOOK_TYPE.E_BOOK}>
						<label className="label cursor-pointer flex gap-3">
							<input 
								type="checkbox" 
								className="radio checked:bg-red-500" 
								disabled={book.book_type === BOOK_TYPE.E_BOOK} 
								checked={physical}
								onChange={() => setPhysical(prev => !prev)}
							/>
							<span className="label-text">Physical { physCnt > 0 && <span>({ physCnt } item{ physCnt > 1 ? 's' : '' } in cart)</span> }</span> 
						</label>
					</Tooltip>
				</div>
				<div className="form-control w-fit">
					<Tooltip tip="Unavailable" isVisible={book.book_type === BOOK_TYPE.PHYSICAL}>
						<label className="label cursor-pointer flex gap-3">
							<input 
								type="checkbox" 
								className="radio checked:bg-blue-500" 
								disabled={book.book_type === BOOK_TYPE.PHYSICAL || eCnt > 0 } 
								checked={eBook && eCnt === 0}
								onChange={() => setEBook(prev => !prev)}
							/>
							<span className="label-text">E-book { eCnt > 0 ? '(Already in cart)' : ''}</span> 
						</label>
					</Tooltip>
				</div>
			</div>
			<div className="join max-w-lg flex">
				{ physical && <input 
					type="number"
					min="1" 
					className="input input-bordered join-item w-[6rem]" 
					value={amount}
					onChange={e => setAmount(+e.target.value)}
				/> }
				<button 
					className={classNames("btn btn-primary join-item flex-grow", {
						'btn-disabled': !physical && !eBook
					})}
					onClick={handleAddToCart}
					disabled={!physical && !eBook}
				>Add to cart</button>
			</div>
		</>
	)
}

export default AddToCartForm
