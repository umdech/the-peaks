import dynamic from "next/dynamic";

import Layout from "@/components/layouts";
import Section from "@/components/section";
const TopStories = dynamic(() => import('@/components/top-stories'))


const Home = () => {
    return (
        <Layout>
            <div className="container">
                <TopStories />

                {/* Sections */}
                <Section name="sport" />
                <Section name="culture" />
                <Section name="lifeandstyle" />
            </div>
        </Layout>
    )
}

export default Home