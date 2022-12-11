import { configureStore } from '@reduxjs/toolkit';
import { AnimeIDState } from './Slices/AnimeSlice';
import { MangaIDState } from './Slices/MangaSlice';
import { FavouritesListState } from './Slices/FavouritesListSlice';
import { UserState } from './Slices/UserSlice';

export const store = configureStore({
	reducer: {
		IDState: AnimeIDState.reducer,
		MangaIDState: MangaIDState.reducer,
		FavouritesListState: FavouritesListState.reducer,
		UserState: UserState.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
