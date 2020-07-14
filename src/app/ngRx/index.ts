import {
  ActionReducer,
  MetaReducer,
  Action,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AppState } from '../common/app-state';

// This factory replaces @ngrx combine reducers so we can manage how we split the keys inside the state
export function combineReducersFactory(
  reducers: any,
  initialState: any = {}
): ActionReducer<any, Action> {
  return function combination(state = initialState, action) {
      const nextState: any = reducers(state, action);
      return nextState !== state ? nextState : state;
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
