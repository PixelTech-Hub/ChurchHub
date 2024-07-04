import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import DashboardPage from "./pages";
import ForgotPasswordPage from "./pages/authentication/forgot-password";
import ProfileLockPage from "./pages/authentication/profile-lock";
import ResetPasswordPage from "./pages/authentication/reset-password";
import SignInPage from "./pages/authentication/sign-in";
import SignUpPage from "./pages/authentication/sign-up";
import EcommerceBillingPage from "./pages/e-commerce/billing";
import EcommerceInvoicePage from "./pages/e-commerce/invoice";
import EcommerceProductsPage from "./pages/e-commerce/products";
import KanbanPage from "./pages/kanban";
import MailingComposePage from "./pages/mailing/compose";
import MailingInboxPage from "./pages/mailing/inbox";
import MailingReadPage from "./pages/mailing/read";
import MailingReplyPage from "./pages/mailing/reply";
import NotFoundPage from "./pages/pages/404";
import ServerErrorPage from "./pages/pages/500";
import MaintenancePage from "./pages/pages/maintenance";
import PricingPage from "./pages/pages/pricing";
import UserFeedPage from "./pages/users/feed";
import UserListPage from "./pages/users/list";
import UserProfilePage from "./pages/users/profile";
import UserSettingsPage from "./pages/users/settings";
import AppWrapper from "./components/app-wrapper";
import { useAppSelector } from "./app/hooks";

// Protected route component
const ProtectedRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.user !== null);

  if (!isAuthenticated) {
    return <Navigate to="/authentication/sign-in" replace />;
  }

  return <>{children}</>;
};

const App: FC = function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppWrapper />}>
          {/* Public routes */}
          <Route path="/authentication/sign-in" element={<SignInPage />} />
          <Route path="/authentication/sign-up" element={<SignUpPage />} />
          <Route
            path="/authentication/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route
            path="/authentication/reset-password"
            element={<ResetPasswordPage />}
          />
          <Route
            path="/authentication/profile-lock"
            element={<ProfileLockPage />}
          />
          <Route path="/pages/pricing" element={<PricingPage />} />
          <Route path="/pages/maintenance" element={<MaintenancePage />} />
          <Route path="/pages/404" element={<NotFoundPage />} />
          <Route path="/pages/500" element={<ServerErrorPage />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
            index
          />
          <Route
            path="/mailing/compose"
            element={
              <ProtectedRoute>
                <MailingComposePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mailing/inbox"
            element={
              <ProtectedRoute>
                <MailingInboxPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mailing/read"
            element={
              <ProtectedRoute>
                <MailingReadPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mailing/reply"
            element={
              <ProtectedRoute>
                <MailingReplyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kanban"
            element={
              <ProtectedRoute>
                <KanbanPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/e-commerce/billing"
            element={
              <ProtectedRoute>
                <EcommerceBillingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/e-commerce/invoice"
            element={
              <ProtectedRoute>
                <EcommerceInvoicePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/e-commerce/products"
            element={
              <ProtectedRoute>
                <EcommerceProductsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/feed"
            element={
              <ProtectedRoute>
                <UserFeedPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/list"
            element={
              <ProtectedRoute>
                <UserListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/profile"
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/settings"
            element={
              <ProtectedRoute>
                <UserSettingsPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;