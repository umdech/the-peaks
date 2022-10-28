import dynamic from "next/dynamic";
import Link from "next/link";

import Layout from "@/components/layouts";
const TopStories = dynamic(() => import('@/components/top-stories'))


const Home = () => {
    return (
        <Layout>
            <div className="container">
                <TopStories />
                <Link href="/page2">Page 2</Link>
            </div>
        </Layout>
    )
}

export default Home