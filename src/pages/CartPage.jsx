import { useCart } from "../contexts/CartContext";
import formatCurrency from "../utils/formatCurrency";
import classNames from "classnames";
import CartList from "../components/CartList";
import { Link } from "react-router-dom";

function CartPage() {
	const { isDetailsPending, itemDetails, removeItem } = useCart();

	return (
		<>
			<div>CartPage</div>
			{ isDetailsPending && <span className="loading loading-spinner loading-lg"></span> }
			{ !isDetailsPending && <CartList items={itemDetails} onRemove={removeItem}/> }
			<div className="flex justify-between items-center">
				<div className="stats shadow">
					<div className="stat">
						<div className="stat-title">Subtotal:</div>
						<div className="stat-value">
							{ formatCurrency(itemDetails.reduce((prev, curr) => prev + curr.amount * curr.price, 0)) }
						</div>
					</div>
				</div>
				<button 
					className={classNames("btn btn-primary", {
						'btn-disabled': itemDetails == null || itemDetails.length <= 0
					})} 
					disabled={itemDetails == null || itemDetails.length <= 0}
				>
					<Link to="/checkout">Checkout</Link>
				</button>
			</div>
		</>
	);
}

export default CartPage;
