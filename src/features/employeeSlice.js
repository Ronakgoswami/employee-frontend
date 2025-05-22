import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; 

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async (page = 1, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/employees?page=${page}`);
      return {
        data: res.data,
        currentPage: page,
        totalPages: res.data.totalPages
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addEmployee = createAsyncThunk(
  'employees/addEmployee',
  async (employeeData, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/employees`, employeeData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',
  async ({ id, employeeData }, thunkAPI) => {
    try {
      const res = await axios.put(`${BASE_URL}/employees/${id}`, employeeData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/employees/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchStats = createAsyncThunk(
  'employees/fetchStats',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/stats`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    list: [],
    stats: null,
    loading: false,
    loadingAdd: false,
    loadingUpdate: false,
    error: null,
    addError: null,
    updateError: null,
    totalPages: 1,
    currentPage: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      
      .addCase(addEmployee.pending, (state) => {
        state.loadingAdd = true;
        state.addError = null;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loadingAdd = false;
        state.list.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.loadingAdd = false;
        state.addError = action.payload || action.error.message;
      })

      .addCase(updateEmployee.pending, (state) => {
        state.loadingUpdate = true;
        state.updateError = null;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loadingUpdate = false;
        const index = state.list.findIndex(e => e.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loadingUpdate = false;
        state.updateError = action.payload || action.error.message;
      })

      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter(e => e.id !== action.payload);
      })

      .addCase(fetchStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  }
});

export default employeeSlice.reducer;
