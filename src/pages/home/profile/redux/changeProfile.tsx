import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../../../utils/axios.config';

export type InitialState = {
  loading: boolean;
  response: string;
  error: string | null;
};

const initialState: InitialState = {
  loading: false,
  response: '',
  error: null,
};

function rejectWithValue(error: string) {
  throw new Error(error);
}

export const changeProfile = createAsyncThunk('profile/changeProfile', async({ token, obj }: { token: string, obj: { lastName?: string, firstName?: string } }) => {
  return api
    .patch('/api/v2/users', { firstName: obj.firstName, name: obj.lastName }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      switch (error.response.status) {
      case 500:
        return rejectWithValue('Internal Error.');
      default:
        return rejectWithValue(error.response.data.message);
      }
    });
});

const changeProfileData = createSlice({
  name: 'changeProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changeProfile.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.response = action.payload;
      state.error = '';
    });
    builder.addCase(changeProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown Error';
    });
  },
});

export default changeProfileData.reducer;