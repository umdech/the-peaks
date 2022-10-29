import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'

const Header = dynamic(() => import('@/components/layouts/header'))
const Footer = dynamic(() => import('@/components/layouts/footer'))

type Props = {
    title?: string,
    children: JSX.Element
}
const Layout = ({ title, children }: Props) => {
    const the_title: string = `The peaks${title ? ` - ${title}` : ``}`
    return (
        <>
            <Head>
                <title>{the_title}</title>
            </Head>
            <Header />
            <div className="page">
                {children}
                <Footer />
            </div>
        </>
    )
}

export default Layout