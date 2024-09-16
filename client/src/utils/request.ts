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
    query?: Record<string, any>,
    params?: Record<string, any>,
    toast?: boolean // if toast error
}

const TIMEOUT = 3 * 1000

const request = async (config: RequestConfig) => {

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

    const option:RequestInit = {
        method: config.method,
        body: JSON.stringify(config.data),
        signal: AbortSignal.timeout(TIMEOUT),
        mode: 'cors' 
    }

    let res:any

    try { 
        res = await fetch(url, option)
        if (res.ok) {
            return res
        } else {
            if (config.toast) {
                toast.error(res.statusText)
            }
            console.log('request not ok:', res)
            throw Error(res)
        }
    } catch(err) {
        console.error(err)
        return null
    }

}

export default request