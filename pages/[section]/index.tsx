import React from 'react'
import styled from 'styled-components'
import Layout from '@/components/layouts'
import { loadPost } from '@/libs/loadpost'
import Card from '@/components/card'
import Error from '@/components/error'
import SectionFilter from '@/components/section-filters'
import Pagination from '@/components/pagination'

type Props = {
    response: SectionReponse,
    error: boolean,
    url: string
}

const HeadingWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 1rem;
`

const Heading = styled.h1`
    flex: 0 0 100%;
    font-size: 34px;
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

const SectionPage: React.FC<Props> = ({ response, error, url }) => {
    if (error) {
        return (
            <Layout title="404: Not Found">
                <Error />
            </Layout>
        )
    }
    const section: ISection = response.section || []
    const items: IPost[] = response.results


    return (
        <Layout>
            <div className="container">
                <HeadingWrapper>
                    <Heading dangerouslySetInnerHTML={{ __html: section.webTitle }}></Heading>
                    <ToolWrapper>
                        <SectionFilter />
                    </ToolWrapper>
                </HeadingWrapper>
                <Grid>
                    {items.map((item: IPost) => (
                        <Card item={item} key={item.id} />
                    ))}
                </Grid>
                {!!(response.pages && response.currentPage) && <Pagination totalPages={response.pages} currentPage={response.currentPage} url={url} />}
            </div>
        </Layout>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const { section } = ctx.params
    const { page } = ctx.query
    const params = {
        'show-fields': 'thumbnail',
        page: page || 1,
        'page-size': process.env.PAGE_SIZE,
        'order-by': ctx.query['order-by'] || 'newest'
    }
    let error: boolean = false
    const res = await loadPost(section, params)
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

export default SectionPage