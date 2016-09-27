import {List, Map} from 'immutable';
import {
	PROJECTS_RECEIVED,
	PROJECTS_REQUEST
} from './constants';

const INITIAL_STATE = Map({

});

export default function reducer(state=INITIAL_STATE, action={}) {
	console.log(action);
	switch (action.type) {
		case PROJECTS_REQUEST:
			return state.set('loading', true);
		case PROJECTS_RECEIVED:
			return state.merge(Map({
				projects: action.data,
				loading: false
			}));
		default:
			return state;
			break;
	}
}