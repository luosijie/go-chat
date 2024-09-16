import toast from "react-hot-toast"

export type Method =
    | 'get'    | 'GET'
    | 'delete' | 'DELETE'
    | 'head'   | 'HEAD'
    | 'post'   | 'POST'
    | 'put'    | 'PUT'

export type RequestConfig = {
    url: string,
    method: Method,
    data?: Record<string, any>,
    formData?: FormData,
    query?: Record<string, any>,
    params?: Record<string, any>,
    toast?: boolean // if toast error
}

const TIMEOUT = 3 * 1000

const request = async (config: RequestConfig) => {

    const toastError = config.toast === undefined ? true : config.toast

    // Parse url
    let url = config.url

    // Parse url:params
    if (config.params) {
        const params = config.params
        Object.keys(params).forEach(key => {
            url.replace(`:key`, params[key])
        })
    }

    // Parse url:query
    if (config.query) {
        const query = config.query
        const seachParams = new URLSearchParams(query)
        url += `?${seachParams.toString()}`
    }

    const body = config.formData ? config.formData : config.data ? JSON.stringify(config.data) : null

    const option:RequestInit = {
        method: config.method,
        body,
        signal: AbortSignal.timeout(TIMEOUT),
        mode: 'cors' 
    }

    let json: any

    try { 
        const res = await fetch(url, option)
        json = await res.json()
        
        if (!res.ok) {
            if (toastError && json) {
                toast.error(json.message)
            }
        } 
    } catch(err) {
        console.error(err)
    }

    return json

}

export default request