/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addStudiesAsync = createAsyncThunk(
  'studies/addStudiesAsync',
  async study => {
    const response = await axios.post(
      'http://localhost:8080/api/v1/education',
      study
    );
    return response.data;
  }
);

const studiesSlice = createSlice({
  name: 'studies',
  initialState: {
    studies: [],
  },
  reducers: {
    addStudies: (state, action) => {
      state.studies.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(addStudiesAsync.fulfilled, (state, action) => {
      state.studies.push(action.payload);
    });
  },
});

export const { addStudies } = studiesSlice.actions;

export default studiesSlice.reducer;
