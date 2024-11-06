import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://672ada62976a834dd0249cd9.mockapi.io/bike';

// Async thunk to fetch bikes
export const fetchBikes = createAsyncThunk('bike/fetchBikes', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Async thunk to toggle heart
export const toggleHeart = createAsyncThunk('bike/toggleHeart', async (bike) => {
  const updatedBike = { ...bike, heart: !bike.heart };
  await axios.put(`${API_URL}/${bike.id}`, updatedBike);
  return updatedBike;
});

// Async thunk to add a bike
export const addBike = createAsyncThunk('bike/addBike', async (bikeData) => {
  const response = await axios.post(API_URL, bikeData);
  return response.data; // Trả về dữ liệu xe mới sau khi thêm
});

// Async thunk to edit a bike
export const editBike = createAsyncThunk('bike/editBike', async (updatedBike) => {
  const response = await axios.put(`${API_URL}/${updatedBike.id}`, updatedBike);
  return response.data; // Trả về dữ liệu xe đã chỉnh sửa
});

export const deleteBike = createAsyncThunk('bikes/deleteBike', async (bikeId, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${bikeId}`);
    return bikeId; // Trả lại ID để cập nhật state
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


const bikeSlice = createSlice({
  name: 'bike',
  initialState: {
    bikes: [],
    loading: false,
    error: null,
    selectedCategory: 'All',
  },
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBikes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBikes.fulfilled, (state, action) => {
        state.bikes = action.payload;
        state.loading = false;
      })
      .addCase(fetchBikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(toggleHeart.fulfilled, (state, action) => {
        const index = state.bikes.findIndex((bike) => bike.id === action.payload.id);
        if (index !== -1) {
          state.bikes[index] = action.payload;
        }
      })
      .addCase(addBike.fulfilled, (state, action) => {
        state.bikes.push(action.payload); // Thêm xe mới vào danh sách
      })
      .addCase(editBike.fulfilled, (state, action) => {
        const index = state.bikes.findIndex((bike) => bike.id === action.payload.id);
        if (index !== -1) {
          state.bikes[index] = action.payload; // Cập nhật xe đã chỉnh sửa
        }
      })
      .addCase(deleteBike.fulfilled, (state, action) => {
      state.bikes = state.bikes.filter((bike) => bike.id !== action.payload);
      });
  },
});

export const { setCategory } = bikeSlice.actions;
export default bikeSlice.reducer;
