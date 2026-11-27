import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import CustomerLayout from './components/layout/CustomerLayout';
import MenuPage from './pages/customer/MenuPage';

const App = () => (
    <CartProvider>
        <BrowserRouter>
            <Routes>
                <Route element={<CustomerLayout />}>
                    <Route path="/" element={<MenuPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </CartProvider>
);

export default App;