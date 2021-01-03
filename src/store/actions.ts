import {
  ActionReducerMapBuilder,
  AsyncThunk,
  CaseReducer,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import {LoadState} from '../types';
import {RootState} from './root';

export const setLoadState = <S extends {loadState: LoadState}>(
  state: S,
  {payload}: PayloadAction<LoadState>,
) => {
  state.loadState = payload;
};

type PendingPayloadAction<A> = PayloadAction<
  undefined,
  string,
  {
    arg: A;
    requestId: string;
    requestStatus: 'pending';
  },
  never
>;

type FulfulledPayloadAction<R, A> = PayloadAction<
  R,
  string,
  {
    arg: A;
    requestId: string;
    requestStatus: 'fulfilled';
  },
  never
>;

type RejectedPayloadAction<A> = PayloadAction<
  unknown,
  string,
  {
    arg: A;
    requestId: string;
    rejectedWithValue: boolean;
    requestStatus: 'rejected';
    aborted: boolean;
    condition: boolean;
  },
  SerializedError
>;

export const applyLoadStateHooks = <R, A, S extends {loadState: LoadState}>(
  builder: ActionReducerMapBuilder<S>,
  action: AsyncThunk<R, A, {state: RootState}>,
  reducers?: {
    pending?: CaseReducer<S, PendingPayloadAction<A>>;
    fulfilled?: CaseReducer<S, FulfulledPayloadAction<R, A>>;
    rejected?: CaseReducer<S, RejectedPayloadAction<A>>;
  },
) => {
  builder.addCase(action.pending, (state, action) => {
    if (reducers?.pending) {
      reducers.pending(state, action);
    } else {
      state.loadState = LoadState.Pending;
    }
  });
  builder.addCase(action.fulfilled, (state, action) => {
    if (reducers?.fulfilled) {
      reducers.fulfilled(state, action);
    } else {
      state.loadState = LoadState.Fulfilled;
    }
  });
  builder.addCase(action.rejected, (state, error) => {
    if (reducers?.rejected) {
      reducers.rejected(state, error);
    } else {
      state.loadState = LoadState.Rejected;
    }
  });
};
