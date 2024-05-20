import { useContext } from "react";
import { Context, ContextProvider } from './ToastProvider'

function useToast() {
	const context = useContext(Context);
	if (context == null) {
		throw new Error('Context must be used within a Provider');
	}
	return context;
}

export { ContextProvider as ToastProvider, useToast }
