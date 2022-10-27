import { rgba } from 'polished';
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    body {
        font-family: ${({ theme }) => theme.fonts.familyBody};
        font-size: 16px;
        line-height: 1.5em;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    h1, h2, h3, h4 {
        font-family: ${({ theme }) => theme.fonts.familyHeading};
        margin-top: 0;
    }
    .container {
        margin-left: auto;
        margin-right: auto;
        max-width: 1110px;
        padding-left: 1rem;
        padding-right: 1rem;
        width: 100%;
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