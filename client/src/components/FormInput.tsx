import { LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent } from 'react'
import { FieldError } from 'react-hook-form'

type Props = {
    Icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
    children: JSX.Element
    error?: FieldError
}

const classInput = `
    flex text-gray-500 gap-2 border mt-5 mb-6 w-full h-16 items-center p-4 rounded-md
    [&>input]:outline-none [&>input]:text-lg
`

const FormInput = ({ Icon, children, error }:Props) => {
    return (
        <div className='relative'>
            <div className={classInput}>
                { Icon && <Icon/> }
                { children }
            </div>
            { error && <div className='text-red-700 absolute -bottom-5 left-4 text-sm'>  {error.message}</div>}
        </div>
    )
}

export default FormInput
