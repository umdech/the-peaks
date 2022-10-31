import React from 'react'
import styled from 'styled-components'

import { loadPost } from '@/libs/loadpost'
import Layout from '@/components/layouts'
import Card from '@/components/card'
import SearchFilter from '@/components/search-filters'
import Error from '@/components/error'
import BookmarksLink from '@/components/bookmarks-link'
import Pagination from '@/components/pagination'

type Props = {
    response: SearchResponse,
    error: boolean,
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

const Search: React.FC<Props> = ({ response, error, url }) => {
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
                    <Heading>Search results</Heading>
                    <ToolWrapper>
                        <BookmarksLink />
                        {(items.length > 0) && <SearchFilter />}
                    </ToolWrapper>
                </HeadingWrapper>
                {(items.length > 0) ? (
                    <Grid>
                        {items.map((item: IPost) => (
                            <Card item={item} key={item.id} />
                        ))}
                    </Grid>
                ) : (<h4>Sorry, we couldn&lsquo;t find any result</h4>)}
                {!!(response.pages && response.currentPage) && <Pagination totalPages={response.pages} currentPage={response.currentPage} url={url} />}
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
        'show-fields': 'thumbnail',
        q,
        page: page || 1,
        'section': 'sport|culture|lifeandstyle',
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

export default Search