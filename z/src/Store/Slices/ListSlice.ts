import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Anime } from '../../Types/AnimeTypes';

interface ListType {
	List: Anime[] | null;
}

const initialState: ListType = {
	List: null,
};

export const ListState = createSlice({
	name: 'ListState',
	initialState,
	reducers: {
		SetList: (state, action: PayloadAction<Anime[] | null>) => {
			state.List = action.payload;
		},
	},
});

export const { SetList } = ListState.actions;
export default ListState.reducer;
