import { ImagePlusIcon, Trash2 } from "lucide-react"
import { ChangeEvent, useState } from "react"

type Props = {
    onChange: (file:File | null) => void
}

const ImageUploader = ({ onChange }:Props) => {

    const [file, setFile] = useState<File | null>(null)

    const handleChange = (evt:ChangeEvent<HTMLInputElement>) => {
        const file = evt.target.files ? evt.target.files[0] : null
        if (!file) {
            evt.target.value = ''
            return
        }
        setFile(file)

        onChange(file)
        
    }

    
    return (
        <div className="size-28 border rounded-full text-gray-500 flex justify-center items-center cursor-pointer relative">
            
            
            { 
                file ? 
                <>
                    <img src={URL.createObjectURL(file)} alt="" className="size-full absolute left-0 top-0 z-999 bg-red-200 rounded-full object-cover"/>
                    <div className="border absolute bg-white rounded-full text-xs p-1 text-red-600 font-bold bottom-0 right-0" onClick={() => setFile(null)}>
                        <Trash2/>
                    </div>
                </> : 
                <ImagePlusIcon className="size-12"/>
            }
            <input 
                type="file" accept="image/*"
                onChange={evt => handleChange(evt)}
                className="absolute w-full h-full left-0 top-0 opacity-0 cursor-pointer z-10 rounded-full"
            />
        </div>
    )
}

export default ImageUploader
