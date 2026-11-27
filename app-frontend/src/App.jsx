import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import CustomerLayout from './components/layout/CustomerLayout';
import MenuPage from './pages/customer/MenuPage';
import MenuDetailPage from './pages/customer/MenuDetailPage';

const App = () => (
    <CartProvider>
        <BrowserRouter>
            <Routes>
                <Route element={<CustomerLayout />}>
                    <Route path="/" element={<MenuPage />} />
                </Route>
                <Route path="/menu/:id" element={<MenuDetailPage />} />
            </Routes>
        </BrowserRouter>
    </CartProvider>
);

export default App;