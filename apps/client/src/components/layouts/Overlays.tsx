import { memo } from "react";
import styled from "styled-components/macro";
import { UnsavedChangesWarning } from "../modals/UnsavedChangesWarning";
import { useAppSelector } from "../../store/hooks";
import { selectHasUnsavedChanges } from "../../store/sync/selectors";
import { SyncKeys } from "../../types/sync";

export const Overlays = memo(() => {
  const hasUnsavedChanges = useAppSelector(selectHasUnsavedChanges);

  return (
    <OverlaysWrapper>
      {(hasUnsavedChanges || true) && <UnsavedChangesWarning />}
    </OverlaysWrapper>
  )
});

Overlays.displayName = 'Overlays';

const OverlaysWrapper = styled.div`
`