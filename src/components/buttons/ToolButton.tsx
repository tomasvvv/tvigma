import { FC, ReactNode } from 'react';

import styled from 'styled-components/macro';

interface Props {
  onClick: () => void;
  children: ReactNode;
}

export const ToolButton: FC<Props> = ({ children, ...props }) => (
  <StyledButton {...props} type="button">
    {children}
  </StyledButton>
);

const StyledButton = styled.button`
  padding: 0.25rem;
  border: 1px solid gray;
`;
