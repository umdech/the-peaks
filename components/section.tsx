import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import Card from '@/components/card'
import Link from 'next/link'

type Props = {
    name: string
}

const Heading = styled.h3`
    font-size: 34px;
    a {border-bottom: 2px solid transparent;
        color: ${({ theme }) => theme.colors.textColor};
        transition: all .15s ease-in-out;
        &:hover {
            border-bottom-color: ${({ theme }) => theme.colors.textColor};
        }
    }
`

const Grid = styled.div`
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 50px;
    margin-top: 30px;
`

const Section = ({ name }: Props) => {
    const [loaded, setLoaded] = useState(false)
    const [title, setTitle] = useState('')
    const [items, setItems] = useState<IPost[]>([])

    const getData = useCallback(
        async () => {
            const params: any = {
                'api-key': process.env.API_KEY,
                'page-size': 3,
                'show-fields': 'thumbnail'
            }
            const res = await axios.get(`/api/v1/${name}`, { params })
            const data: IPost[] = res.data.response.results
            const title = res.data.response.section.webTitle
            setTitle(title)
            setItems(data)
            setLoaded(true)
        }, [name, setTitle, setItems, setLoaded]
    )

    useEffect(
        () => {
            if (!loaded) {
                getData()
            }
        }, [loaded, getData]
    )

    return loaded ? (
        <>
            <Heading>
                <Link href={`/${name}`} dangerouslySetInnerHTML={{ __html: title }}></Link>
            </Heading>
            <Grid>
                {items.map((item: IPost) => (
                    <Card item={item} key={item.id} />
                ))}
            </Grid>
        </>
    ) : <></>
}

export default Section