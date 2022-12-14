import Image from 'next/image'
import Link from 'next/link'
import { rgba } from 'polished'
import React from 'react'
import styled from 'styled-components'

type Props = {
    item: IPost,
    hideThumbnail?: boolean
}

type CardProps = {
    section: string
}

type TitleProps = {
    noThumbnail?: boolean
}

const TitleContains = styled.div<TitleProps>`
    background-color: ${({ theme }) => rgba(theme.colors.primaryColor, 0.9)};
    bottom: 0;
    color: ${({ theme }) => theme.colors.white};
    left: 0;
    min-height: ${({ noThumbnail }) => noThumbnail ? '100% !important' : '135px'};
    padding: 0.625rem;
    position: ${({ noThumbnail }) => noThumbnail ? 'relative' : 'absolute'};
    right: 0;
    transition: all .15s ease-in-out;
    h3 {
        display: block;
        display: -webkit-box;
        font-size: 20px;
        max-height: 84px;
        line-height: 1.4em;
        margin: 0;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
    }
    p {
        display: block;
        display: -webkit-box;
        font-size: 14px;
        line-height: 1.3em;
        margin: 0.5rem 0 0.5rem;
        max-height: 2.3rem;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
`

const CardBox = styled(Link) <CardProps>`
    display: block;
    border-bottom-style: solid;
    border-color: ${({ section, theme }) => {
        switch (section) {
            case 'news':
                return theme.colors.green
            case 'sport':
                return theme.colors.red
            case 'lifeandstyle':
                return theme.colors.blue
            case 'culture':
                return theme.colors.yellow
            default:
                return theme.colors.primaryColor
        }
    }};
    border-width: 3px;
    box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.05);
    position: relative;
    transition: all .15s ease-in-out;
    &:hover {
        box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.2);
        ${TitleContains} {
            background-color: ${({ theme }) => theme.colors.primaryColor};
        }
    }
`

const Thumbnail = styled.div`
    background-color: #0D47A1;
    position: relative;
    &:before {
        content: '';
        display: block;
        // padding-top: ${(15 / 14) * 100}%;
        padding-top: 100%;
    }
    img {
        display: block;
    }
`

const Card: React.FC<Props> = (props) => {
    const clearPTags = (str: string) => {
        return str.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "")
    }
    return (
        <CardBox href={props.item.id} passHref title={props.item.webTitle} section={props.item.sectionId}>
            {props.item.fields ? (
                !props.hideThumbnail && (
                    <Thumbnail className="thumbnail">
                        <Image
                            src={props.item.fields?.thumbnail || `/images/blank-thumbnail.png`}
                            alt={props.item.webTitle}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'top center'
                            }}
                            {...(!props.item.fields?.thumbnail ? { priority: true } : {})}
                        />
                    </Thumbnail>
                )
            ) : (
                <Thumbnail className="thumbnail">
                    <Image
                        src="/images/blank-thumbnail.png"
                        alt={props.item.webTitle}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={80}
                        style={{
                            objectFit: 'contain'
                        }}
                        priority
                    />
                </Thumbnail>
            )}
            <TitleContains className="title-contains" noThumbnail={props.hideThumbnail}>
                <h3 dangerouslySetInnerHTML={{ __html: props.item.webTitle }}></h3>
                {(props.item.fields) && (props.item.fields.trailText && <p dangerouslySetInnerHTML={{ __html: clearPTags(props.item.fields.trailText) }}></p>)}
            </TitleContains>
        </CardBox>
    )
}

export default Card