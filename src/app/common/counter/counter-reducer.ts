import { INCREMENT, DECREMENT } from './counter-actions';

export interface CounterState {
    value: number;
}

const initialState: CounterState = { value: 0 };

export function counterReducer(state: CounterState = initialState, action): CounterState {
    switch (action.type) {
      case INCREMENT:
        return { value: state.value + 1 };
      case DECREMENT:
        return { value: state.value - 1 };
      default:
        return state;
    }
}
