import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './store/reducers';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import 'bootstrap/scss/bootstrap.scss';
import './assets/styles/main.scss';

const middlewares = [ReduxThunk];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);

const appStore = createStore(rootReducer, undefined, composedEnhancers);

ReactDOM.render(
	<Provider store={appStore}>
		<App />
	</Provider>,
	document.getElementById('app')
);