import { configureStore } from '@reduxjs/toolkit';
import { AnimeIDState } from './Slices/AnimeSlice';
import { MangaIDState } from './Slices/MangaSlice';

export const store = configureStore({
	reducer: {
		IDState: AnimeIDState.reducer,
		MangaIDState: MangaIDState.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
