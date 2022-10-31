import React from 'react'
import styled from 'styled-components'
import Layout from '@/components/layouts'
import { loadPost } from '@/libs/loadpost'
import Error from '@/components/error'
import SectionFilter from '@/components/section-filters'
import PostLoader from '@/components/posts-loader'

type Props = {
    response: SectionReponse,
    error: boolean,
    hasMore: boolean
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

const SectionPage: React.FC<Props> = ({ response, error, hasMore }) => {
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
        <Layout title={section.webTitle}>
            <div className="container">
                <HeadingWrapper>
                    <Heading dangerouslySetInnerHTML={{ __html: section.webTitle }}></Heading>
                    <ToolWrapper>
                        <SectionFilter />
                    </ToolWrapper>
                </HeadingWrapper>
                <PostLoader items={items} apiPath={`/api/v1/${section.id}`} hasMore={hasMore} />
            </div>
        </Layout>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const { section } = ctx.params
    const { page } = ctx.query
    const params = {
        'show-fields': 'thumbnail,trailText',
        page: page || 1,
        'page-size': process.env.PAGE_SIZE,
        'order-by': ctx.query['order-by'] || 'newest'
    }
    let error: boolean = false
    const res = await loadPost(section, params)
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
            hasMore
        }
    }
}

export default SectionPage