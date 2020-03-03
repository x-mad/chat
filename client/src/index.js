import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import App from './components/App';
import reducers from './reducers'
import rootSaga from './sagas';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(/*logger,*/ sagaMiddleware));
sagaMiddleware.run(rootSaga);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

