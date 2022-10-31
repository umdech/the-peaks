import axios from 'axios'
import styled from 'styled-components'
import { useCallback, useEffect, useState } from 'react'

import Card from '@/components/card'
import Select from '@/components/select'
import CardPlaceholder from '@/components/card-placeholder'
import BookmarksLink from './bookmarks-link'

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

const TopContainer = styled.div`
    display: grid;
    grid-gap: 30px;
    grid-template-columns: 1fr;
    @media ${({ theme }) => theme.breakpoints.md} {
        grid-template-columns: 50% 1fr 1fr;
        a {
            &:first-child {
                grid-row: 1 / 3;
                .thumbnail {
                    &:before {
                        padding-top: 75%;
                    }
                }
                .title-contains {
                    h3 {
                        font-size: 24px;
                        max-height: 101px;
                    }
                }
            }
            &:not(:first-child) {
                .thumbnail {
                    height: 100%;
                    &:before {
                        padding-top: 100%;
                    }
                }
                .title-contains {
                    min-height: 110px;
                    .title-contains {
                        h3 {
                            font-size: 18px;
                        }
                    }
                    p {
                        display: none;
                    }
                }
            }
        }
        .card-placeholder {
            &:before {
                padding-top: 75%;
            }
            &:first-child {
                grid-row: 1 / 3;
            }
        }
    }
`

const BottomContainer = styled.div`
    display: grid;
    grid-gap: 30px;
    grid-template-columns: 1fr;
    margin-bottom: 50px;
    margin-top: 30px;
    @media ${({ theme }) => theme.breakpoints.md} {
        grid-template-columns: repeat(3, 1fr);
    }
`

const TopStories = () => {
    const [loaded, setLoaded] = useState(false)
    const [reloaded, setReLoaded] = useState(true)
    const [orderBy, setOrderBy] = useState('newest')
    const [topItems, setTopItems] = useState<IPost[]>([])
    const [bottomItems, setBottomItems] = useState<IPost[]>([])

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

    const getData = useCallback(
        async (order: string = orderBy) => {
            const params: any = {
                'section': 'news',
                'page-size': 8,
                'show-fields': 'thumbnail,trailText',
                'order-by': order
            }
            const res = await axios.get(`/api/v1/search`, { params })
            const data: IPost[] = res.data.response.results
            let the_top: IPost[] = []
            let the_bottom: IPost[] = []
            data.forEach((d: IPost, key) => {
                if (key < 5) {
                    the_top.push(d)
                } else {
                    the_bottom.push(d)
                }
            })
            setTopItems(the_top)
            setBottomItems(the_bottom)
        }, [orderBy, setTopItems, setBottomItems]
    )

    const getTopStories = useCallback(
        async () => {
            if (!loaded) {
                await getData()
                setLoaded(true)
            }
        }, [loaded, getData, setLoaded]
    )

    useEffect(
        () => {
            if (!loaded) {
                getTopStories()
            }
        }, [loaded, getTopStories]
    )

    const handleChange = async (val: any) => {
        if (val !== orderBy) {
            setOrderBy(val)
            setReLoaded(false)
            await getData(val)
            setReLoaded(true)
        }
    }

    return (
        <>
            <HeadingWrapper>
                <Heading>Top stories</Heading>
                <ToolWrapper>
                    <BookmarksLink />
                    <Select options={options} onChange={(value) => handleChange(value)} value={orderBy} />
                </ToolWrapper>
            </HeadingWrapper>
            {(loaded && reloaded) ? (
                <>
                    <TopContainer>
                        {topItems.map((item: IPost, key: number) => (
                            <Card item={item} {...(key > 2 ? { hideThumbnail: true } : {})} key={item.id} />
                        ))}
                    </TopContainer>
                    <BottomContainer>
                        {bottomItems.map((item: IPost) => (
                            <Card item={item} key={item.id} />
                        ))}
                    </BottomContainer>
                </>
            ) : (
                <>
                    <TopContainer>
                        <CardPlaceholder />
                        <CardPlaceholder />
                        <CardPlaceholder />
                        <CardPlaceholder />
                        <CardPlaceholder />
                    </TopContainer>
                    <BottomContainer>
                        <CardPlaceholder />
                        <CardPlaceholder />
                        <CardPlaceholder />
                    </BottomContainer>
                </>
            )}
        </>
    )
}

export default TopStories