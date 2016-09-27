import {fromJS} from 'immutable';
import {
	PROJECTS_REQUEST,
	PROJECTS_RECEIVED
} from '../constants';

export function projectsRequest() {
  return {
    type: PROJECTS_REQUEST
  };
}

export function projectsReceived(projects) {
  return {
    type: PROJECTS_RECEIVED,
    data: fromJS(projects)
  };
}
