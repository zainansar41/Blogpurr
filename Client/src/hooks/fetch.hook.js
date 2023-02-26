import axios from "axios";
import { useEffect, useState } from "react";
import ENV from '../config'

axios.defaults.baseURL = ENV.LINK


//custom hook
export default function useFetch(query) {
    const [getData, setData] = useState({ isLoading: false, apiData: undefined, status: null, serverError: null });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true }))
                const token = localStorage.getItem('YourToken')
                const { data, status } = await axios.get('/getData',{ headers: { "authorization": `Bearer ${token}` } })

                setData(prev => ({
                    ...prev,
                    isLoading: false,
                    apiData: data,
                    status: status,
                    serverError: null
                }))
            } catch (error) {
                setData(prev => ({
                    ...prev,
                    isLoading: false,
                    serverError: error
                }))
            }
        }
        fetchData()
    }, [query])

    return [getData, setData]
}
