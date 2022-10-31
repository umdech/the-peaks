import styled from 'styled-components'
import Layout from '@/components/layouts'
import { loadPost } from 'libs/loadpost'
import { lighten, rgba } from 'polished'
import Error from '@/components/error'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import BookmarkBtn from '@/components/bookmark-btn'

dayjs.extend(timezone)
dayjs.extend(utc)

type Props = {
    post: PostResponse,
    error: boolean
}

const HeadContains = styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
    letter-spacing: 0.01em;
    margin-bottom: 1rem;
    width: 100%;
    @media ${({ theme }) => theme.breakpoints.md} {
        width: 60%;
    }
`

const Container = styled.article`
    display: flex;
    flex-direction: column-reverse;
    flex-wrap: wrap;
    @media ${({ theme }) => theme.breakpoints.md} {
        flex-direction: row;
    }
`

const PostContent = styled.div`
    flex: 0 0 100%;
    @media ${({ theme }) => theme.breakpoints.md} {
        flex: 0 0 60%;
    }
`

const Headline = styled.div`
    h3 {
        font-size: 20px;
        line-height: 1.4em;
    }
`

const Content = styled.div`
    h2 {
        font-size: 20px;
        strong {
            font-weight: 700;
        }
    }
    .element {
        margin: 0 auto 1rem auto;
        max-width: 100%;
        figcaption {
            color: ${({ theme }) => rgba(theme.colors.textColor, 0.5)};
            font-size: 12px;
            line-height: 1.2em;
            margin-top: 0.5rem;
        }
    }
    .element-video {
        position: relative;
        &:before {
            content: '';
            display: block;
            padding-bottom: 56.25%
        }
        iframe {
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
        }
    }
    .element-image {
        img {
            display: block;
            height: auto;
            margin: 0 auto;
            width: 100%;
        }
        &.element--thumbnail {
            clear: left;
            float: left;
            margin-right: 1rem;
            width: 30%;
        }
    }
    .element-pullquote {
        background-color: ${({ theme }) => theme.colors.gray};
        blockquote {
            margin: 0;
            padding: 1rem;
            p {
                color: ${({ theme }) => theme.colors.primaryColor};
                font-size: 18px;
                font-weight: bold;
                line-height: 1.5em;
                &:last-child {
                    margin: 0;
                }
            }
        }
    }
    a {
        color: ${({ theme }) => lighten(0.3, theme.colors.textColor)};
        border-bottom: 1px solid ${({ theme }) => lighten(0.3, theme.colors.textColor)};
        transition: all .15s ease-in-out;
        &:hover {
            color: ${({ theme }) => theme.colors.textColor};
            border-bottom: 1px solid ${({ theme }) => theme.colors.textColor};
        }
    }
`

const PostMedia = styled.aside`
    flex: 0 0 100%;
    @media ${({ theme }) => theme.breakpoints.md} {
        flex: 0 0 40%;
        padding-left: 2rem;
    }
    ${Content} {
        @media ${({ theme }) => theme.breakpoints.md} {
            position: sticky;
            top: calc(116px + 4rem);
        }
    }
`

const PublishedDate = styled.span`
    display: block;
    font-size: 12px;
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
    text-transform: uppercase;
`

const PostDetail = ({ post, error }: Props) => {
    if (error) {
        return (
            <Layout title="404: Not Found">
                <Error />
            </Layout>
        )
    }
    const dateFormat = (str: string) => {
        return dayjs(str, 'YYYY-MM-DDTHH:mm:ssZ[Z]').tz('GMT+0').format("ddd D MMM YYYY HH.mm BST")
    }
    return (
        <Layout title={post.content?.webTitle} description={post.content?.fields?.trailText}>
            <div className="container">
                {(post.content) && (
                    <>
                        <HeadContains>
                            <BookmarkBtn id={post.content.id} />
                            <PublishedDate dangerouslySetInnerHTML={{ __html: dateFormat(post.content.webPublicationDate) }}></PublishedDate>
                            <h1 dangerouslySetInnerHTML={{ __html: post.content?.webTitle }}></h1>
                            {post.content.fields?.headline && <Headline><h3 dangerouslySetInnerHTML={{ __html: post.content.fields?.headline }}></h3></Headline>}
                        </HeadContains>
                        <Container>
                            <PostContent>
                                {post.content.fields?.body && <Content dangerouslySetInnerHTML={{ __html: post.content.fields?.body }}></Content>}
                            </PostContent>
                            <PostMedia>
                                {post.content.fields?.main && <Content dangerouslySetInnerHTML={{ __html: post.content.fields?.main }}></Content>}
                            </PostMedia>
                        </Container>
                    </>
                )}
            </div>
        </Layout>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const id = ctx.resolvedUrl
    const params = {
        'show-fields': 'body,headline,main,trailText'
    }
    let error: boolean = false
    const post = await loadPost(id, params)
    if (post.response.status !== 'ok') {
        error = true
    }
    return {
        props: {
            post: post.response,
            error
        }
    }
}

export default PostDetail