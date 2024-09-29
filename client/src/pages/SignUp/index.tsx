
import FormInput from '@/components/FormInput'
import ImageUploader from '@/components/ImageUploader'
import patterns from '@/config/patterns'
import request, { toFormData } from '@/utils/request'
import { Lock, Mail, User } from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const url = import.meta.env.VITE_APP_URL + '/sign-up'

type FormData = {
    username: string
    email: string
    password: string
    confirmation: string
}

const Page = () => {
    const navigate = useNavigate()
    
    const [loading, setLoading] = useState<boolean>(false)
    const [avatar, setAvatar] = useState<File | null>(null)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    
    const onSubmit:SubmitHandler<FormData> = async (data:FormData) => {
       
        if (data.password !== data.confirmation) {
            toast.error('Password and Confirmation not match')
            return
        }

        if (loading) return

        setLoading(true)

       

        const form = {
            avatar,
            ...data
        }

        const res = await request({
            url,
            method: 'POST',
            formData: toFormData(form)
        })


        setLoading(false)

        console.log('--submit--', data)

        if (res.success) {
            toast.success('Sign up success!')
            navigate('/login')
        }
    }

    const onFileChange = (file:File | null) => {
        setAvatar(file)
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
                        { ...register('username', { 
                            required: 'Username is required',
                            minLength: {  value: 4, message: 'At least 4 charactor' },
                            maxLength: {  value: 20, message: 'At max 20 charactor' },
                            pattern: { value: patterns.username.value, message: patterns.username.desc }
                        })}
                    />
                </FormInput>

                <FormInput Icon={Mail} error={errors.email}>
                    <input 
                        type="text" placeholder='Email' className='flex-grow'
                        { ...register('email',  { 
                            required: 'Email is required',
                            pattern: { value: patterns.email.value, message: 'email incorrect' },
                        }) }
                    />
                </FormInput>

                <FormInput Icon={Lock} error={errors.password}>
                    <input 
                        type="password" placeholder='Password' className='flex-grow'
                        { ...register('password',  { 
                            required: 'Password is required',
                            minLength: {  value: 6, message: 'At least 6 charactor' },
                            maxLength: {  value: 20, message: 'At least 20 charactor' }
                        })}
                    />
                </FormInput>

                <FormInput Icon={Lock} error={errors.confirmation}>
                    <input 
                        type="password" placeholder='Confirmatioin' className='flex-grow'
                        { ...register('confirmation', 
                            { required: 'Confirmation is required' }
                        ) }
                    />
                </FormInput>

                <input type="submit" className='btn'/>
            </form>

            {/* Actions */}
            <div className='flex justify-center w-full text-gray-500 mt-3'>
                <Link className='hover:text-black cursor-pointer' to='/login'>To login</Link>
            </div>
            
        </div>
    )
}

export default Page
