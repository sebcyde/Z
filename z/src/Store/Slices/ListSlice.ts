import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Anime } from '../../Types/AnimeTypes';

interface ListType {
	List: Anime[] | null;
	ListName: string;
}

const initialState: ListType = {
	List: null,
	ListName: '',
};

export const ListState = createSlice({
	name: 'ListState',
	initialState,
	reducers: {
		SetList: (
			state,
			action: PayloadAction<{ List: Anime[]; ListName: string }>
		) => {
			state.List = action.payload.List;
			state.ListName = action.payload.ListName;
		},
	},
});

export const { SetList } = ListState.actions;
export default ListState.reducer;
