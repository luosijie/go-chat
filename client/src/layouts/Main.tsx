// import { mockMessages } from '@/mock/messages'
import NavBar from '@/components/NavBar'
import { useUserStore } from '@/stores/user'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'


function Main() {
    const navigate = useNavigate()
    const { user } = useUserStore()
    
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user])


    return (
        <>
            {/* navbar */}
            <NavBar/>
            {/* chat */}
            <div className="h-full flex-grow  bg-white rounded-xl border border-gray-200">
                <Outlet/>
            </div>
        </>
    )
}

export default Main
