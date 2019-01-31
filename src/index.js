import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import rootReducer from './store/reducers';
// import { composeWithDevTools } from 'redux-devtools-extension';
import 'bootstrap/scss/bootstrap.scss';
import './assets/styles/main.scss';

const appStore = createStore(rootReducer, undefined,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



ReactDOM.render(
	<Provider store={appStore}>
		<App />
	</Provider>,
	document.getElementById('app')
);