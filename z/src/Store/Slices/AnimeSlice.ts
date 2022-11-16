import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AnimeIDStateInt {
	id: number;
}

const initialState: AnimeIDStateInt = {
	id: 0,
};

export const AnimeIDState = createSlice({
	name: 'AnimePassthrough',
	initialState,
	reducers: {
		Update: (state, action: PayloadAction<number>) => {
			state.id = action.payload;
		},
	},
});

export const { Update } = AnimeIDState.actions;
export default AnimeIDState.reducer;
