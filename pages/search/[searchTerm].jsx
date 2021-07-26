import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Footer from '../../components/Footer'

export default function Search(initialData) {
    const router = useRouter()
    return (
        <>
            <div className="container">
                <Head>
                    <title>Search</title>
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="stylesheet" href="/styles.css" />
                </Head>
                <p>Go <Link href="/"><a>home</a></Link></p>
                <h1>Search results for: {router.query.searchTerm}</h1>

                <div className="giphy-search-results-grid">
                    {initialData.giphys.map((each, index) => {
                        return (
                            <div key={index}>
                                <h3>{each.title}</h3>
                                <img src={each.images.original.url} alt={each.title} width={376} height={190} layout="fixed" />
                            </div>
                        )
                    })}
                </div>
            </div>
            <Footer />
        </>
    )
}

export async function getServerSideProps(context) {
    const searchTerm = context.query.searchTerm
    let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=nPJNlVceWHERWCSDBW5XMo1p90l7l9ie&limit=6`)
    giphys = await giphys.json()
    return { props: { giphys: giphys.data } }
}