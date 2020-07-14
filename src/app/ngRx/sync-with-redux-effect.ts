import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { tap, take, switchMap, filter } from 'rxjs/operators';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../common/app-state';
import { SYNC_WITH_REDUX, SYNC_WITH_NGRX } from '../common/root-actions';

@Injectable()
export class SyncWithReduxEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private ngRedux: NgRedux<AppState>,
    ) {}

    @Effect({ dispatch: false })
    syncWithRedux$ = this.actions$.pipe(
        filter(action => !['@ngrx/effects/init', SYNC_WITH_REDUX, SYNC_WITH_NGRX].includes(action.type)),
        switchMap(() => this.store.pipe(take(1))),
        tap(state => {
            this.ngRedux.dispatch({ type: SYNC_WITH_REDUX, state });
        })
    );
}
