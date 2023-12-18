import { configureStore } from '@reduxjs/toolkit';
import { dataReducer } from '../redux/reducers/dataReducer';

export const store = configureStore({
  reducer: {dataReducer}
});
  