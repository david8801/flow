import '../styles/globals.css'
import "../styles/pagination.css"
import {Provider} from 'react-redux';
import {store} from '../store/store';
import StateManager from "../components/StateManager";
import RenderContent from "../components/RenderContent";
import getCategories from "./api/getCategories";
import getPosts from "./api/getPosts";
import getRunningLineSettings from "./api/getRunningLineSettings";


function MyApp({ Component, pageProps }) {
  console.log("pageProps", pageProps)
  return (
    <Provider store={store}>
      <StateManager>
        <RenderContent categories={pageProps.categories} posts={pageProps.posts}>
          <Component {...pageProps} />
        </RenderContent>
      </StateManager>
    </Provider>)
}

MyApp.getInitialProps = async () => {
  let posts = await getPosts()
  const categories = await getCategories()
  const runningLineSettings = await getRunningLineSettings()

  posts = posts.map(i => {
    const category = categories?.find(j => i.data.category === j.data.name)
    return {
      ...i,
      category_slug: category.slug,
      data: { ...i.data, category_color: category?.data.color, category_order: category?.data.order }
    }
  })

  return {
    props: { posts, categories, runningLineSettings }
  }
}

export default MyApp
