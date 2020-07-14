import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import { counterReducer } from './counter/counter-reducer';
import { SYNC_WITH_REDUX, SYNC_WITH_NGRX } from './root-actions';

export function rootReducer(state: any = {}, action): any {
  switch (action.type) {
    case SYNC_WITH_REDUX:
    case SYNC_WITH_NGRX:
      return action.state;
    default:
      return state;
  }
}

export function createRootReducer() {
  return reduceReducers(
    rootReducer,
    combineReducers({
      counter: counterReducer
    })
  );
}
