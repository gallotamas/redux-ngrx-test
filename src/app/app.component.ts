import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store/IAppState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'redux-ngrx-test';

  constructor(private ngRedux: NgRedux<IAppState>) {}

  ngOnInit() {
    this.ngRedux.subscribe(() => {
      console.log(this.ngRedux.getState());
    });

    this.ngRedux.dispatch({ type: 'INCREMENT' });
    this.ngRedux.dispatch({ type: 'INCREMENT' });
    this.ngRedux.dispatch({ type: 'DECREMENT' });
  }
}
