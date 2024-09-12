import { Random } from 'mockjs'
import { mockMessages } from './mock/messages'
import Dashboard from './parts/Dashboard'
import Messages from './parts/Messages'
import NavBar from './parts/NavBar'
import { useMenuStore } from './stores/menu'
import { useMessageStore } from './stores/message'
import { useUserStore } from './stores/user'
import { User } from './types'

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

function App() {

    const activeMenu = useMenuStore(state => state.active)

    mockData()

    console.log()

    return (
        < div className="w-screen h-screen flex justify-center items-center text-black">
            {/* <img className='absolute ring-0 top-0 -z-10' src="/images/bg-blur.png" alt="bg" /> */}
            <div className="w-11/12 h-5/6 bg-gray-light rounded-xl overflow-hidden relative flex py-2 pr-2">
			 	{/* navbar */}
                <NavBar/>
                {/* chat */}
                <div className="h-full flex-grow  bg-white rounded-xl border border-gray-200">
                    { activeMenu === 'Dashboard' && <Dashboard/> }
                    { activeMenu === 'Messages' && <Messages/> }
                </div>
                {/* info */}
                {/* <div className="w-52 h-full"></div> */}
            </div>
        </div>
    )
}

export default App
