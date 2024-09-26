import LayoutMain from '@/layouts/Main'
import LayoutRoot from '@/layouts/Root'
import LayoutTitle from '@/layouts/Title'
import Contacts from '@/pages/Contacts'
import Dashboard from '@/pages/Dashboard'
import ForgotPassword from '@/pages/ForgotPasword'
import Groups from '@/pages/Groups'
import Login from '@/pages/Login'
import Messages from '@/pages/Messages'
import ResetPassword from '@/pages/ResetPassword'
import SearchUser from '@/pages/SearchUser'
import Setting from '@/pages/Setting'
import SignUp from '@/pages/SignUp'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '',
        element: <LayoutRoot/>,
        children: [
            {
                path: '',
                element: <LayoutMain/>,
                children: [
                    {
                        path: '/',
                        element: <Dashboard/>
                    },
                    {
                        path: '/dashboard',
                        element: <Dashboard/>
                    },
                    {
                        path: '/messages',
                        element: <Messages/>
                    },
                    {
                        path: '/groups',
                        element: <Groups/>
                    },
                    {
                        path: '/contacts',
                        element: <Contacts/>
                    },
                    {
                        path: '/search-user',
                        element: <SearchUser/>
                    },
                    {
                        path: '/setting',
                        element: <Setting/>
                    }
                ]
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '',
                element: <LayoutTitle/>,
                children: [
                    
                    {
                        path: '/sign-up',
                        element: <SignUp/>
                    },
                    {
                        path: '/forgot-password',
                        element: <ForgotPassword/>
                    },
                    {
                        path: '/reset-password',
                        element: <ResetPassword/>
                    }

                ]
            }
        ]
    }
])

export default router