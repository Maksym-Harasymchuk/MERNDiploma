import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      );
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (err) {
      const payloadError =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;

      return rejectWithValue(payloadError);
    }
  }
);

const register = createAsyncThunk(
  'user/register',
  async ({ name, email, password }, { dispatch, rejectWithValue }) => {
    try {
      console.log('called:', name, email, password);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        config
      );
      console.log('data:', data);
      return data;
    } catch (err) {
      console.log('response:', err.responce);
      const payloadError =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      console.log({ err });
      console.log('response:', err.response.data.message);

      return rejectWithValue(payloadError);
    }
  }
);

const update = createAsyncThunk(
  'user/update',
  async (user, { dispatch, rejectWithValue, getState }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      console.log('called:', userInfo);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(`/api/users/profile`, user, config);

      console.log('data:', data);
      return data;
    } catch (err) {
      console.log('response:', err.responce);
      const payloadError =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      console.log({ err });
      console.log('response:', err.response.data.message);

      return rejectWithValue(payloadError);
    }
  }
);

const list = createAsyncThunk(
  'user/list',
  async (nothing, { getState, rejectWithValue }) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get('/api/users', config);
      return data;
    } catch (err) {
      const payloadError =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;

      return rejectWithValue(payloadError);
    }
  }
);
const deleteUser = createAsyncThunk(
  'user/delete',
  async (id, { getState, rejectWithValue }) => {
    console.log(id);
    try {
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.delete(`/api/users/${id}`, config);
      return data;
    } catch (err) {
      const payloadError =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;

      return rejectWithValue(payloadError);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: [],
    userList: [],
    error: null,
    loading: true,
    success: '',
  },
  reducers: {
    logout: (state) => {
      state.userInfo = [];
      state.userList = [];
      localStorage.removeItem('userInfo');
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, { meta, payload }) => {
      state.userInfo = payload;
      state.userList = [];
      state.loading = false;
    },
    [login.pending]: (state, { meta }) => {
      state.loading = true;
    },
    [login.rejected]: (state, { meta, payload, error }) => {
      state.error = payload;
      state.loading = false;
    },
    [register.fulfilled]: (state, { meta, payload }) => {
      state.userInfo = payload;
      state.loading = false;
    },
    [register.pending]: (state, { meta }) => {
      state.loading = true;
    },
    [register.rejected]: (state, { meta, payload, error }) => {
      state.error = payload;
      state.loading = false;
    },
    [update.fulfilled]: (state, { meta, payload }) => {
      state.userInfo = payload;
      state.success = true;
      state.loading = false;
    },
    [update.pending]: (state, { meta }) => {
      state.loading = true;
    },
    [update.rejected]: (state, { meta, payload, error }) => {
      state.error = payload;
      state.loading = false;
    },
    [list.fulfilled]: (state, { meta, payload }) => {
      state.userList = payload;
      state.loading = false;
    },
    [list.pending]: (state, { meta }) => {
      state.loading = true;
    },
    [list.rejected]: (state, { meta, payload, error }) => {
      state.error = payload;
      console.log('rejected', payload);
      state.loading = false;
    },
    [deleteUser.fulfilled]: (state, { meta, payload }) => {
      state.loading = false;
    },
    [deleteUser.pending]: (state, { meta }) => {
      state.loading = true;
    },
    [deleteUser.rejected]: (state, { meta, payload, error }) => {
      state.error = payload;
    },
  },
});

export const { logout } = userSlice.actions;
export { login, register, update, list, deleteUser };
export default userSlice.reducer;
