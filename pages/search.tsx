import React from 'react'
import styled from 'styled-components'

import { loadPost } from '@/libs/loadpost'
import Layout from '@/components/layouts'
import SearchFilter from '@/components/search-filters'
import Error from '@/components/error'
import BookmarksLink from '@/components/bookmarks-link'
import PostLoader from '@/components/posts-loader'

type Props = {
    response: SearchResponse,
    error: boolean,
    hasMore: boolean,
    q: string
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
    align-items: center;
    display: flex;
    flex: 0 0 100%;
    flex-wrap: wrap;
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

const Search: React.FC<Props> = ({ response, error, q, hasMore }) => {
    if (error) {
        return (
            <Layout title="404: Not Found">
                <Error />
            </Layout>
        )
    }

    const items: IPost[] = response.results

    return (
        <Layout title="Search results">
            <div className="container">
                <HeadingWrapper>
                    <Heading>Search results</Heading>
                    <ToolWrapper>
                        <BookmarksLink />
                        {(items.length > 0) && <SearchFilter />}
                    </ToolWrapper>
                </HeadingWrapper>
                {(items.length > 0) ? (
                    <PostLoader items={items} apiPath={`/api/v1/search`} params={{ q, 'section': 'news|sport|culture|lifeandstyle' }} hasMore={hasMore} />
                ) : (<h4>Sorry, we couldn&lsquo;t find any result</h4>)}
            </div>
        </Layout>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const { q, page } = ctx.query
    let error: boolean = false
    if (!q) {
        error = true
    }
    const params = {
        'show-fields': 'thumbnail,trailText',
        q,
        page: page || 1,
        'section': 'news|sport|culture|lifeandstyle',
        'page-size': process.env.PAGE_SIZE,
        'order-by': ctx.query['order-by'] || 'newest'
    }
    const res = await loadPost(`/search`, params)
    if (res.response.status !== 'ok') {
        error = true
    }
    let hasMore: boolean = true
    const maxPage: number = process.env.MAX_PAGE ? parseInt(process.env.MAX_PAGE) : res.response.pages
    if ((res.response.currentPage >= res.response.pages) || (res.response.currentPage >= maxPage)) {
        hasMore = false
    }
    return {
        props: {
            response: res.response,
            error,
            hasMore,
            q
        }
    }
}

export default Search