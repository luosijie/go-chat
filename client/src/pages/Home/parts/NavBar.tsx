
import Menu from '../../../components/Menu'
import ModeToggle from '../../../components/ModeToggle'

const NavBar = () => {

    return (
        <div className="w-52 h-full flex flex-col justify-between">
            <div className="flex items-center gap-2 py-4 px-5">
                <span className=' bg-black text-white font-bold p-1 rounded-tl-xl rounded-br-xl'>Go</span>
                <span className='text-lg font-bold'>chat</span>
            </div>
            
            {/* Menu */}
            <Menu/>
            {/* Toggle mode */}
            <ModeToggle/>

            {/* info */}
            <div className="border-t p-5 flex gap-2 items-center">
                <img src="" alt="" className='size-12 rounded-full bg-gray-400'/>
                <div>
                    <div className="text-base font-bold">Jaysee Luo</div>
                    <div className="text-sm text-gray-500">Luosj@163.com</div>
                </div>
            </div>
        </div>
    )
}

export default NavBar
