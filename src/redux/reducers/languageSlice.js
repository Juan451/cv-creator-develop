/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: [],
  reducers: {
    addLanguage: (state, action) => {
      state.push(action.payload);
    },
    updateLanguage: (state, action) => {
      const { index, language } = action.payload;
      state[index] = { ...state[index], ...language };
    },
    deleteLanguage: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
    },
  },
});

export const { addLanguage, updateLanguage, deleteLanguage } =
  languageSlice.actions;

const certificateSlice = createSlice({
  name: 'certificate',
  initialState: [],
  reducers: {
    addCertificate: (state, action) => {
      state.push(action.payload);
    },
    updateCertificate: (state, action) => {
      const { index, certificate } = action.payload;
      state[index] = { ...state[index], ...certificate };
    },
    deleteCertificate: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
    },
  },
});

export const { addCertificate, updateCertificate, deleteCertificate } =
  certificateSlice.actions;

export const languageReducer = languageSlice.reducer;
export const certificateReducer = certificateSlice.reducer;
