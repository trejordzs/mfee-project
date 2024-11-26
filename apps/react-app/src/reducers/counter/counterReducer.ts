import { initialState } from '../initial-state';
import { CounterActionTypes } from '../../action-types';
import { ActionInterface } from '../../types';

export default (state = initialState.counter, { type = '' }: ActionInterface) => {
  switch (type) {
    case CounterActionTypes.INCREMENT:
      return { ...state, count: state.count + 1 };
    case CounterActionTypes.DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};
