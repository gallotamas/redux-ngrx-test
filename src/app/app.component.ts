import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { Store } from '@ngrx/store';
import { AppState } from './common/app-state';
import { counterSelector } from './common/counter/counter-selector';
import { INCREMENT, DECREMENT } from './common/counter/counter-actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'redux-ngrx-test';

  constructor(private ngRedux: NgRedux<AppState>, private store: Store<AppState>) {}

  ngOnInit() {
    this.ngRedux.select(counterSelector).subscribe((counter) => {
      console.log('%cValue from angular-redux:', 'color:purple', counter);
    });
    this.store.select(counterSelector).subscribe((counter) => {
      console.log('%cValue from NgRx:', 'color:green', counter);
    });

    console.log('%cDispatching actions using angular-redux', 'color:purple');
    this.ngRedux.dispatch({ type: INCREMENT });
    this.ngRedux.dispatch({ type: INCREMENT });
    this.ngRedux.dispatch({ type: DECREMENT });

    console.log('%cDispatching actions using NGRX', 'color:green');
    this.store.dispatch({ type: DECREMENT });
    this.store.dispatch({ type: INCREMENT });
    this.store.dispatch({ type: DECREMENT });
  }
}
