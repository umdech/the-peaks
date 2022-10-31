import Link from 'next/link'
import { darken, lighten } from 'polished'
import styled from 'styled-components'
import Icon from './icon'
import Bookmark from './icon/bookmark'

const Button = styled(Link)`
    align-items: center;
    background-color: ${({ theme }) => theme.colors.primaryColor};
    border: none;
    border-radius: 4px;
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    display: inline-flex;
    flex: 0 0 45%;
    font-family: ${({ theme }) => theme.fonts.familyBody};
    font-size: 13px;
    font-weight: 500;
    justify-content: center;
    padding: 0.469rem 0.8rem;
    text-transform: uppercase;
    width: 45%;
    transition: all .3s ease-in-out;
    span {
        margin-left: 0.5rem;
    }
    &:hover {
        background-color: ${({ theme }) => lighten(0.1, theme.colors.primaryColor)};
    }
    &:active {
        background-color: ${({ theme }) => darken(0.05, theme.colors.primaryColor)};
    }
    &[disabled] {
        opacity: 0.65;
        pointer-events: none;
    }
    @media ${({ theme }) => theme.breakpoints.md} {
        flex: 0 0 auto;
        margin-right: 30px;
        width: auto;
    }
`

const BookmarksLink = () => {
    return (
        <>
            <Button href="/bookmarks">
                <Icon width={14} height={14}>
                    <Bookmark />
                </Icon>
                <span>View bookmark</span>
            </Button>
        </>
    )
}

export default BookmarksLink