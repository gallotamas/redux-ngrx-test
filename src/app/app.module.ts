import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { StoreModule, Store, REDUCER_FACTORY } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { createEpicMiddleware } from './angular-redux/redux-observable/createEpicMiddleware';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppState, initialState } from './common/app-state';
import { createRootReducer } from './common/root-reducer';
import { SyncWithReduxEffects } from './ngRx/sync-with-redux-effect';
import { rootEpic } from './angular-redux/root-epic';
import { metaReducers, combineReducersFactory } from './ngRx';

const rootReducer = createRootReducer() as any;

export const NG_RX_STORE_PROVIDER = [
  StoreModule.forRoot(rootReducer, { initialState, metaReducers }),
  EffectsModule.forRoot([SyncWithReduxEffects]),
];

export const NG_RX_REDUCER_FACTORY = [
  {
      provide: REDUCER_FACTORY,
      useFactory: () => combineReducersFactory
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule,
    ...NG_RX_STORE_PROVIDER,
  ],
  providers: [...NG_RX_REDUCER_FACTORY],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<AppState>, store: Store<AppState>) {
    const epicMiddleware = createEpicMiddleware({
      dependencies: { getNgRxStore: () => store }
    });

    ngRedux.configureStore(rootReducer, {} as any, [epicMiddleware]);
    epicMiddleware.run(rootEpic);
  }
}
