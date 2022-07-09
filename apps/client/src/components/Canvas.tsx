import { FC } from 'react';
import { Stage } from 'react-konva';
import { Provider, ReactReduxContext } from 'react-redux';

import styled from 'styled-components';

import { store } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setActiveComponent } from '../store/layers';
import { LayerWithComponents } from './LayerWithComponents';

export const Canvas: FC = () => {
  const { layers, activeComponent } = useAppSelector((s) => s.layers);
  const dispatch = useAppDispatch();

  const handleClick = ({ target: { attrs } }: any) => {
    if (!attrs.id && activeComponent) {
      dispatch(setActiveComponent(undefined));
    }
  };

  return (
    <CanvasWrapper>
      <Stage
        height={window.innerHeight - 200}
        onClick={handleClick}
        width={window.innerWidth - 500}
      >
        <Provider store={store}>
          {layers.map((l) => (
            <LayerWithComponents {...l} />
          ))}
        </Provider>
      </Stage>
    </CanvasWrapper>
  );
};

const CanvasWrapper = styled.div`
  flex: 1;
`;
