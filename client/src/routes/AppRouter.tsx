import { Routes, Route, Navigate } from "react-router-dom";

// ─── Store Pages ─────────────────────────────────────────
import Home from "../pages/Home";
import CartPage from "../pages/CartPage";
import WishlistPage from "../pages/WishlistPage";

import ProductsPage from "@/features/products/pages/ProductsPage";
import ProductDetails from "@/features/products/pages/ProductDetailsPage";

// ─── Customer Auth ───────────────────────────────────────
import LoginPage from "../features/auth/pages/customer/LoginPage";
import RegisterPage from "../features/auth/pages/customer/RegisterPage";
import ForgotPasswordPage from "../features/auth/pages/customer/ForgotPasswordPage";
import ResetPasswordPage from "../features/auth/pages/customer/ResetPasswordPage";
import VerifyOTPPage from "../features/auth/pages/customer/VerifyOTPPage";

// ─── Admin Auth ──────────────────────────────────────────
import AdminLoginPage from "../features/auth/pages/admin/LoginPage";
import AdminRegisterPage from "../features/auth/pages/admin/RegisterPage";
import AdminForgotPasswordPage from "../features/auth/pages/admin/ForgotPasswordPage";
import AdminVerifyOTPPage from "../features/auth/pages/admin/VerifyOTPPage";
import OrdersPage from "@/features/orders/pages/OrdersPage";
import OrderDetailsPage from "@/features/orders/pages/OrderDetailsPage";

// ─── profile ──────────────────────────────────────────
import ProfilePage from "../features/profile/pages/Profilepage";

// ─── Address ──────────────────────────────────────────
import AddressPage from "../features/address/pages/AddressPage";

const AppRouter = () => {
  return (
    <Routes>

      {/* ─── Store Routes ─── */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/orders/:id" element={<OrderDetailsPage />} />


      <Route path="/cart" element={<CartPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />

      {/* ─── Customer Auth Routes ─── */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify" element={<VerifyOTPPage />} />

      {/* ─── Admin Auth Routes ─── */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/register" element={<AdminRegisterPage />} />
      <Route path="/admin/forgot-password" element={<AdminForgotPasswordPage />} />
      <Route path="/admin/verify" element={<AdminVerifyOTPPage />} />

      {/* ─── Profile Routes ─── */}
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/address" element={<AddressPage />} />

      {/* ─── Fallback ─── */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

export default AppRouter;