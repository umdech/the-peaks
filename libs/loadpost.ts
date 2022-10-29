import axios from 'axios'

export const loadPost = async (url: string, params: any = []) => {
    params['api-key'] = process.env.API_KEY
    try {
        const res = await axios.get(`${process.env.API_PATH}/${url}`, { params })
        return res.data
    } catch (err: any) {
        return err.response.data
    }
}