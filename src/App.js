import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AppLayout from './layouts/AppLayout';
import RegisterPage from './pages/RegisterPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from './contexts/Toast';
import { AppContextProvider } from './contexts/AppContext';
import AccountPage from './pages/AccountPage';
import SearchPage from './pages/SearchPage';
import DetailsPage from './pages/DetailsPage';
import CartPage from './pages/CartPage';
import CheckoutFormPage from './pages/CheckoutFormPage';
import AdminPage from './pages/AdminPage';
import BookFormPage from './pages/BookFormPage';

const queryClient = new QueryClient();

function App() {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<ToastProvider>
					<AppContextProvider>
						<Routes>
							<Route path="/" element={<AppLayout />}>
								<Route index element={<HomePage />} />
								<Route path="login" element={<LoginPage />} />
								<Route path="register" element={<RegisterPage />} />
								<Route path="account" element={<AccountPage />} />
								<Route path="search" element={<SearchPage />} />
								<Route path="book/:slug" element={<DetailsPage />}/>
								<Route path="cart" element={<CartPage />} />
								<Route path="checkout" element={<CheckoutFormPage />} />
								<Route path="admin" element={<AdminPage />} />
								<Route path="admin/add/" element={<BookFormPage />} />
								<Route path="admin/edit/:slug" element={<BookFormPage isEdit/>} />
								<Route path="*" element={<h1>404 Not Found</h1>} />
							</Route>
						</Routes>
					</AppContextProvider>
				</ToastProvider>
			</QueryClientProvider>
		</BrowserRouter>
	);
}

export default App;
