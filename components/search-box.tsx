import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { lighten } from 'polished'
import React, { FormEvent, useEffect, useState } from 'react'
import styled from 'styled-components'

const Icon = dynamic(() => import('@/components/icon'))
const Magnifier = dynamic(() => import('@/components/icon/magnifier'))

type SearchProps = {
    opened: boolean
}

const BoxContains = styled.div<SearchProps>`
    background-color: ${({ opened, theme }) => opened ? lighten(0.12, theme.colors.primaryColor) : theme.colors.primaryColor};
    width: 100%;
    transition: all .15s ease-in-out;
    @media ${({ theme }) => theme.breakpoints.md} {
        box-shadow: inset 0px -3px 0px 0px ${({ theme }) => theme.colors.white};
        &:hover {
            background-color: ${({ theme }) => lighten(0.12, theme.colors.primaryColor)};
        }
    }
`

const Form = styled.form`
    display: flex;
    flex-wrap: nowrap;
    height: 2.75rem;
    justify-content: flex-end;
    width: 100%;
`

const SearchBtn = styled.button`
    background-color: transparent;
    border: none;
    box-shadow: inset 0px -3px 0px 0px ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    display: block;
    height: 100%;
    outline: none !important;
    padding: 0 2rem;
    @media ${({ theme }) => theme.breakpoints.md} {
        box-shadow: none;
    }
`

const SearchInput = styled.input<SearchProps>`
    background-color: transparent;
    border: none;
    box-shadow: inset 0px -3px 0px 0px ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.white};
    display: block;
    font-family: ${({ theme }) => theme.fonts.familyBody};
    font-size: 16px;
    height: 100%;
    opacity: ${({ opened }) => opened ? 1 : 0};
    outline: none !important;
    padding: ${({ opened }) => opened ? '0 0 0 1.875rem' : 0};
    width: ${({ opened }) => opened ? 'calc(100% - 44px)' : 0};
    transition: all .3s cubic-bezier(0.22, 0.61, 0.36, 1);
    @media ${({ theme }) => theme.breakpoints.md} {
        box-shadow: none;
        width: ${({ opened }) => opened ? '200px' : 0};
    }
    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
        appearance: none;
    }
`

const SearchBox = () => {
    const router = useRouter()
    const searchRef: React.RefObject<HTMLDivElement> = React.createRef()
    const inputRef: React.RefObject<HTMLInputElement> = React.createRef()
    const [q, setKeyword] = useState('')
    const [opened, setOpen] = useState(false)

    const closeSearchBox = () => {
        if (!q) {
            setOpen(false)
        }
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (opened) {
            closeSearchBox()
        } else {
            setOpen(true)
            const cur = inputRef.current
            if (cur && !cur.contains(e.target as Node)) {
                cur.focus()
            }
        }
    }

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget
        setKeyword(value)
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (searchRef && searchRef !== null) {
            const cur = searchRef.current
            if (cur && !cur.contains(e.target as Node)) {
                closeSearchBox()
            }
        }
    }

    const handleEscKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeSearchBox()
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (q) {
            router.push({ pathname: '/search', query: { q } })
        }
    }

    useEffect(
        () => {
            document.addEventListener('mousedown', handleClickOutside, false)
            document.addEventListener('keydown', handleEscKeyDown, false)
            return () => {
                document.removeEventListener('mousedown', handleClickOutside, false)
                document.removeEventListener('keydown', handleEscKeyDown, false)
            }
        }
    )

    return (
        <BoxContains opened={opened} ref={searchRef}>
            <Form onSubmit={handleSubmit}>
                <SearchInput
                    type="search"
                    name="q"
                    placeholder="Search all news"
                    value={q}
                    onChange={handleInput}
                    opened={opened}
                    autoComplete="off"
                    ref={inputRef} />
                <SearchBtn type="button" onClick={handleClick} tabIndex={-1}>
                    <Icon width={17} height={17}>
                        <Magnifier />
                    </Icon>
                </SearchBtn>
            </Form>
        </BoxContains>
    )
}

export default SearchBox