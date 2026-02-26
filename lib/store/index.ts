import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import settingsReducer from './settingsSlice'
import organizationReducer from './organizationSlice'

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['settings', 'organization'],
}

// Combine reducers
const rootReducer = combineReducers({
    settings: settingsReducer,
    organization: organizationReducer,
})

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Create the Redux store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

// Create persistor
export const persistor = persistStore(store)

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
