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
