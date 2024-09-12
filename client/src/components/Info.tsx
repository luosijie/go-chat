
const data: Record<string, string> = {
    gender: 'female',
    birth: '1993-9-2'
}

const Info = () => {
    return (
        <div className="w-full flex flex-col items-center pt-10">
            <img src="" alt="avatar" className="size-32 rounded-full bg-gray-200" />
            <div className="font-bold my-8 text-xl">Emi</div>
            {
                Object.keys(data).map((key: string) => (
                    <div key={key} className="flex justify-between w-60 border-b py-3">
                        <span className="font-bold">{ key }</span> 
                        <span>{ data[key] }</span>
                    </div>
                ))
            }
        </div>
    )
}

export default Info
