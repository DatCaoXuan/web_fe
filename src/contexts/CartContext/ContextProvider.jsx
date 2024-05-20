import { createContext, useEffect, useMemo, useRef, useState } from "react"
import { CART_KEY } from "../../data/constants"
import { API } from "../../services";
import { useQueries } from "@tanstack/react-query";

const Context = createContext(null)

async function createGetBookRequest({ queryKey }) {
	const [, slug] = queryKey;
	const response = await API.getBook(slug);
	return response.data;
}

function ContextProvider({ children }) {

	const [cart, setCart] = useState([])
	const touched = useRef(false)

	useEffect(() => {
		const items = JSON.parse(localStorage.getItem(CART_KEY))
		setCart(items || [])
	}, [])

	useEffect(() => {
		if (touched.current)
			localStorage.setItem(CART_KEY, JSON.stringify(cart))
	}, [cart])

	const results = useQueries({
		queries: cart.map((item) => ({
			queryKey: ["getBook", item.bookId],
			queryFn: createGetBookRequest,
		})),
		combine: (results) => ({
			data: results.flatMap((res) => res.data != null ? [res.data] : [] ),
			isPending: results.some((res) => res.isPending),
		}),
	});

	const itemDetails = useMemo(() => cart.map(item => {
		if (results.data == null)
			return []

		const book = results.data.find(b => b.id === item.bookId)
		return { ...book, ...item }
	}), [results.data, cart])

	const addItem = (bookId, isPhysical, amount) => {
		touched.current = true
		const item = cart.find(it => it.bookId === bookId && it.isPhysical === isPhysical)
		
		if (item != null) {
			if (isPhysical) {
				setCart(prev => prev.map(it => it === item ? {
						...item,
						amount: item.amount + amount,
					} : it
				))
			} else {
				console.log('Aready added!')
			}
		} else {
			setCart(prev => [ ...prev, {
				bookId,
				isPhysical,
				amount: isPhysical ? amount : 1,
			} ])
		}
	}

	const removeAll = () => {
		setCart([])
		localStorage.removeItem(CART_KEY)
	}

	const removeItem = (bookId, isPhysical) => {
		touched.current = true
		setCart(prev => prev.filter(it => it.bookId !== bookId || it.isPhysical !== isPhysical))
	}

	const setAmount = (bookId, isPhysical, amount) => {
		touched.current = true
		if (amount == null || isNaN(amount) || amount <= 0 )
			return

		setCart(prev => prev.map(
			it => it.bookId === bookId && it.isPhysical === isPhysical ? {
				...it,
				amount,
			} : it
		))
	}

	const getItemCount = (bookId) => {
		const physItem = cart.find(it => it.bookId === bookId && it.isPhysical)
		const eItem = cart.find(it => it.bookId === bookId && !it.isPhysical)
		return {
			physical: physItem != null ? physItem.amount : 0,
			eBook: eItem != null ? 1 : 0,
		}
	}

	const getPhysicalCount = (bookId) => {
		const physItem = cart.find(it => it.bookId === bookId && it.isPhysical)
		return physItem != null ? physItem.amount : 0
	}

	const getEBookCount = (bookId) => {
		const eItem = cart.find(it => it.bookId === bookId && !it.isPhysical)
		return eItem != null ? 1 : 0
	}

	return (
		<Context.Provider value={{
			items: cart,
			addItem,
			removeItem,
			getItemCount,
			getEBookCount,
			getPhysicalCount,
			setAmount,
			removeAll,
			itemDetails,
			isDetailsPending: results.isPending,
		}}>{ children }</Context.Provider>
	)
}

export { ContextProvider, Context }
