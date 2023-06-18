/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Helper functions
const decodeUrl = url => {
  const segments = url.split('/');
  const page = segments.shift();
  return {
    page,
    segments,
  };
};

const loadPage = page => dispatch => {
  switch (page) {
    case 'login':
      import('../../views/view-tech-tools.js');
      break;
    case 'info':
      import('../../views/view-information.js');
      break;
    case 'skills':
      import('../../views/view-skills.js');
      break;
    case 'experience':
      import('../../views/view-experience.js');
      break;
    case 'studies':
      import('../../views/view-studies.js');
      break;
    case 'tech-tools':
      import('../../views/view-tech-tools.js');
      break;
    case 'certificates':
      import('../../views/view-certificates.js');
      break;
    case 'strong-points':
      import('../../views/view-strong-points.js');
      break;
    case 'summary':
      import('../../views/view-summary.js');
      break;
    default:
      import('../../views/view-404.js');
      page = '404';
      break;
  }
  // eslint-disable-next-line no-use-before-define
  dispatch(updatePage(page));
};

// Async thunk actions
export const navigate = createAsyncThunk(
  'app/navigate',
  async (path, { dispatch }) => {
    const url = path === '/' ? 'login' : path.slice(1);
    const decodedUrl = decodeUrl(url);
    await dispatch(loadPage(decodedUrl.page));
  }
);

// Redux slice
const routingSlice = createSlice({
  name: 'app',
  initialState: {
    loading: false,
    page: 'login',
    pageSection: '',
    pageParameter: '',
    feedback: { msg: '', status: '' },
    metadata: {},
  },
  reducers: {
    startLoading: state => {
      state.loading = true;
    },
    stopLoading: state => {
      state.loading = false;
    },
    updatePage: (state, action) => {
      state.page = action.payload;
    },
    updateSegments: (state, action) => {
      state.pageSection = action.payload.pageSection;
      state.pageParameter = action.payload.pageParameter;
    },
    updateMetadata: (state, action) => {
      state.metadata = action.payload;
    },
    sendFeedback: (state, action) => {
      state.feedback = action.payload;
    },
  },
  extraReducers: {
    // Handle async actions
  },
});

export const {
  startLoading,
  stopLoading,
  updatePage,
  updateSegments,
  updateMetadata,
  sendFeedback,
} = routingSlice.actions;

export default routingSlice.reducer;
