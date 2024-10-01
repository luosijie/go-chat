import { Group, GroupType, MultipleGroup, SingleGroup } from '@/types'
import clsx from 'clsx'

type Props = {
    className?: string
    group?: Group
}

const Avatar = ({className, group}:Props) => {
    const singleGroup = group as SingleGroup
    const multipleGroup = group as MultipleGroup
  return (
    <div className={clsx('size-12 rounded-full bg-black flex justify-center items-center text-white text-2xl font-bold', className)}>
        {
            !group && <>?</> 
        }
        {
            singleGroup.type === GroupType.Single && <>
                { 
                    singleGroup.to.avatar ?
                    <img src={singleGroup.to.avatar} alt="" className='w-full h-full object-cover'/>:
                    <div>{ singleGroup.to.username && singleGroup.to.username.slice(0, 1) }</div>
                }
            </>
        }
        {
            multipleGroup.type === GroupType.Multiple && <>
                 {/* <img src={multipleGroup.} alt="" className='w-full h-full object-cover'/>: */}
                 <div>{ singleGroup.to.username && singleGroup.to.username.slice(0, 1) }</div>
            </>
        }
    </div>
  )
}

export default Avatar
