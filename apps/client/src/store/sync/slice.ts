import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetSyncPayload, SyncKeys, SyncState } from "../../types/sync";



const initialState: SyncState = {
  [SyncKeys.HasUnsavedChanges]: false
};


export const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    setSyncState: (state, { payload: { key, toggle }}: PayloadAction<SetSyncPayload>) => {
      state[key] = toggle;
    }
  }
})

export const { reducer: syncReducer, actions: { setSyncState} } = syncSlice;
