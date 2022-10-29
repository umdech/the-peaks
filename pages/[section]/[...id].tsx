import styled from 'styled-components'
import Layout from '@/components/layouts'
import { loadPost } from 'libs/loadpost'
import { lighten, rgba } from 'polished'
import Error from '@/components/error'

type Props = {
    post: PostResponse,
    error: boolean
}

const Container = styled.article`
    display: flex;
`

const PostContent = styled.div`
    flex: 0 0 60%;
`

const PostMedia = styled.aside`
    flex: 0 0 40%;
`

const TrailText = styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
    margin: 1rem 0;
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

const PostDetail = ({ post, error }: Props) => {
    if (error) {
        return (
            <Layout title="404: Not Found">
                <Error />
            </Layout>
        )
    }
    return (
        <Layout title={post.content?.webTitle}>
            <div className="container">
                {(post.content) && (
                    <Container>
                        <PostContent>
                            <h1 dangerouslySetInnerHTML={{ __html: post.content?.webTitle }}></h1>
                            {post.content.fields && <TrailText><h3 dangerouslySetInnerHTML={{ __html: post.content.fields?.trailText }}></h3></TrailText>}
                            {post.content.fields && <Content dangerouslySetInnerHTML={{ __html: post.content.fields?.body }}></Content>}
                        </PostContent>
                        <PostMedia>sss</PostMedia>
                    </Container>
                )}
            </div>
        </Layout>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const id = ctx.resolvedUrl
    const params = {
        'show-fields': 'body,trailText'
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