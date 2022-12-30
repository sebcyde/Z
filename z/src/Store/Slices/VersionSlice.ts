import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface VersionStateInt {
	Version: string;
}

const initialState: VersionStateInt = {
	Version: '1.8.3',
};

export const VersionState = createSlice({
	name: 'VersionState',
	initialState,
	reducers: {
		SetVersion: (state, action: PayloadAction<string>) => {
			state.Version = action.payload;
		},
	},
});

export const { SetVersion } = VersionState.actions;
export default VersionState.reducer;
