import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to { 
        transform: rotate(360deg);
    }
`

const Wrapper = styled.div`
    align-items: center;
    background-color: ${({ theme }) => theme.colors.white};
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: 124px;
    z-index: 1000;
    @media ${({ theme }) => theme.breakpoints.md} {
        top: 116px;
    }
`

const Loading = styled.div`
    animation-name: ${rotate}; 
    animation-duration: 0.8s; 
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    border: 0.4rem solid ${({ theme }) => theme.colors.primaryColor};
    border-radius: 50%;
    border-right-color: transparent;
    height: 3rem;
    width: 3rem;
    transition: all 0.5s ease-in;
    @media ${({ theme }) => theme.breakpoints.md} {
        border-width: 0.6rem;
        height: 5.5rem;
        width: 5.5rem;
    }
`

const Loader = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    useEffect(
        () => {
            const handleStart = (url: string) => (url !== router.asPath) && setLoading(true)
            const handleComplete = (url: string) => (url === router.asPath) && setTimeout(() => { setLoading(false) }, 500)
            router.events.on('routeChangeStart', handleStart)
            router.events.on('routeChangeComplete', handleComplete)
            router.events.on('routeChangeError', handleComplete)

            return () => {
                router.events.off('routeChangeStart', handleStart)
                router.events.off('routeChangeComplete', handleComplete)
                router.events.off('routeChangeError', handleComplete)
            }
        }
    )

    return loading ? (
        <Wrapper>
            <Loading></Loading>
        </Wrapper>
    ) : <></>
}

export default Loader