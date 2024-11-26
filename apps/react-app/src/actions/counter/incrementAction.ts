import { CounterActionTypes } from '../../action-types';

const incrementCounterAction = () => ({
  type: CounterActionTypes.INCREMENT
});

export default incrementCounterAction;
