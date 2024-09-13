import { ArrowLeftCircleIcon, Home } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className='w-full h-full p-4 flex flex-col'>
            <div className='flex justify-between'>
                {/* <div className="text-xl font-bold">
                    <span className="p-2 text-white bg-black rounded-tl-3xl rounded-br-3xl">Go</span>  chat 
                </div> */}
                <Link to="/">
                    <Home size={28}/>
                </Link>
                <ArrowLeftCircleIcon size={28}/>
            </div>
            <div className='flex-grow'>
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout
