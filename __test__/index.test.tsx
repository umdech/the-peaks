import { cleanup, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import axios from 'axios'

import Home from '@/pages/index'
import { theme } from '@/styles/theme'

jest.mock('next/router', () => ({
    useRouter() {
        return ({
            route: '/',
            pathname: '',
            query: '',
            asPath: '',
            push: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn()
            },
            beforePopState: jest.fn(() => null),
            prefetch: jest.fn(() => null)
        });
    },
}))

jest.mock('axios')

afterEach(cleanup)

describe('Home', () => {
    it('renders a heading', () => {
        axios.get.mockImplementation(() => Promise.resolve({
            data: {
                response: {
                    status: "ok",
                    userTier: "developer",
                    total: 0,
                    startIndex: 1,
                    pageSize: 8,
                    currentPage: 1,
                    pages: 0,
                    orderBy: "newest",
                    results: []
                }
            }
        }))
        render(<ThemeProvider theme={theme}><Home /></ThemeProvider>)

        const heading = screen.getByRole('heading', {
            name: /Breaking news, sport, culture, lifestyle, and a whole lot more.!/i,
        })

        expect(heading).toBeInTheDocument()
    })
})