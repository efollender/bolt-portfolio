import {
	createStore, 
	applyMiddleware,
	compose
} from 'redux';
import {Map} from 'immutable';
import thunk from 'redux-thunk';
import reducer from './reducer';
import routes from './routes';

export default createStore(
	reducer, 
	Map({}),
	compose(
		applyMiddleware(thunk),
    	window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);