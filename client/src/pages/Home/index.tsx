// import { mockMessages } from '@/mock/messages'
import { mockMessages } from '@/mock/messages'
import { Random } from 'mockjs'
import { useMenuStore } from '../../stores/menu'
import { useMessageStore } from '../../stores/message'
import { useUserStore } from '../../stores/user'
import { User } from '../../types'
import Dashboard from './parts/Dashboard'
import Messages from './parts/Messages'
import NavBar from './parts/NavBar'

const mockData = () => {
    const user: User = {
        id: String(Random.natural),
        name: Random.name(),
        avatar: Random.dataImage(),
        token: Random.cparagraph()
    }

    useUserStore.setState({ user })

    const messages = mockMessages(user)

    useMessageStore.setState({ current: messages[0], messages  })
}

function Home() {

    const activeMenu = useMenuStore(state => state.active)

    mockData()

    console.log()

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
