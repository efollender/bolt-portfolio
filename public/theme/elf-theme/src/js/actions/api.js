import request from 'superagent';
import * as actions from '../action_creators/api';

export function getProjects() {
  return async(dispatch) => {
    dispatch(actions.projectsRequest());
    try {
      let req = await request.get(`http://elf.dev/api/projects`);
      dispatch(actions.projectsReceived(req.body.data)); 
    } catch(ex) {
      console.log(ex);
    }
  }  
}