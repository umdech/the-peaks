import React from 'react'
import styled from 'styled-components'

import { loadPost } from '@/libs/loadpost'
import Layout from '@/components/layouts'
import Card from '@/components/card'
import SearchFilter from '@/components/search-filters'

type Props = {
    response: SearchResponse,
    error: boolean
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

const Search: React.FC<Props> = ({ response, error }) => {
    const items: IPost[] = response.results

    return (
        <Layout>
            <div className="container">
                <HeadingWrapper>
                    <Heading>Search results</Heading>
                    <ToolWrapper>
                        <SearchFilter />
                    </ToolWrapper>
                </HeadingWrapper>
                <Grid>
                    {items.map((item: IPost) => (
                        <Card item={item} key={item.id} />
                    ))}
                </Grid>
            </div>
        </Layout>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const { q } = ctx.query
    let error: boolean = false
    if (!q) {
        error = true
    }
    const params = {
        'show-fields': 'thumbnail',
        q,
        'section': 'sport|culture|lifeandstyle',
        'page-size': 12,
        'order-by': ctx.query['order-by'] || 'newest'
    }
    const res = await loadPost(`/search`, params)
    if (res.response.status !== 'ok') {
        error = true
    }
    return {
        props: {
            response: res.response,
            error
        }
    }
}

export default Search