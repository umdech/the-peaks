import axios from 'axios'
import styled from 'styled-components'
import { useCallback, useEffect, useState } from 'react'

import Card from '@/components/card'

const TopContainer = styled.div`
    display: grid;
    grid-gap: 30px;
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
`

const BottomContainer = styled.div`
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 30px;
`

const TopStories = () => {
    const [loaded, setLoaded] = useState(false)
    const [topItems, setTopItems] = useState<IPost[]>([])
    const [bottomItems, setBottomItems] = useState<IPost[]>([])

    const getTopStories = useCallback(
        async () => {
            const params: any = {
                'api-key': process.env.API_KEY,
                'section': 'sport|culture|lifeandstyle',
                'page-size': 8,
                'show-fields': 'thumbnail,trailText'
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
            setLoaded(true)
        }, [setTopItems, setBottomItems, setLoaded]
    )

    useEffect(
        () => {
            if (!loaded) {
                getTopStories()
            }
        }, [loaded, getTopStories]
    )
    return (
        <>
            <h2>Top stories</h2>
            {loaded ? (
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
            ) : <p>Loading...</p>}
        </>
    )
}

export default TopStories