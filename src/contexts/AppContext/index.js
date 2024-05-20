import { useContext } from "react";
import { Context, ContextProvider } from './ContextProvider';

function useAppContext() {
	const appContext = useContext(Context);
	if (appContext == null)
		throw new Error('useAppContext() must be used within the app context')
	return appContext
}

export { ContextProvider as AppContextProvider, useAppContext }