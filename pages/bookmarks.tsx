import React from 'react'
import styled from 'styled-components'

import { loadPost } from '@/libs/loadpost'
import Layout from '@/components/layouts'
import Card from '@/components/card'
import BookmarkFilter from '@/components/bookmark-filter'
import Error from '@/components/error'
import { getAllBookmarks } from '@/libs/bookmark'
import Pagination from '@/components/pagination'

type Props = {
    response: SearchResponse,
    error: ConstrainBooleanParameters,
    url: string
}

const HeadingWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 2rem;
`

const Heading = styled.h2`
    flex: 0 0 100%;
    font-size: 38px;
    line-height: 1em;
    margin: 0 0 1rem;
    @media ${({ theme }) => theme.breakpoints.md} {
        flex: 0 0 auto;
        font-size: 48px;
        margin: 0;
    }
`

const ToolWrapper = styled.div`
    flex: 0 0 100%;
    @media ${({ theme }) => theme.breakpoints.md} {
        flex: 0 0 auto;
    }
`

const Grid = styled.div`
    display: grid;
    grid-gap: 30px;
    grid-template-columns: 1fr;
    margin-bottom: 50px;
    margin-top: 30px;
    @media ${({ theme }) => theme.breakpoints.md} {
        grid-template-columns: repeat(3, 1fr);
    }
`

const Bookmarks: React.FC<Props> = ({ response, error, url }) => {
    if (error) {
        return (
            <Layout title="404: Not Found">
                <Error />
            </Layout>
        )
    }

    const items: IPost[] = response.results

    return (
        <Layout>
            <div className="container">
                <HeadingWrapper>
                    <Heading>All bookmark</Heading>
                    {(items.length > 0) && (
                        <ToolWrapper>
                            <BookmarkFilter />
                        </ToolWrapper>
                    )}
                </HeadingWrapper>
                {(items.length > 0) ? (
                    <Grid>
                        {items.map((item: IPost) => (
                            <Card item={item} key={item.id} />
                        ))}
                    </Grid>
                ) : (<h4>No bookmarks yet!</h4>)}
                {!!(response.pages && response.currentPage) && <Pagination totalPages={response.pages} currentPage={response.currentPage} url={url} />}
            </div>
        </Layout>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const bookmarks = await getAllBookmarks(ctx.req, ctx.res)
    let ids = ''
    if (bookmarks.length) {
        ids = bookmarks.join(',')
    }
    const { page } = ctx.query
    let error: boolean = false
    const params = {
        'show-fields': 'thumbnail',
        ids,
        'section': 'sport|culture|lifeandstyle',
        page: page || 1,
        'page-size': process.env.PAGE_SIZE,
        'order-by': ctx.query['order-by'] || 'newest'
    }
    const res = await loadPost(`/search`, params)
    if (res.response.status !== 'ok') {
        error = true
    }
    return {
        props: {
            response: res.response,
            error,
            url: ctx.resolvedUrl
        }
    }
}

export default Bookmarks