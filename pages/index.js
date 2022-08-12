import Head from 'next/head'
import getPosts from "./api/getPosts";
import styles from "../styles/homepage.module.css"
import getCategories from "./api/getCategories";
import ArticleRow from "../components/ArticleRow";

export default function Home({ posts, categories }) {
  const mainPost = posts[0];
  const additionalPosts = posts.slice(1, 5)
  console.log("categories", categories)

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
          <div className={styles.mainArticleContent}>
            <ArticleRow size={"big"} data={mainPost.data} showSubtitle/>
          </div>
        </div>
        <div className={styles.articleList}>
          {additionalPosts.map(i => (
            <ArticleRow data={i.data}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  let posts = await getPosts()
  const categories = await getCategories()

  posts = posts.map(i => ({...i, data: {...i.data, category_color: categories.find(j => i.data.category === j.slug).data.color || null}}))

  return {
    props: { posts, categories }
  }
}
