import user from '../features/userSlice';
const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
  reducer: {
    user,
  },

  middleware: getDefaultMiddleWare =>
    getDefaultMiddleWare({
      serializableCheck: false,
    }),
});

export default store;
