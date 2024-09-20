import clsx from 'clsx'
import { LayoutDashboard, LucideProps, MessageCircle, Settings, Star, Users } from 'lucide-react'
import React, { ForwardRefExoticComponent } from 'react'
import { useLocation, useNavigate, useNavigation, useRoutes } from 'react-router-dom'
import { useMenuStore } from '../stores/menu'
type Menu = {
    name: string
    Icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
}

const menuData: Array<Menu> = [
    {
        name: 'Dashboard',
        Icon: LayoutDashboard
    },
    {
        name: 'Messages',
        Icon: MessageCircle
    },
    {
        name: 'Groups',
        Icon: Users
    },
    {
        name: 'Favorites',
        Icon: Star
    },
    {
        name: 'Setting',
        Icon: Settings
    }
]

const Menu = () => {

    // const route = useNavigation()
    const navigate = useNavigate()
    const location = useLocation()

    const isActive = (name:string) => {
        return location.pathname === `/${name.toLowerCase()}`
    }

    return (
        
        <div className="px-5 flex-grow">
            {
                menuData.map(e => (
                    <div 
                        key={e.name} 
                        className={clsx(
                            'text-gray-500 flex items-center gap-4 my-2 p-2 rounded-xl  text-base cursor-pointer',
                            {
                                ' border-gray-100 bg-white font-bold [&>span]:text-black': isActive(e.name)
                            }
                        )}
                        onClick={() => navigate(e.name.toLocaleLowerCase())}
                    >
                        <e.Icon size={18}/>
                        <span>{ e.name }</span>
                    </div>
                ))
            }	
        </div>
    )
}

export default Menu
