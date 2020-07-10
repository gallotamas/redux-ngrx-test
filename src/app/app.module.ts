import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { createLogger } from 'redux-logger';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IAppState } from './store/IAppState';
import { rootReducer } from './store/rootReducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, { counter: 0 }, [createLogger()]);
  }
}
