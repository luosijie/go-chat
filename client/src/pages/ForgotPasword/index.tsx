import VerifyCode from '@/components/VerifyCode'
import { Mail } from 'lucide-react'
import { useState } from 'react'

const classItem = `
    flex text-gray-500 gap-2 border mt-5 w-full h-16 items-center p-4 rounded-md
    [&>input]:outline-none [&>input]:text-lg
`

const Page = () => {
    const [step, setStep] = useState<number>(2)
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="text-3xl font-bold"><span className="p-2 text-white bg-black rounded-tl-3xl rounded-br-3xl">Go</span>  chat <span className="mx-5">|</span> Forgot Password </div>
            
            {
                step === 1 &&
                <div className='w-96 mt-10'>
                    <div className={classItem}>
                        <Mail/>
                        <input type="text" placeholder='Email' className='flex-grow'/>
                    </div>
                    <div 
                        className='w-full p-4 bg-black rounded-md text-white mt-5 text-center font-bold text-xl cursor-pointer'
                        onClick={() => setStep(2)}
                    >
                    Next
                    </div>

                </div>
            }
            {
                step === 2 &&
                <>
                    <div className='text-lg mt-10 text-gray-500'>
                    Go check your email and fill the verification code !
                    </div>
                    <VerifyCode/>
                </>
            }
        </div>
    )
}

export default Page
