import { ClipboardEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'

const focus = (input: HTMLInputElement | null) => {
    input?.focus()
    // input?.setSelectionRange(0, 2)
}

type Props = {
    onComplete: (codes:string) => void
}

const VerifyCode = ({onComplete}:Props) => {
    const [codes, setCodes] = useState<Array<string>>(new Array(6).fill(''))

    const inputRefs = useRef<Array<HTMLInputElement | null>>([])

    useEffect(() => {
        const empty = codes.find(e => !String(e))
        if (empty === undefined) {   
            onComplete(codes.join(''))   
        }
    }, [codes, onComplete])

    const handleKeyDown = (evt:KeyboardEvent<HTMLInputElement>, index:number) => {

        switch (evt.key) {
        case 'Backspace':
            if (codes[index]) {
                setCodes(codes => {
                    codes = codes.slice()
                    codes[index] = ''
                    return codes
                })
            }

            if (!codes[index] && index > 0) {
                focus(inputRefs.current[index - 1])
            }
            break
        case 'ArrowLeft':
            focus(inputRefs.current[index - 1])
            break
        case 'ArrowRight':
            focus(inputRefs.current[index + 1])
            break
        default:
            if (/^[\da-zA-Z]{1}$/.test(evt.key)) {
                setCodes(codes => {
                    codes = codes.slice()
                    codes[index] = evt.key
                    return codes
                })
                focus(inputRefs.current[index+1])
            }
        }
    }

    const handlePaste = (evt:ClipboardEvent, index:number) => {
        console.log(evt, index)
        console.log('Get Pasted Data:', evt.clipboardData.getData('text'))
        const text = evt.clipboardData.getData('text')
        if (!/^[\da-zA-Z]{6}$/.test(text)) return
        setCodes(text.split(''))
    }

    return (
        <div className='mt-4'>
            {
                codes.map((e, index) => (
                    <input 
                        maxLength={6}
                        key={index} 
                        ref={ el => (inputRefs.current[index] = el )}
                        value={e}
                        onKeyDown={ evt => handleKeyDown(evt, index) }
                        onChange={ () => {}}
                        onPaste={evt => handlePaste(evt, index)}
                        className='border w-16 h-20 mx-1 rounded-md outline-black text-center text-4xl'
                    />
                ))
            }  
        </div>
    )
}

export default VerifyCode
