import { useContext } from "react";
import { Context, ContextProvider } from './ContextProvider';

function useAuthContext() {
	const appContext = useContext(Context);
	if (appContext == null)
		throw new Error('useAuthContext() must be used within the app context')
	return appContext
}

export { ContextProvider as AuthContextProvider, useAuthContext }
