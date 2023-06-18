import { createSlice } from '@reduxjs/toolkit';

const strongPointsSlice = createSlice({
  name: 'strongPoints',
  initialState: [],
  reducers: {
    addStrongPoint: (state, action) => [...state, action.payload],
    removeStrongPoint: (state, action) =>
      state.filter(strongPoint => strongPoint !== action.payload),
  },
});

export const { addStrongPoint, removeStrongPoint } = strongPointsSlice.actions;
export default strongPointsSlice.reducer;
