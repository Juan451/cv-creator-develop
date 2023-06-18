/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-template */
/* eslint-disable prefer-const */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let userServiceUrl = 'http://localhost:3333/';

const initialState = {
  loggedIn: true,
  token: '',
  loading: false,
  error: null,
};

export const userRegister = createAsyncThunk(
  'user/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(userServiceUrl + 'sign-in', userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const userLogin = createAsyncThunk(
  'user/login',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(userServiceUrl + 'login', userData);
      dispatch(
        updateUser({
          loggedIn: true,
          token: response.data,
        })
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { dispatch }) => {
    dispatch(
      updateUser({
        loggedIn: false,
        token: '',
      })
    );
  }
);

const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.loggedIn = action.payload.loggedIn;
      state.token = action.payload.token;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.token = action.payload;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.token = action.payload;
      })
      .addCase(logout.fulfilled, state => {
        state.loggedIn = false;
        state.token = '';
      });
  },
});

export const { updateUser } = loginSlice.actions;

export default loginSlice.reducer;
