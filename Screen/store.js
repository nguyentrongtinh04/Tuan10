import { configureStore } from '@reduxjs/toolkit';
import bikeReducer from './slices/bikeSlice'; // Đảm bảo đường dẫn đúng đến bikeSlice
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    bike: bikeReducer,
    auth: authReducer,
  },
  // Không cần thiết, nhưng bạn có thể thêm phần cấu hình cho middleware nếu cần.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Tắt kiểm tra serializable nếu cần, ví dụ cho các thao tác với dữ liệu không tuần tự
    }),
});

export default store;
