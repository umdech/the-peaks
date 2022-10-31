import dynamic from "next/dynamic";
import styled from "styled-components";

import Layout from "@/components/layouts";
import Section from "@/components/section";
const TopStories = dynamic(() => import('@/components/top-stories'))

const Heading = styled.h1`
    height: 0;
    margin: 0;
    overflow: hidden;
    visibility: hidden;
    width: 0;
`

const Home = () => {
    return (
        <Layout>
            <div className="container">
                <Heading>Breaking news, sport, culture, lifestyle, and a whole lot more. The Peaks.</Heading>
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