import styled from 'styled-components'

const FooterWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.primaryColor};
    bottom: 0;
    height: 240px;
    left: 0;
    position: absolute;
    right: 0;
    z-index: 999;
`
const Footer = () => {
    return (
        <FooterWrapper></FooterWrapper>
    )
}

export default Footer