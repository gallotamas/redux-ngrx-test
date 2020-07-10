import { IAppState } from './IAppState';

const initialState: IAppState = {
    counter: 0,
};

export function rootReducer(state: IAppState = initialState, action): IAppState {
    switch (action.type) {
      case 'INCREMENT':
        return { counter: state.counter + 1 };
      case 'DECREMENT':
        return { counter: state.counter - 1 };
      default:
        return state;
    }
}
