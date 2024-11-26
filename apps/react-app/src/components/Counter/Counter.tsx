import { useSelector, useDispatch } from 'react-redux';
import { decrementCounterAction, incrementCounterAction } from '../../actions/counter';
import { counterSelector } from '../../selectors';
import { Button, Container, Typography } from '@mui/material';

const Counter = () => {
  const count = useSelector(counterSelector);
  const dispatch = useDispatch();

  return (
    <div>
      <Typography variant="h3" gutterBottom display={'flex'} justifyContent={'center'}>
        {count}
      </Typography>
      <Button variant="contained" onClick={() => dispatch(incrementCounterAction())}>
        Increment
      </Button>
      <Button variant="contained" onClick={() => dispatch(decrementCounterAction())}>
        Decrement
      </Button>
    </div>
  );
};

export default Counter;
