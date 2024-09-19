// import { mockMessages } from '@/mock/messages'
import { mockMessages } from '@/mock/messages'
import { userStorage } from '@/utils/storage'
import { Random } from 'mockjs'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useMenuStore } from '../../stores/menu'
import { useMessageStore } from '../../stores/message'
import { useUserStore } from '../../stores/user'
import { User } from '../../types'
import Dashboard from './parts/Dashboard'
import Messages from './parts/Messages'
import NavBar from './parts/NavBar'

const mockData = () => {
    const user: User = {
        username: Random.name(),
        email: Random.email(),
        avatar: Random.dataImage(),
        token: Random.cparagraph()
    }

    useUserStore.setState({ user })

    const messages = mockMessages(user)

    useMessageStore.setState({ current: messages[0], messages  })
}

function Home() {
    const navigate = useNavigate()
    const { user } = useUserStore()
    // setUser()

    const activeMenu = useMenuStore(state => state.active)

    // mockData()

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
                { activeMenu === 'Dashboard' && <Dashboard/> }
                { activeMenu === 'Messages' && <Messages/> }
            </div>
        </>
    )
}

export default Home
