import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query } = req
    const { endpoint }: any = query
    delete query.endpoint
    let params: any = query
    params['api-key'] = process.env.API_KEY
    const url = `${process.env.API_PATH}/${endpoint.join('/')}`

    const get = async () => {
        const response = await axios.get(url, { params })
        res.status(response.status).json(response.data)
    }

    switch (method) {
        case 'GET':
            get()
            break
        default:
            return res.status(405).end(`Method ${method} Not Allowed`)
    }
}

export default handler