import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Card from './card'
import CardPlaceholder from './card-placeholder'
import Grid from './grid'

type Props = {
    items: IPost[],
    apiPath: string,
    params?: any,
    hasMore: boolean
}

const PostLoader: React.FC<Props> = ({ items, apiPath, params, hasMore = false }) => {
    const router = useRouter()
    const [posts, setPosts] = useState<IPost[]>(items || [])
    const [page, setPage] = useState(2)
    const [orderBy, setOrderBy] = useState(router.query['order-by'] || 'newest')
    const [hasMoreState, setHasmMoreState] = useState(hasMore)
    const fetchMoreData = async () => {
        const parameters = {
            ...params,
            'show-fields': 'thumbnail,trailText',
            page,
            'page-size': process.env.NEXT_PUBLIC_PAGE_SIZE,
            'order-by': orderBy
        }
        const res = await axios.get(apiPath, { params: parameters })
        const { results, pages, currentPage } = res.data.response
        const data: IPost[] = results
        const maxPage: number = process.env.NEXT_PUBLIC_MAX_PAGE ? parseInt(process.env.NEXT_PUBLIC_MAX_PAGE) : pages
        if ((currentPage >= pages) || (currentPage >= maxPage)) {
            setHasmMoreState(false)
        } else {
            setPage(page + 1)
        }
        setPosts([...posts, ...data])
    }

    useEffect(
        () => {
            if (router.query['order-by'] || router.query['q']) {
                setOrderBy(router.query['order-by'] || 'newest')
                setPosts(items)
                setPage(2)
                setHasmMoreState(hasMore)
            }
        }, [router, items, hasMore, setOrderBy, setPosts, setPage, setHasmMoreState]
    )

    const Loader = () => (
        <Grid>
            <CardPlaceholder /><CardPlaceholder /><CardPlaceholder />
        </Grid>
    )

    return (
        <div>
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchMoreData}
                hasMore={hasMoreState}
                loader={<Loader />}>
                <Grid>
                    {posts.map((post: IPost) => (
                        <Card item={post} key={post.id} />
                    ))}
                </Grid>
            </InfiniteScroll>
        </div>
    )
}

export default PostLoader