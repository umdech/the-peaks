import React from 'react'
import styled from 'styled-components'
import Layout from '@/components/layouts'
import { loadPost } from '@/libs/loadpost'
import Card from '@/components/card'
import Error from '@/components/error'

type Props = {
    response: SectionReponse,
    error: boolean
}

const Heading = styled.h1`
    font-size: 48px;
`

const Grid = styled.div`
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 50px;
    margin-top: 30px;
`

const SectionPage: React.FC<Props> = ({ response, error }) => {
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
                <Heading dangerouslySetInnerHTML={{ __html: section.webTitle }}></Heading>
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
        'page-size': 12
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