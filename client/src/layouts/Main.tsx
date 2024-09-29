// import { mockMessages } from '@/mock/messages'
import NavBar from '@/components/NavBar'
import { useUserStore } from '@/stores/user'
import { useWsStore } from '@/stores/ws'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'


function Main() {
    const navigate = useNavigate()
    const user = useUserStore(state => state.user)
    const initWs = useWsStore(state => state.init)

    
    
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
        initWs()
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
