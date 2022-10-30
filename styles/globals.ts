import { rgba } from 'polished';
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    body {
        color: ${({ theme }) => theme.colors.textColor};
        font-family: ${({ theme }) => theme.fonts.familyBody};
        font-size: 14px;
        line-height: 1.4em;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    h1, h2, h3, h4 {
        font-family: ${({ theme }) => theme.fonts.familyHeading};
        line-height: 1.2em;
        margin-top: 0;
    }
    h1 {
        font-size: 30px;
        line-height: 1.2em;
        @media ${({ theme }) => theme.breakpoints.md} {
            font-size: 34px;
        }
    }
    h2 {
        font-size: 48px;
    }
    h4 {
        font-size: 28px;
    }
    a {
        text-decoration: none !important;
    }
    p {
        margin: 0;
        margin-bottom: 1.5rem;
    }
    strong {
        font-weight: 700;
    }
    .container {
        margin-left: auto;
        margin-right: auto;
        max-width: calc(1130px + 2rem);
        padding-left: 1rem;
        padding-right: 1rem;
        width: 100%;
    }
    .page {
        min-height: 100vh;
        padding-bottom: calc(240px + 2rem);
        padding-top: calc(124px + 2rem);
        position: relative;
        @media ${({ theme }) => theme.breakpoints.md} {
            padding-bottom: calc(240px + 4rem);
            padding-top: calc(116px + 4rem);
        }
    }
    /* Placeholder */
    ::placeholder {
        color: ${({ theme }) => rgba(theme.colors.white, 0.4)};
        opacity: 1;
    }
    :-ms-input-placeholder {
        color: ${({ theme }) => rgba(theme.colors.white, 0.4)};
    }
    ::-ms-input-placeholder {
        color: ${({ theme }) => rgba(theme.colors.white, 0.4)};
    }
`

export default GlobalStyle