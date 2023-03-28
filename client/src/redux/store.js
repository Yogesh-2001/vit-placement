import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/authSlice";
import { alertSlice } from "./features/alertSlice";
import { driveSlice } from "./features/driveSlice";
export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    alert: alertSlice.reducer,
    drive: driveSlice.reducer,
  },
});
