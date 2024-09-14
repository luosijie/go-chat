import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
// import App from './App.tsx'
import { Toaster } from 'react-hot-toast'
import './index.css'
import router from './router'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
        <Toaster/>
    </StrictMode>,
)
