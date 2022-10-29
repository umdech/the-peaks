import styled from 'styled-components'

const Card = styled.div`
    background-color: ${({ theme }) => theme.colors.gray};
    pointer-events: none;
    position: relative;
    &:before {
        content: '';
        display: block;
        padding-top: 100%;
    }
`

const CardPlaceholder = () => (
    <Card className="card-placeholder"></Card>
)

export default CardPlaceholder