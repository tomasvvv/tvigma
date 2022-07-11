import { FC } from 'react';

import styled from 'styled-components';

import { Canvas } from './components/Canvas';
import { Sidebar } from './components/Sidebar';
import { Overlays } from './components/layouts/Overlays';

export const App: FC = () => (
  <AppWrapper>
    <Canvas />
    <Sidebar />
    <Overlays />
  </AppWrapper>
);

const AppWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 100%;
  width: 100%;
  min-height: 100vh;
  min-width: 100vw;
`;
