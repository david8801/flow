import Head from 'next/head'
import getPosts from "./api/getPosts";
import Header from "../components/Header";

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Flow</title>
        <meta name="description" content="Flow blog"/>
        <link rel="icon" href="/public/favicon.ico"/>
      </Head>
      <span>asdasasd fasfa sfas asf asfasfas fa sfaf asf asfas f</span>
    </div>
  )
}

export async function getStaticProps() {
  const posts = await getPosts()

  return {
    props: { posts }
  }
}
