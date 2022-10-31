import React from 'react'
import styled from 'styled-components'

type Props = {
    children?: any
}

const Contains = styled.div`
    display: grid;
    grid-gap: 30px;
    grid-template-columns: 1fr;
    margin-bottom: 50px;
    margin-top: 30px;
    @media ${({ theme }) => theme.breakpoints.md} {
        grid-template-columns: repeat(3, 1fr);
    }
`

const Grid: React.FC<Props> = ({ children }) => (
    <Contains>
        {children}
    </Contains>
)

export default Grid