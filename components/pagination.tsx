import Link from 'next/link'
import React from 'react'
import styled, { css } from 'styled-components'
import Icon from './icon'
import Next from './icon/next'
import Previous from './icon/previous'

type Props = {
    currentPage: number,
    totalPages: number,
    url: string
}

type BtnProps = {
    active?: boolean
}

const Nav = styled.nav`
    text-align: center;
`

const Items = styled.ul`
    align-items: center;
    display: inline-flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
`

const BtnStyle = css`
    align-items: center;
    background-color: transparent;
    border: 1px solid transparent;
    display: flex;
    font-size: 16px;
    font-weight: 700;
    height: 2.5rem;
    justify-content: center;
    min-width: 2.5rem;
    padding: 0 0.3rem;
    transition: all .15s ease-in-out;
    &:not([disabled]) {
        &:hover {
            border-color: ${({ theme }) => theme.colors.primaryColor};
        }
    }
`

const Btn = styled.button`
    ${BtnStyle}
`

const BtnLink = styled(Link)`
    ${BtnStyle}
`

const Item = styled.li<BtnProps>`
    &.page-link-item {
        display: none;
    }
    @media ${({ theme }) => theme.breakpoints.md} {
        margin: 0 0.3rem;
        &.page-link-item {
            display: block;
        }
    }
    ${BtnLink} {
        box-shadow: inset 0px -3px 0px 0px ${({ active, theme }) => active ? theme.colors.primaryColor : 'transparent'};
        color: ${({ active, theme }) => active ? theme.colors.primaryColor : theme.colors.textColor};
    }
`

const PageDetailMobile = styled.li`
    display: block;
    font-size: 16px;
    margin: 0 1rem;
    @media ${({ theme }) => theme.breakpoints.md} {
        display: none;
    }
`

const Pagination: React.FC<Props> = ({ currentPage, totalPages, url }) => {
    if (totalPages <= 1) {
        return <></>
    }
    const range: number = 3
    totalPages = (totalPages >= 1583) ? 1583 : totalPages
    let maxPageLimit: number = currentPage + range
    if (maxPageLimit <= 7) {
        maxPageLimit = 7
    }
    let minPageLimit: number = ((currentPage - 4) <= 0 ? 0 : (currentPage - 4))
    const prevPage = (currentPage - 1 <= 1 ? 1 : currentPage - 1)
    const nextPage = (currentPage + 1 >= totalPages ? totalPages : currentPage + 1)
    let pages: any[] = []

    for (let i: number = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    const getPageUrl = (page: number) => {
        const key = 'page'
        const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i')
        const separator = url.indexOf('?') !== -1 ? '&' : '?'
        if (url.match(re)) {
            return url.replace(re, '$1' + key + "=" + page + '$2');
        }
        else {
            return url + separator + key + "=" + page;
        }

    }

    const PageNumbers = () => {
        let elements: any[] = []
        pages.map((page: number) => {
            if (page <= maxPageLimit && page > minPageLimit) {
                if (!(page === 1 || page === totalPages)) {
                    elements.push(
                        <Item className="page-link-item" key={page} active={currentPage === page}><BtnLink href={getPageUrl(page)}>{page}</BtnLink></Item>
                    )
                }
            }
        })
        return (
            <>{elements}</>
        )
    }

    // Ellipsis
    const PageIncrementEllipsis = () => {
        if (pages.length > maxPageLimit) {
            return <Item className="page-link-item"><Btn disabled>&hellip;</Btn></Item>
        }
        return <></>
    }
    const PageDecremenEllipsis = () => {
        if ((minPageLimit - 1) >= 1) {
            return <Item className="page-link-item"><Btn disabled>&hellip;</Btn></Item>
        }
        return <></>
    }

    // Firt and last
    const FirstPage = () => {
        return <Item className="page-link-item" active={currentPage === 1}><BtnLink href={getPageUrl(1)}>1</BtnLink></Item>
    }
    const LastPage = () => {
        return <Item className="page-link-item" active={currentPage === totalPages}><BtnLink href={getPageUrl(totalPages)}>{totalPages}</BtnLink></Item>
    }

    return (
        <Nav role="navigation">
            <Items>
                {(currentPage !== 1) && <Item><BtnLink href={getPageUrl(prevPage)} aria-label="Previous"><Icon width={14} height={14}><Previous /></Icon></BtnLink></Item>}
                <PageDetailMobile>Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong></PageDetailMobile>
                <FirstPage />
                <PageDecremenEllipsis />
                <PageNumbers />
                <PageIncrementEllipsis />
                <LastPage />
                {(currentPage !== totalPages) && <Item><BtnLink href={getPageUrl(nextPage)} aria-label="Next"><Icon width={14} height={14}><Next /></Icon></BtnLink></Item>}
            </Items>
        </Nav>
    )
}

export default Pagination