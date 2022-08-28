import '../styles/globals.css'
import "../styles/pagination.css"
import {Provider} from 'react-redux';
import {store} from '../store/store';
import StateManager from "../components/StateManager";
import RenderContent from "../components/RenderContent";
import getCategories from "./api/getCategories";


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <StateManager>
        <RenderContent categories={pageProps.categories}>
          <Component {...pageProps} />
        </RenderContent>
      </StateManager>
    </Provider>)
}

MyApp.getInitialProps = async () => {
  const categories = await getCategories()

  return {
    props: { categories }
  }
}

export default MyApp
