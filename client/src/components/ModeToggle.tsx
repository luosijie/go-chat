
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { getRemSize } from '../utils/utils'

enum Mode  {
    Light='light',
    Dark='Dark'
}

const LeftInit = .25

const ModeToggle = () => {
    const [mode, setMode] = useState<Mode>(Mode.Light)
    const [left, setLeft] = useState<number>(LeftInit * getRemSize())

    const container = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const left = LeftInit * getRemSize()
        if (mode === Mode.Light) {
            setLeft(left)
        } else {
            const width = Number(container.current?.getBoundingClientRect().width)
            setLeft(width / 2 - left )
        }
    }, [mode])

    const toggle = () => {
        setMode(value => {
            return value === Mode.Light ? Mode.Dark : Mode.Light
        })
    }

    return (
        <div className="p-5">
            <div className=" bg-gray-100 h-10 rounded-xl relative cursor-pointer" onClick={toggle} ref={container}>
                {/* Slider */}
                <motion.div 
                    animate={{ left }}
                    className="w-1/2 h-8 rounded-xl absolute top-1 left-1 bg-white"
                />

                <div className='flex justify-around h-full w-full absolute z-10 font-bold'>
                    {/* Light */}
                    <motion.div
                        animate={{
                            color: mode === Mode.Light ? '#000000' : '#999'
                        }}
                        className="flex gap-2 items-center
                    ">
                        <Sun size={20}/>
                        <span className='text-sm'>Light</span>
                    </motion.div>

                    {/* Dark */}
                    <motion.div 
                        animate={{
                            color: mode === Mode.Dark ? '#000000' : '#999'
                        }}
                        className="flex gap-2 items-center text-gray-500"
                    >
                        <Moon size={20}/>
                        <span className='text-sm'>Dark</span>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default ModeToggle
