/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const postUser = createAsyncThunk(
  'info/postUser',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/user',
        userData
      );
      return response.data;
    } catch (error) {
      throw new Error('Error al enviar los datos del usuario');
    }
  }
);

const userSlice = createSlice({
  name: 'info',
  initialState: {
    id: '',
    firstName: '',
    lastName: '',
    city: '',
    postalCode: '',
    phone: '',
    email: '',
  },
  reducers: {
    setUserData: (state, action) => action.payload,
  },
  extraReducers: builder => {
    builder.addCase(postUser.fulfilled, (state, action) => action.payload);
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
