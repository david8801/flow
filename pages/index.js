import Head from 'next/head'
import getPosts from "./api/getPosts";
import styles from "../styles/homepage.module.css"
import getCategories from "./api/getCategories";

export default function Home({ posts, categories }) {
  const mainPost = posts[0];
  const additionalPosts = posts.slice(1, 5)

  console.log(mainPost)
  return (
    <div className={styles.homepage}>
      <Head>
        <title>Flow</title>
        <meta name="description" content="Flow blog"/>
        <link rel="icon" href="/public/favicon.ico"/>
      </Head>
      <div className={styles.head}>
        <div className={styles.mainArticle}>
          <img src={mainPost.data.image} alt=""/>
        </div>
        <div className={styles}>
          {additionalPosts.map(i => (
            <div></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const posts = await getPosts()
  // const categories = await getCategories()

  // posts.map(i => ({...i, data: {...i.data, category_color: categories.find(j => i.data.category === j.name)?.color}}))

  return {
    props: { posts, categories: [] }
  }
}
