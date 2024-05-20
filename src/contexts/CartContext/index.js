import { useContext } from "react";
import { Context, ContextProvider } from './ContextProvider';

function useCartContext() {
	const cartContext = useContext(Context);
	if (cartContext == null)
		throw new Error('useAuthContext() must be used within a provider')
	return cartContext
}

export { ContextProvider as CartProvider, useCartContext as useCart }
