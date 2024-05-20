const TOKEN_KEY = 'token'
const USER_KEY = 'user_id'
const CART_KEY = 'cart'

const SEARCH_TYPE = Object.freeze({
	NAME: 0,
	AUTHOR: 1,
})

const BOOK_TYPE = Object.freeze({
	BOTH: 0,
	PHYSICAL: 1,
	E_BOOK: 2,
})

const USER_ROLE = Object.freeze({
	CUSTOMER: 0,
	ADMIN: 1,
})

export { TOKEN_KEY, USER_KEY, SEARCH_TYPE, BOOK_TYPE, CART_KEY, USER_ROLE }
