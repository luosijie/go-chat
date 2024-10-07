import { Outlet } from 'react-router-dom'
 
const Root = () => {
    return (
        < div className="w-screen h-screen flex justify-center items-center text-black dark:bg-black">
            <div className="w-11/12 h-5/6 bg-gray-light rounded-xl overflow-hidden relative flex py-2 pr-2">
                <Outlet/>
            </div>
        </div>
    )
}

export default Root
