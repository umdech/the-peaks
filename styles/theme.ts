import { DefaultTheme } from 'styled-components'

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            primaryColor: string,
            textColor: string,
            white: string,
            red: string,
            green: string,
            yellow: string,
            blue: string,
            gray: string
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
        textColor: '#212121',
        white: '#ffffff',
        red: '#F50057',
        green: '#388E3C',
        yellow: '#FFCA28',
        blue: '#2196F3',
        gray: '#EAEAEA'
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