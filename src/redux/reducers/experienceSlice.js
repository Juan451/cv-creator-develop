/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Crear el thunk
export const addExperience = createAsyncThunk(
  'experience/addExperience',
  async (experience, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/experience',
        experience
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const experienceSlice = createSlice({
  name: 'experience',
  initialState: {
    experiences: [],
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addExperience.pending, state => {
        state.loading = 'loading';
      })
      .addCase(addExperience.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.experiences.push(action.payload);
      })
      .addCase(addExperience.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload.error;
      });
  },
});

export default experienceSlice.reducer;
