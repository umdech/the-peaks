import styled from 'styled-components'

const Heading = styled.h4`
    font-size: 32px;
`

const Error = () => (
    <div className="container">
        <Heading>Sorry, we couldn’t find that page</Heading>
    </div>
)

export default Error