import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
        // Add reducers from slices here
	}
});

//Just some typeScript-bullshit
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;