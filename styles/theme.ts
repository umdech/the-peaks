import { DefaultTheme } from 'styled-components'

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            primaryColor: string,
            white: string,
            red: string,
            yellow: string,
            blue: string
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
        white: '#ffffff',
        red: '#F50057',
        yellow: '#FFCA28',
        blue: '#2196F3'
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