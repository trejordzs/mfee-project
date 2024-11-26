import { RootState } from '../reducers';

export const counterSelector = (state: RootState): number => state.counter.count;
