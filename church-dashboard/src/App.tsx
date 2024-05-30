import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { AppPage, BlogPage, ChurchBranchPage, ChurchEmployeesPage, ChurchMemberPage, ChurchMinistriesPage, ChurchServicePage, ChurchesPage, HomePage, Login, NewStaff, SingleBlog, SingleChurchBranch, SingleStaff } from '@/pages'
import AppLayout from './components/layout/AppLayout'
import HomeLayout from './components/layout/HomeLayout'

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path='/' element={<HomeLayout />} >
            <Route path='/' element={<HomePage />} />


          </Route>


          <Route path='/app' element={<AppLayout />} >
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

          <Route path='/login' element={<Login />} />

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
    </>
  )
}

export default App
