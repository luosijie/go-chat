import { ArrowLeftCircleIcon, Home } from 'lucide-react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const classIcon = 'text-gray-500 hover:text-black'

const Layout = () => {

    const navigate = useNavigate()

    // navigate(-1)

    return (
        <div className='w-full h-full p-4 flex flex-col cursor-pointer'>
            <div className='flex justify-between'>
                {/* <div className="text-xl font-bold">
                    <span className="p-2 text-white bg-black rounded-tl-3xl rounded-br-3xl">Go</span>  chat 
                </div> */}
                <Link to="/" className={classIcon}>
                    <Home size={28}/>
                </Link>
                <ArrowLeftCircleIcon size={28} className={classIcon} onClick={() => navigate(-1)}/>
            </div>
            <div className='flex-grow'>
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout
