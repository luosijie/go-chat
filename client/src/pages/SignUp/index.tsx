
import FormInput from '@/components/FormInput'
import ImageUploader from '@/components/ImageUploader'
import patterns from '@/config/patterns'
import { Lock, Mail, User } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

type FormData = {
    username: string
    email: string
    password: string
    confirmation: string
}

const Page = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    
    const onSubmit:SubmitHandler<FormData> = (data:FormData) => {
        console.log('--submit--', data)
    }

    const onFileChange = (file:File | null) => {
        console.log(file)
    }

    return (

        <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="text-3xl font-bold"><span className="p-2 text-white bg-black rounded-tl-3xl rounded-br-3xl">Go</span>  chat <span className="mx-5">|</span> Sign Up </div>
            <form onSubmit={handleSubmit(onSubmit)} className='w-96 mt-5'>
                <div className="flex justify-center">
                    <ImageUploader onChange={onFileChange}/>
                </div>

                <FormInput Icon={User} error={errors.username}>
                    <input 
                        placeholder='Username' className='flex-grow'
                        { ...register('username', 
                            { required: 'Username is required' },
                        )}
                    />
                </FormInput>

                <FormInput Icon={Mail} error={errors.email}>
                    <input 
                        type="text" placeholder='Email' className='flex-grow'
                        { ...register('email',  { 
                            required: 'Email is required',
                            pattern: {
                                value: patterns.email,
                                message: 'Email incorrect'
                            }
                        }) }
                    />
                </FormInput>

                <FormInput Icon={Lock} error={errors.password}>
                    <input 
                        type="text" placeholder='Password' className='flex-grow'
                        { ...register('password', 
                            { required: 'Password is required', maxLength: 10 }
                        ) }
                    />
                </FormInput>

                <FormInput Icon={Lock} error={errors.confirmation}>
                    <input 
                        type="text" placeholder='Confirmatioin' className='flex-grow'
                        { ...register('confirmation', 
                            { required: 'Confirmation is required' }
                        ) }
                    />
                </FormInput>

                <input type="submit" className='button'/>
            </form>

            {/* Actions */}
            <div className='flex justify-center w-full text-gray-500 mt-3'>
                <Link className='hover:text-black cursor-pointer' to='/login'>To login</Link>
            </div>
            
        </div>
    )
}

export default Page
