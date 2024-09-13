import { Lock, Mail, User } from 'lucide-react'
import { Link } from 'react-router-dom'

const classItem = `
    flex text-gray-500 gap-2 border mt-5 w-full h-16 items-center p-4 rounded-md
    [&>input]:outline-none [&>input]:text-lg
`

const Page = () => {
    return (

        <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="text-3xl font-bold"><span className="p-2 text-white bg-black rounded-tl-3xl rounded-br-3xl">Go</span>  chat <span className="mx-5">|</span> Sign Up </div>
            <div className='w-96 mt-5'>
                <div className={classItem}>
                    <User/>
                    <input type="text" placeholder='Username' className='flex-grow'/>
                </div>
                <div className={classItem}>
                    <Mail/>
                    <input type="text" placeholder='Email' className='flex-grow'/>
                </div>
                <div className={classItem}>
                    <Lock/>
                    <input type="text" placeholder='Password' className='flex-grow'/>
                </div>
                <div className={classItem}>
                    <Lock/>
                    <input type="text" placeholder='Confirmatioin' className='flex-grow'/>
                </div>
                <div className='w-full p-4 bg-black rounded-md text-white mt-5 text-center font-bold text-xl'>
                Submit
                </div>

                {/* Actions */}
                <div className='flex justify-center w-full text-gray-500 mt-3'>
                    <Link className='hover:text-black cursor-pointer' to='/login'>Login</Link>
                </div>

            </div>
        </div>
    )
}

export default Page
