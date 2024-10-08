
import toast from "react-hot-toast"
import { userStorage } from "./storage"

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

export type Result = {
    success: boolean
    message: string
    code: number
    data: any
}

export const toFormData = (data:Record<string, any>) => {
    const formData = new FormData()
    
    Object.keys(data).forEach(key => {
        formData.append(key, data[key])
    })

    return formData
}

const TIMEOUT = 3 * 1000

type RequestFunction = (config:RequestConfig) => Promise<Result>

const request:RequestFunction = async (config) =>  {

    const user = userStorage.get()

    const toastError = config.toast === undefined ? true : config.toast

    // Parse url
    let url = config.url

    const method = config.method.toUpperCase()

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
        method,
        body,
        signal: AbortSignal.timeout(TIMEOUT),
        mode: 'cors' 
    }

    const result: Result = {
        success: false,
        message: '',
        code: 0,
        data: null
    }

    try { 
        const res = await fetch(url, {
            headers: {
                Token: user ? user.token : ''
            },
            ...option
        })
        const json = await res.json()
        
        for (const key in result) {
            switch (key) {
                case 'success':
                    result[key] = Boolean(json[key])
                    break
                case 'message':
                    result[key] = String(json[key])
                    break
                case 'code':
                    result[key] = Number(json[key])
                    break
                case 'data':
                    result[key] = json[key]         
            }
        }

        if (!res.ok) {
            if (toastError && result.message) {
                toast.error(result.message)
            }
            // When token invalid: redirect to login
            if (result.code === -300) {
                location.href = '/login'
            }
        } 
    } catch(err) {
        console.error(err)
    }

    return result

}

export default request