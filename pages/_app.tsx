import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { Provider } from 'react-redux'
import { store } from 'store'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../styles/globals'
import { theme } from '../styles/theme'

const Loader = dynamic(() => import('@/components/loader'))

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Loader />
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    )
}
