import { CounterActionTypes } from '../../action-types';

const decrementCounterAction = () => ({
  type: CounterActionTypes.DECREMENT
});

export default decrementCounterAction;
