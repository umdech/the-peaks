import Layout from '@/components/layouts'

const Offline = () => {
    return (
        <Layout title="You're offline">
            <div className="container">
                <h4 dangerouslySetInnerHTML={{ __html: `You're offline, please check your connection!` }}></h4>
            </div>
        </Layout>
    )
}

export default Offline