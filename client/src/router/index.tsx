import LayoutMain from '@/layouts/Main'
import LayoutTitle from '@/layouts/Title'
import ForgotPassword from '@/pages/ForgotPasword'
import Login from '@/pages/Login'
import ResetPassword from '@/pages/ResetPassword'
import SignUp from '@/pages/SignUp'
import { useUserStore } from '@/stores/user'
import { userStorage } from '@/utils/storage'
import { createBrowserRouter, redirect } from 'react-router-dom'
import Home from '../pages/Home'

const router = createBrowserRouter([
    {
        path: '',
        element: <LayoutMain/>,
        children: [
            {
                path: '/',
                // loader: async() => {
                //     const user = userStorage.get()
                //     // setUser()
                //     if (user === null) {
                //         redirect('/login')
                //     }
                //     return null
                // },
                element: <Home/>,
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