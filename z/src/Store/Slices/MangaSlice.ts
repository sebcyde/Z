import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface MangaIDStateInt {
	id: number;
}

const initialState: MangaIDStateInt = {
	id: 0,
};

export const MangaIDState = createSlice({
	name: 'MangaPassthrough',
	initialState,
	reducers: {
		UpdateMangaID: (state, action: PayloadAction<number>) => {
			state.id = action.payload;
		},
	},
});

export const { UpdateMangaID } = MangaIDState.actions;
export default MangaIDState.reducer;
