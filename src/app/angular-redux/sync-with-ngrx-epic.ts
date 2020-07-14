import { switchMap, tap, ignoreElements, take, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Action } from 'redux';
import { StateObservable } from 'redux-observable';
import { Store } from '@ngrx/store';
import { AppState } from '../common/app-state';
import { SYNC_WITH_REDUX, SYNC_WITH_NGRX } from '../common/root-actions';

export const syncWithNgRxEpic = (
    action$: Observable<Action>,
    state$: StateObservable<AppState>,
    { getNgRxStore }: { getNgRxStore: () => Store<AppState> }
) => {
    return action$.pipe(
        filter(action => ![SYNC_WITH_REDUX, SYNC_WITH_NGRX].includes(action.type)),
        switchMap(() => state$.pipe(take(1))),
        tap((state) => {
            getNgRxStore().dispatch({ type: SYNC_WITH_NGRX, state });
        }),
        ignoreElements(),
    );
};
