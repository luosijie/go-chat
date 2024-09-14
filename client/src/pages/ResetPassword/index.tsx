import { Lock } from 'lucide-react'

const classItem = `
    flex text-gray-500 gap-2 border mt-8 w-full px-4 rounded-md h-16 items-center
    [&>input]:flex-grow [&>input]:bg-transparent [&>input]:outline-none [&>input]:text-xl
`

const Login = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="text-3xl font-bold"><span className="p-2 text-white bg-black rounded-tl-3xl rounded-br-3xl">Go</span>  chat <span className="mx-5">|</span> Reset Password </div>
            <div className='mt-5 text-lg text-gray-600'>Now please set your new password !</div>
            <div className='w-96'>
                
                <div className={classItem}>
                    <Lock/>
                    <input type="text" placeholder='Password'/>
                </div>
                <div className={classItem}>
                    <Lock/>
                    <input type="text" placeholder='Confirmation'/>
                </div>
                <div className='w-full p-4 bg-black rounded-md text-white mt-5 text-center font-bold text-xl'>
                Submit
                </div>

            </div>
        </div>
    )
}

export default Login
