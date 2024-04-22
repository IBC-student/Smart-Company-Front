import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { Provider } from 'react-redux';
//import store from './store';
import store from './store/index';
import { MyAlert } from './components/MyAlert';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <Provider store={store}>
    <MyAlert />
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>,
  document.getElementById('root')
);
