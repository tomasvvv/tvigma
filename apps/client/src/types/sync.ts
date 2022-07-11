export enum SyncKeys {
  HasUnsavedChanges = 'hasUnsavedChanges'
};

export type SyncState = Record<SyncKeys, boolean>;

export type SetSyncPayload = {
  key: SyncKeys;
  toggle: boolean;
};
