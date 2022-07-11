import { createSelector } from "reselect";
import { RootState } from "..";
import { SyncKeys } from "../../types/sync";


export const selectSyncState = (state: RootState) => state.sync;

export const selectHasUnsavedChanges = createSelector(selectSyncState, s => s[SyncKeys.HasUnsavedChanges]);