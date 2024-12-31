import {useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage"
import ContactPage from "./pages/ContactPage";
import AuthPage from "./pages/AuthPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import BlogPage from "./pages/BlogPage";
import CartPage from "./pages/CartPage";
import AdminUserPage from "./pages/admin/AdminUserPage.jsx";
import "./App.css";

function App() {
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const currentTime = new Date().getTime();
            const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;

            if (currentTime - new Date(user.timestamp).getTime() > oneWeekInMillis) {
                localStorage.removeItem('user');
            }
        }
    }, []);
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetailsPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/admin/*">
            <Route path="users" element={<AdminUserPage />} />
        </Route>
    </Routes>
  );
}

export default App;
