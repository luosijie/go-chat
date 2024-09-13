import LayoutMain from '@/layouts/Main'
import LayoutTitle from '@/layouts/Title'
import ForgotPassword from '@/pages/ForgotPasword'
import Login from '@/pages/Login'
import SignUp from '@/pages/SignUp'
import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'

const router = createBrowserRouter([
    {
        path: '',
        element: <LayoutMain/>,
        children: [
            {
                path: '/',
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
                    }

                ]
            }
        ]
    }
])

export default router