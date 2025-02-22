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
import UserPage from "./pages/Admin/UserPage.jsx";
import CategoryPage from "./pages/Admin/Categories/CategoryPage.jsx";
import UpdateCategoryPage from "./pages/Admin/Categories/UpdateCategoryPage.jsx";
import CreateCategoryPage from "./pages/Admin/Categories/CreateCategoryPage.jsx";
import CreateProductPage from "./pages/Admin/Products/CreateProductPage.jsx";
import ProductPage from "./pages/Admin/Products/ProductPage.jsx";
import UpdateProductPage from "./pages/Admin/Products/UpdateProductPage.jsx";
import CouponPage from "./pages/Admin/Coupons/CouponPage.jsx";
import CreateCouponPage from "./pages/Admin/Coupons/CreateCouponPage.jsx";
import UpdateCouponPage from "./pages/Admin/Coupons/UpdateCuponsPage.jsx";
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
            <Route path="users" element={<UserPage />} />
            <Route path="categories" element={<CategoryPage />} />
            <Route path="categories/:guid" element={<UpdateCategoryPage />} />
            <Route path="categories/create" element={<CreateCategoryPage />} />
            <Route path="products/create" element={<CreateProductPage />} />
            <Route path="products" element={<ProductPage />} />
            <Route path="products/:guid" element={<UpdateProductPage />} />
            <Route path="coupons" element={<CouponPage />} />
            <Route path="coupons/create" element={<CreateCouponPage />} />
            <Route path="coupons/:guid" element={<UpdateCouponPage />} />
        </Route>
    </Routes>
  );
}

export default App;
