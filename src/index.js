import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import name from './ducks/reducers';


ReactDOM.render(<Provider store={createStore(name)}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
