import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardPage from "./pages";
import ForgotPasswordPage from "./pages/authentication/forgot-password";
import ProfileLockPage from "./pages/authentication/profile-lock";
import ResetPasswordPage from "./pages/authentication/reset-password";
import SignInPage from "./pages/authentication/sign-in";
import SignUpPage from "./pages/authentication/sign-up";
import NotFoundPage from "./pages/pages/404";
import ServerErrorPage from "./pages/pages/500";
import MaintenancePage from "./pages/pages/maintenance";
import PricingPage from "./pages/pages/pricing";
import AppWrapper from "./components/app-wrapper";
import { useAppSelector } from "./app/hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import ChurchStaffPage from "./pages/church-staff";
import ChurchMembersPage from "./pages/church-members/ChurchMembersPage";

// Protected route component
const ProtectedRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.auth.data !== null);

  if (!isAuthenticated) {
    return <Navigate to="/authentication/sign-in" replace />;
  }

  return <>{children}</>;
};

const App: FC = function () {
  return (
    <>
      <ToastContainer
        theme="colored"
        position="top-right"
        className="toast-container absolute top-0 right-44 mt-10"
      ></ToastContainer>
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
            
          />
          <Route
            path="/users/church-staffs"
            element={
                <ChurchStaffPage />
            }
            
          />
          <Route
            path="/users/church-members"
            element={
                <ChurchMembersPage />
            }
            
          />
          {/* <Route
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
              
                <KanbanPage />
            }
          />
          <Route
            path="/e-commerce/billing"
            element={
              // <ProtectedRoute>
                <EcommerceBillingPage />
              // </ProtectedRoute>
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
              // <ProtectedRoute>
                <EcommerceProductsPage />
              // </ProtectedRoute>
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
          /> */}
        </Route>
      </Routes>
    </>
  );
};

export default App;