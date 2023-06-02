import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ForYouStateInt {
	Favourites: object[];
}

const initialState: ForYouStateInt = {
	Favourites: [],
};

export const FavouritesListState = createSlice({
	name: 'FavePassthrough',
	initialState,
	reducers: {
		AddToFavourites: (state, action: PayloadAction<object>) => {
			state.Favourites = [...state.Favourites, action.payload];
		},
	},
});

export const { AddToFavourites } = FavouritesListState.actions;
export default FavouritesListState.reducer;
