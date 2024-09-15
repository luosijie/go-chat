import FormInput from '@/components/FormInput'
import { Lock, User } from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

type FormData = {
    username: string
    password: string
}

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

    const onSubmit:SubmitHandler<FormData> = (data:FormData) => {
        if (loading) return
        setLoading(true)
        console.log('--submit--', data)
    }

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <div className="text-3xl font-bold"><span className="p-2 text-white bg-black rounded-tl-3xl rounded-br-3xl">Go</span>  chat <span className="mx-5">|</span> Login </div>
            <form onSubmit={handleSubmit(onSubmit)} className='w-96'>
                <FormInput Icon={User} error={errors.username}>
                    <input 
                        placeholder='Username'
                        { ...register('username',  {
                            required: 'Username is required' 
                        })}
                    />
                </FormInput>
                
                <FormInput Icon={Lock} error={errors.password}>
                    <input 
                        placeholder='Password'
                        { ...register('password', 
                            { required: 'Passowrd is required' },
                        )}
                    />
                </FormInput>

                <input type='submit' className='button'/>

                {/* Actions */}
                <div className='flex justify-between w-full text-gray-500 mt-3'>
                    <Link className='hover:text-black cursor-pointer' to='/forgot-password'>Forgot password ?</Link>
                    <Link className='hover:text-black cursor-pointer' to='/sign-up'>Sign up</Link>
                </div>

            </form>
        </div>
    )
}

export default Login
