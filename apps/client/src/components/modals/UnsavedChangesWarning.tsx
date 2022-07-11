import { memo } from "react";
import styled from "styled-components";

export const UnsavedChangesWarning = memo(() => {
  return (<Wrapper>
    You have unsaved changes! <SaveButton>Save them!</SaveButton>
  </Wrapper>)
});

UnsavedChangesWarning.displayName= 'UnsavedChangesWarning';

const Wrapper = styled.div`
  padding: 1rem;
  border-radius: 0.25rem;
  background: rgba(0, 0, 0, .4);
  box-shadow: 0px 0px 20px rgba(0,0,0,.25);
  color: white;
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
`

const SaveButton = styled.u`
  cursor: pointer;
  font-weight: bold; 
`