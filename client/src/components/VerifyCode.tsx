import { ChangeEvent, useState } from 'react'

const VerifyCode = () => {
    const [codes, setCodes] = useState<Array<string>>(new Array(6).fill(''))
    
    const valueChange = (index:number, value:string) => {
        // console.log(index, value)
        setCodes(codes => {
            codes = codes.slice()
            codes[index] = value
            console.log(codes.slice())
            return codes
        })
    }
    return (
        <div className='mt-4'>
            {
                codes.map((e, index) => (
                    <input 
                        maxLength={1}
                        key={index} 
                        value={e}
                        onChange={ (evt: ChangeEvent<HTMLInputElement>) => valueChange(index, evt.target.value) }
                        className='border w-16 h-20 mx-1 rounded-md outline-black text-center text-4xl'
                    />
                ))
            }  
        </div>
    )
}

export default VerifyCode
