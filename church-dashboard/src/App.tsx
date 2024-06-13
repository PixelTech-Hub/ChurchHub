import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { AppPage, BlogPage, ChurchBranchPage, ChurchEmployeesPage, ChurchMemberPage, ChurchMinistriesPage, ChurchServicePage, ChurchesPage, ForgotPassword, LockScreen, Login, NewStaff, NotFound, ProtectedRoute, ResetPassword, SingleBlog, SingleChurchBranch, SingleStaff, UnAuthorizedPage } from '@/pages'
// import AppLayout from './components/layout/AppLayout'
import { AuthProvider } from './context/AuthProvider'
import AppLayout from './components/layout/AppLayout'

function App() {

  return (
    <>
      {/* <AuthProvider> */}
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
            {/* Public routes */}
            <Route path='/login' element={<Login />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/lock' element={<LockScreen />} />


            {/* Private routes */}
            {/* <Route element={
              <ProtectedRoute />
            }
            > */}
              <Route element={<AppLayout />}>


                <Route path='/app' element={<AppPage />} />
                <Route path='churches' element={<ChurchesPage />} />
                <Route path='church-branches' element={<ChurchBranchPage />} />
                <Route path="church-branches/:id" element={<SingleChurchBranch />} />
                <Route path='church-services' element={<ChurchServicePage />} />
                <Route path='church-ministries' element={<ChurchMinistriesPage />} />
                <Route path='blogs' element={<BlogPage />} />
                <Route path='blogs/:id' element={<SingleBlog />} />
                <Route path='church-staff' element={<ChurchEmployeesPage />} />
                <Route path='church-staff/:id' element={<SingleStaff />} />
                <Route path='church-staff/new' element={<NewStaff />} />
                <Route path='church-members' element={<ChurchMemberPage />} />
              </Route>
            {/* </Route> */}


            <Route path='/unauthorized' element={<UnAuthorizedPage />} />
            <Route path='*' element={<NotFound />} />

          </Routes>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: '',
              duration: 5000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              // Default options for specific types
              success: {
                duration: 3000,
              },
            }}
          />

        </ThemeProvider>
      {/* </AuthProvider> */}
    </>
  )
}

export default App
