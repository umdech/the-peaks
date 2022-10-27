import { DefaultTheme } from 'styled-components'

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            primaryColor: string,
            white: string
        },
        fonts: {
            familyHeading: string,
            familyBody: string
        },
        breakpoints: {
            sm: string,
            md: string,
            lg: string
        }
    }
}

export const theme: DefaultTheme = {
    colors: {
        primaryColor: '#09357B',
        white: '#ffffff'
    },
    fonts: {
        familyHeading: "'Georgia', serif",
        familyBody: "'Roboto', sans-serif"
    },
    breakpoints: {
        sm: `(min-width: 576px)`,
        md: `(min-width: 768px)`,
        lg: `(min-width: 992px)`
    }
}