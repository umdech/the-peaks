import Layout from "@/components/layouts";
const PostDetail = () => {
    return (
        <Layout>
            <div className="container">sss</div>
        </Layout>
    )
}

export const getServerSideProps = () => {
    return {
        props: {
            test: 'fff'
        }
    }
}

export default PostDetail