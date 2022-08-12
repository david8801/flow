import '../styles/globals.css'
import {Provider} from 'react-redux';
import {store} from '../store/store';
import StateManager from "../components/StateManager";


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <StateManager>
        <Component {...pageProps} />
      </StateManager>
    </Provider>)
}

export default MyApp
