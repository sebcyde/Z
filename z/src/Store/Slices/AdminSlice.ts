import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AdminSliceType {
	AdminData: {};
}

const initialState: AdminSliceType = {
	AdminData: {},
};

export const AdminDataState = createSlice({
	name: 'AdminData',
	initialState,
	reducers: {
		UpdateAdminData: (state, action: PayloadAction<any>) => {
			state.AdminData = action.payload;
		},
	},
});

export const { UpdateAdminData } = AdminDataState.actions;
export default AdminDataState.reducer;
