import { useContext } from "react";
import { Context, ContextProvider } from './ContextProvider';

function useSearchContext() {
	const searchContext = useContext(Context);
	if (searchContext == null)
		throw new Error('useSearchContext() must be used within a provider')
	return searchContext
}

export { ContextProvider as SearchContextProvider, useSearchContext }
