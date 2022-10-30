import { useState } from 'react'
import { useRouter } from 'next/router'
import Select from '@/components/select'

const BookmarkFilter = () => {
    const router = useRouter()
    const { query } = router
    const [orderBy, setOrderBy] = useState(query['order-by'] || 'newest')

    const options: SelectProps[] = [
        {
            label: 'Newest first',
            value: 'newest'
        },
        {
            label: 'Oldest first',
            value: 'oldest'
        },
        {
            label: 'Most popular',
            value: 'relevance'
        }
    ]

    const handleChange = (val: any) => {
        if (val !== orderBy) {
            setOrderBy(val)
            router.push({ pathname: `/bookmarks`, query: { 'order-by': val } })
        }
    }

    return (
        <Select options={options} onChange={(value) => handleChange(value)} value={orderBy} />
    )
}

export default BookmarkFilter