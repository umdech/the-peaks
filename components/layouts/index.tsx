import dynamic from 'next/dynamic'
import Head from 'next/head'
import React from 'react'

const Header = dynamic(() => import('@/components/layouts/header'))

type Props = {
    title?: string,
    children: JSX.Element
}
const Layout = ({ title, children }: Props) => {
    const the_title: string = `${title ? `${title} - ` : ``}The peaks`
    return (
        <>
            <Head>
                <title>{the_title}</title>
            </Head>
            <Header />
            <div className="page">
                {children}
            </div>
        </>
    )
}

export default Layout