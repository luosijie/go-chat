import UserSelector from '@/components/UserSelector'
import { useFriendStore } from '@/stores/friend'
import { useGroupStore } from '@/stores/group'
import { UserSummary } from '@/types'
import request, { toFormData } from '@/utils/request'
import { Random } from 'mockjs'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const url = import.meta.env.VITE_APP_URL + '/sign-up'


type FormData = {
    name: string
    desc: string
    members: Array<UserSummary>
}

const CreateUsers = () => {
    const navigate = useNavigate()
    const createGroup = useGroupStore(state => state.createGroup)

    const [loading, setLoading] = useState<boolean>(false)

    const [num, setNum] = useState<number>(1)

    const createUsers = async () => {
        console.log(num)
        let successNum = 0

        // const Random = Random
        for (let i = 0; i < num; i++) {
            const data = {

                username: Random.name(),
                email: Random.email(),
                password: '123456',
                confirmation: '123456',

            }
            const res = await request({
                url,
                method: 'POST',
                formData: toFormData(data)
            })

            if (res.success) {
                successNum++
            }
        }

         toast.success( `${successNum} user created`)

         navigate('/search-user')

        console.log(successNum)
    }


    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="text-4xl font-bold mb-5">Create Users</div>
            <div className='border p-3 bg-gray-50 rounded-md mb-10 text-gray-500'>
                Create fake users for testing ...
            </div>
            <div  className='flex flex-col gap-5 w-1/2'>
                
                <div className='w-full flex flex-col relative mb-5 items-center'>
                    {/* <div className='w-full'> */}

                    
                    <input 
                        type="range" placeholder='name'  min={1} max={10} step={1} 
                        className='w-full'
                        value={num}
                        onChange={evt => setNum(Number(evt.target.value))}
                    />  

                    <div className='font-bold text-xl mb-2 mt-5'>Create <span className='text-blue-dark text-2xl mx-2'>{ num }</span> user for testing... </div>
                </div>


                <input type='submit' className='btn' onClick={createUsers}/>
            </div>
        </div>
    )
}

export default CreateUsers
