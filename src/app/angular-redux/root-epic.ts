import { combineEpics } from 'redux-observable';
import { syncWithNgRxEpic } from './sync-with-ngrx-epic';

export const rootEpic = (action$, store$, dependencies) =>
    combineEpics(...[
        syncWithNgRxEpic,
    ])(action$, store$, dependencies);
