import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const Header = dynamic(() => import('@/components/layouts/header'))
const Footer = dynamic(() => import('@/components/layouts/footer'))

type Props = {
    title?: string,
    description?: string,
    children: JSX.Element
}
const Layout = ({ title, children, description }: Props) => {
    const router = useRouter()
    const the_title: string = `The Peaks${title ? ` - ${title}` : ``}`
    const the_description: string = description || `Breaking news, sport, culture, lifestyle, and a whole lot more. The Peaks.`
    const canonical = `${process.env.NEXT_PUBLIC_BASE_URL}${router ? router.asPath : ''}`

    const stripHtml = (str: string) => (
        str.replace(/(<([^>]+)>)/gi, '')
    )

    const removeQueryStrings = (str: string) => (
        str.split('?')[0]
    )
    return (
        <>
            <Head>
                <title>{stripHtml(the_title)}</title>
                <meta name="description" content={stripHtml(the_description)} />
                <link rel="canonical" href={`${removeQueryStrings(canonical)}`} />
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