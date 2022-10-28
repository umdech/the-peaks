import axios from 'axios'

export const loadPost = async (url: string, params: any = []) => {
    params['api-key'] = process.env.API_KEY
    const res = await axios.get(`${process.env.API_PATH}/${url}`, { params })
    return res.data
}