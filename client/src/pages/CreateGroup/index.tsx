import UserSelector from '@/components/UserSelector'
import { useFriendStore } from '@/stores/friend'
import { useGroupStore } from '@/stores/group'
import { UserSummary } from '@/types'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

type FormData = {
    name: string
    desc: string
    members: Array<UserSummary>
}

const CreateGroup = () => {
    const navigate = useNavigate()
    const createGroup = useGroupStore(state => state.createGroup)

    const [loading, setLoading] = useState<boolean>(false)

    const friends = useFriendStore(state => state.list)

    const { control, register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            name: '',
            desc: '',
            members: []
        }
    })


    const getFriendList = useFriendStore(state => state.getList)
    useEffect(() => {
        getFriendList()
    }, [])
    
    const onSubmit:SubmitHandler<FormData> = async (data:FormData) => {
        console.log('2', data)
        // data.members = data.members.map(e => e.id)

        const memberIds = data.members.map(e => e.id)

        if (loading) return
        setLoading(true)

        const success = await createGroup(data.name, data.desc, memberIds)

        if (success) {

            toast.success('Create group success!')
            navigate('/groups')
        }

        setLoading(false)
    }

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="text-4xl font-bold mb-10">Create Group</div>
            <form onSubmit={handleSubmit(onSubmit)}  className='flex flex-col gap-5 w-1/2'>
                
                <div className='w-full flex flex-col relative mb-5'>
                    <div className='font-bold mb-2'>Name</div>
                    <input 
                        type="text" placeholder='name' className='input'
                        { ...register('name',  {
                            required: 'Name is required' 
                        })}
                    />  
                    { errors.name && <div className='text-red-600 absolute -bottom-7'>{ errors.name.message }</div> }
                </div>

                <div className='w-full flex flex-col'>
                    <div className='font-bold mb-2'>Description</div>
                    <textarea 
                        className='input' placeholder='description' rows={6}
                        { ...register('desc') }
                    />
                </div>

                <div className='w-full flex flex-col relative mb-5'>
                    <div className='font-bold mb-2'>Members</div>
                    <Controller 
                        name='members'
                        control={control}
                        rules={{ required: 'Members is reqiured' }}
                        render={({ field }) => (
                             <UserSelector 
                                list={friends} 
                                {...field}
                            />
                        )}
                    />
                    {/* <input type="hidden" { ...register('members') } value={members} /> */}
                    { errors.members && <div className='text-red-600 absolute -bottom-7'>{ errors.members.message }</div> }
                </div>

                <input type='submit' className='btn'/>
            </form>
        </div>
    )
}

export default CreateGroup
