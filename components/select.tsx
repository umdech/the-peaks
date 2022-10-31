import { lighten, rgba } from 'polished';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

interface ISelect extends React.HTMLProps<HTMLSelectElement> {
    options: SelectProps[]
}

type MenuProps = {
    opened: boolean
}

type SelectedProps = {
    active: boolean
}

const selectHeight = 45;

const SelectWrapper = styled.div`
    flex: 0 0 55%;
    padding-left: 0.5rem;
    @media ${({ theme }) => theme.breakpoints.md} {
        flex: 0 0 auto;
        padding-left: 0;
    }
    select {
        display: none;
    }
`

const SelectContains = styled.div<MenuProps>`
    font-size: 16px;
    position: relative;
    width: 100%;
    &:after {
        content: '';
        border-style: solid;
        border-width: ${({ opened }) => opened ? '0 5px 5px 5px' : '5px 5px 0 5px'};
        border-color: ${({ opened, theme }) => opened ? `transparent transparent ${theme.colors.textColor} transparent` : `${theme.colors.textColor} transparent transparent transparent`} ;
        display: block;
        height: 0;
        margin-top: -5px;
        pointer-events: none;
        position: absolute;
        right: 1rem;
        top: 50%;
        user-select: none;
        width: 0;
        z-index: 999;
    }
    @media ${({ theme }) => theme.breakpoints.md} {
        min-width: 252.5px;
        width: 100%;
    }
`

const SelectedFiled = styled.button`
    align-items: center;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: inset 0px -1px 0px 0px ${({ theme }) => rgba(theme.colors.textColor, 0.3)};
    border: none;
    color: ${({ theme }) => theme.colors.textColor};
    cursor: pointer;
    display: flex;
    font-size: 16px;
    height: ${selectHeight}px;
    padding: 0 0.2rem;
    width: 100%;
    transition: all .3s ease-in-out;
    &:hover {
        box-shadow: inset 0px -1px 0px 0px ${({ theme }) => theme.colors.textColor};
    }
`

const MenuWrapper = styled.div<MenuProps>`
    box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.2);
    left: 0;
    position: absolute;
    top: 0;
    visibility: ${({ opened }) => opened ? 'visible' : 'hidden'};
    width: 100%;
    z-index: 998;
`

const Menu = styled.div<MenuProps>`
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.textColor};
    max-height: ${({ opened }) => opened ? '999px' : `${selectHeight}px`};
    overflow: hidden;
    width: 100%;
    transition: ${({ opened }) => opened ? 'all 2.5s cubic-bezier(0.22, 0.61, 0.36, 1)' : 'all .25s cubic-bezier(0.22, 0.61, 0.36, 1)'};
`

const OptionBtn = styled.button<SelectedProps>`
    background-color: transparent;
    border: none;
    color: ${({ active, theme }) => active ? theme.colors.primaryColor : theme.colors.textColor};
    cursor: pointer;
    display: block;
    font-size: 16px;
    height: ${selectHeight}px;
    padding: 0 0.2rem;
    text-align: left;
    width: 100%;
    transition: all .15s ease-in-out;
    &:hover {
        background-color: ${({ theme }) => theme.colors.gray};
        color: ${({ active, theme }) => active ? theme.colors.primaryColor : theme.colors.textColor};
    }
`

const Select = ({ options, value, onChange, ...rest }: ISelect) => {
    const selectRef: React.RefObject<HTMLDivElement> = React.createRef()
    const [opened, setOpened] = useState(false)
    const [currentValue, setCurrentValue] = useState(value)

    const closeMenu = () => {
        setOpened(false)
    }

    const toggleOpen = () => {
        setOpened(!opened)
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (selectRef && selectRef !== null) {
            const cur = selectRef.current
            if (cur && !cur.contains(e.target as Node)) {
                closeMenu()
            }
        }
    }

    const handleValueChange = (value: string) => {
        setCurrentValue(value)
    }

    const handleChange = (value: any) => {
        handleValueChange(value)

        if (onChange) onChange(value)

        toggleOpen()
    }

    useEffect(
        () => {
            document.addEventListener('mousedown', handleClickOutside, false)
            return () => {
                document.removeEventListener('mousedown', handleClickOutside, false)
            }
        }
    )

    return (
        <SelectWrapper ref={selectRef}>
            <SelectContains opened={opened}>
                <SelectedFiled onClick={toggleOpen} type="button">{options.find((option: SelectProps) => option.value === currentValue)?.label}</SelectedFiled>
                <MenuWrapper opened={opened}>
                    <Menu opened={opened}>
                        {options.map((item: SelectProps, key: number) => (
                            <OptionBtn type="button" key={key} onClick={() => handleChange(item.value)} active={item.value === currentValue}>{item.label}</OptionBtn>
                        ))}
                    </Menu>
                </MenuWrapper>
            </SelectContains>
        </SelectWrapper>
    )
}

export default Select