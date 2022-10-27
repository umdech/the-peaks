import styled from 'styled-components'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const Icon = dynamic(() => import('@/components/icon'))
const Logo = dynamic(() => import('@/components/icon/logo'))
const SearchBox = dynamic(() => import('@/components/search-box'))

const HeaderWrapper = styled.header`
    background-color: ${({ theme }) => theme.colors.primaryColor};
    a {
        color: #ffffff;
        svg {
            display: block;
        }
    }
`

const HeaderContains = styled.div`
    padding-bottom: 3.25rem;
    padding-top: 1rem;
    position: relative;
    @media ${({ theme }) => theme.breakpoints.md} {
        padding-bottom: 1.875rem;
        padding-top: 1.875rem;
    }
`

const LogoContains = styled.div`
    margin-left: auto;
    margin-right: auto;
    width: 142px;
    @media ${({ theme }) => theme.breakpoints.md} {
        margin-left: 0;
    }
`

const SearchContains = styled.div`
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    position: absolute;
    right: 0;
    width: 100%;
    @media ${({ theme }) => theme.breakpoints.md} {
        width: auto;
    }
`

const Header = () => {
    return (
        <HeaderWrapper>
            <div className="container">
                <HeaderContains>
                    <LogoContains>
                        <Link href="/">
                            <Icon viewBox="0 0 142 56" width={142} height={56}>
                                <Logo />
                            </Icon>
                        </Link>
                    </LogoContains>
                    <SearchContains>
                        <SearchBox />
                    </SearchContains>
                </HeaderContains>
            </div>
        </HeaderWrapper>
    )
}

export default Header