import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface NotificationStateType {
	LastSeen: number;
}

const initialState: NotificationStateType = {
	LastSeen: 0,
};

export const NotificationState = createSlice({
	name: 'AnimePassthrough',
	initialState,
	reducers: {
		UpdateLastSeen: (state, action: PayloadAction<number>) => {
			state.LastSeen = action.payload;
		},
	},
});

export const { UpdateLastSeen } = NotificationState.actions;
export default NotificationState.reducer;
