import { createContext, useCallback } from 'react';
import toast from 'react-hot-toast'
import Toast from '../../components/Toast';

const Context = createContext(null);

function ContextProvider({ children }) {

	const show = useCallback((content, type='info') => {
		toast(content, { type, duration: 5000 })
	}, [])

	return (
		<Context.Provider value={{ show }}>
			{ children }
			<Toast />
		</Context.Provider>
	);
}

export { ContextProvider, Context };
