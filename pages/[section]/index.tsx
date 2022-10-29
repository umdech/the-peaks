import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Layout from '@/components/layouts'
import { loadPost } from '@/libs/loadpost'
import Card from '@/components/card'
import Error from '@/components/error'
import Select from '@/components/select'

type Props = {
    response: SectionReponse,
    error: boolean
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

const SectionPage: React.FC<Props> = ({ response, error }) => {
    if (error) {
        return (
            <Layout title="404: Not Found">
                <Error />
            </Layout>
        )
    }
    const router = useRouter()
    const { query } = router
    const [orderBy, setOrderBy] = useState(query['order-by'] || 'newest')
    const section: ISection = response.section || []
    const items: IPost[] = response.results
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
            router.push({ pathname: `/${query.section}`, query: { 'order-by': val } })
        }
    }
    return (
        <Layout>
            <div className="container">
                <HeadingWrapper>
                    <Heading dangerouslySetInnerHTML={{ __html: section.webTitle }}></Heading>
                    <ToolWrapper>
                        <Select options={options} onChange={(value) => handleChange(value)} value={orderBy} />
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
    const { section } = ctx.params
    const params = {
        'show-fields': 'thumbnail',
        'page-size': 12,
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
            error
        }
    }
}

export default SectionPage