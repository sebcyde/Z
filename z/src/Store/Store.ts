import { configureStore } from '@reduxjs/toolkit';
import { AnimeIDState } from './Slices/AnimeSlice';
import { MangaIDState } from './Slices/MangaSlice';
import { FavouritesListState } from './Slices/FavouritesListSlice';
import { ListState } from './Slices/ListSlice';
import { VersionState } from './Slices/VersionSlice';
import { AdminDataState } from './Slices/AdminSlice';
import { NotificationState } from './Slices/NotifSlice';
import { UserState } from './Slices/UserSlice';

export const store = configureStore({
	reducer: {
		IDState: AnimeIDState.reducer,
		MangaIDState: MangaIDState.reducer,
		FavouritesListState: FavouritesListState.reducer,
		ListState: ListState.reducer,
		UserState: UserState.reducer,
		VersionState: VersionState.reducer,
		AdminDataState: AdminDataState.reducer,
		NotificationState: NotificationState.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
