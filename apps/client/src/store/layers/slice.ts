import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NewCanvasComponent, UpdateLayerComponent } from '../../types/canvas';
import { Layer, LayerSliceState } from '../../types/layers';

const initialState: LayerSliceState = {
  layers: [],
  activeLayer: undefined,
  activeComponent: undefined,
};

type LayerIndex = number;

const layersSlice = createSlice({
  name: 'layers',
  initialState,
  reducers: {
    pushLayer: (state, action: PayloadAction<Layer>) => {
      state.layers.push(action.payload);
    },
    removeLayer: (state, action: PayloadAction<Layer['id']>) => {
      state.layers = state.layers.filter((l) => l.id !== action.payload);
    },
    swapLayers: (state, action: PayloadAction<[LayerIndex, LayerIndex]>) => {
      const [a, b] = action.payload;
      const temp = state.layers[a];

      state.layers[a] = state.layers[b];
      state.layers[b] = temp;
    },
    addComponentToLayer: (
      state,
      action: PayloadAction<{
        layerId: Layer['id'];
        component: NewCanvasComponent;
      }>
    ) => {
      const { layerId, component } = action.payload;
      const layerIndex = state.layers.findIndex(({ id }) => id === layerId);

      if (layerIndex !== -1) {
        state.layers[layerIndex].canvasComponents.push({
          ...component,
          parentLayerId: layerId,
        });
      }
    },
    setActiveLayer: (
      state,
      action: PayloadAction<LayerSliceState['activeLayer']>
    ) => {
      state.activeLayer = action.payload;
    },
    setActiveComponent: (
      state,
      action: PayloadAction<LayerSliceState['activeComponent']>
    ) => {
      state.activeComponent = action.payload;
    },
    updateLayerComponent: (
      state,
      action: PayloadAction<UpdateLayerComponent>
    ) => {
      const { layerId, componentId, size, position } = action.payload;

      const lIndex = state.layers.findIndex((l) => l.id === layerId);
      if (lIndex === -1) return;

      const cIndex = state.layers[lIndex].canvasComponents.findIndex(
        (c) => c.id === componentId
      );

      if (cIndex === -1) return;

      if (size) {
        state.layers[lIndex].canvasComponents[cIndex].size = size;
      }

      if (position) {
        state.layers[lIndex].canvasComponents[cIndex].position = position;
      }
    },
  },
});

export const {
  reducer: layersReducer,
  actions: {
    pushLayer,
    removeLayer,
    swapLayers,
    setActiveLayer,
    setActiveComponent,
    addComponentToLayer,
    updateLayerComponent,
  },
} = layersSlice;
