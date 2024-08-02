import { FC, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import ChurchStaffPage from "./pages/church-staff";
import ChurchMembersPage from "./pages/church-members/ChurchMembersPage";
import UserProfilePage from "./pages/users/profile";
import UserSettingsPage from "./pages/users/settings";
import UserListPage from "./pages/users/list";
import UserFeedPage from "./pages/users/feed";
import EcommerceProductsPage from "./pages/e-commerce/products";
import EcommerceInvoicePage from "./pages/e-commerce/invoice";
import EcommerceBillingPage from "./pages/e-commerce/billing";
import KanbanPage from "./pages/kanban";
import MailingReplyPage from "./pages/mailing/reply";
import MailingReadPage from "./pages/mailing/read";
import MailingInboxPage from "./pages/mailing/inbox";
import MailingComposePage from "./pages/mailing/compose";
import SingleChurchStaff from "./pages/church-staff/SingleChurchStaff";
import SingleChurchMember from "./pages/church-members/SingleChurchMember";
import ChurchMinistryPage from "./pages/church-staff/church-ministries/ChurchMinistryPage";
import SingleChurchMinistry from "./pages/SingleChurchMinistry";
import { ChurchService } from "./pages/main";
import ChurchPage from "./pages/churches";
import SingleChurchPage from "./pages/churches/SingleChurchPage";
import ChurchAdminPage from "./pages/church-admin";
import SystemAdminPage from "./pages/system-admin";
import { useAppDispatch } from "./app/hooks";
import { initializeFromLocalStorage } from "./features/auth/authSlice";

// Protected route component
const ProtectedRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
  // const auth = useAppSelector((state) => state.auth);

  const location = useLocation();
  const dispatch = useAppDispatch();

  const auth = localStorage.getItem('accessToken');

  useEffect(() => {
    dispatch(initializeFromLocalStorage());
  }, [dispatch]);

  if (!auth) {
    // Redirect to the sign-in page, but save the current location
    return <Navigate to="/authentication/sign-in" state={{ from: location }} replace />;
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
            path="/hub-admin"
            element={
              <ProtectedRoute>
                <SystemAdminPage />
              </ProtectedRoute>
            }

          />
          <Route
            path="/churches"
            element={
              <ProtectedRoute>
                <ChurchPage />
              </ProtectedRoute>
            }

          />
          <Route
            path="/churches/:id"
            element={
              <ProtectedRoute>
                <SingleChurchPage />
              </ProtectedRoute>
            }

          />
          <Route
            path="/church-admin"
            element={
              <ProtectedRoute>
                <ChurchAdminPage />
              </ProtectedRoute>
            }

          />
          <Route
            path="/church-admin/:id"
            element={
              <ProtectedRoute>
                <SingleChurchPage />
              </ProtectedRoute>
            }

          />
          <Route
            path="/church-services"
            element={
              <ProtectedRoute>
                <ChurchService />
              </ProtectedRoute>
            }

          />
          <Route
            path="/church-ministries"
            element={
              <ProtectedRoute>
                <ChurchMinistryPage />
              </ProtectedRoute>
            }

          />
          <Route
            path="/church-ministries/:id"
            element={
              <ProtectedRoute>
                <SingleChurchMinistry />
              </ProtectedRoute>
            }

          />
          <Route
            path="/users/church-staffs"
            element={
              <ProtectedRoute>
                <ChurchStaffPage />
              </ProtectedRoute>
            }

          />
          <Route
            path="/users/church-staffs/:id"
            element={
              <ProtectedRoute>
                <SingleChurchStaff />
              </ProtectedRoute>
            }

          />
          <Route
            path="/users/church-members"
            element={
              <ProtectedRoute>
                <ChurchMembersPage />
              </ProtectedRoute>
            }

          />
          <Route
            path="/users/church-members/:id"
            element={
              <ProtectedRoute>
                <SingleChurchMember />
              </ProtectedRoute>
            }

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
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;