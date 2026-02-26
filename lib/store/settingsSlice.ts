import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define the settings state interface
export interface NotificationSettings {
    email: {
        security: boolean
        marketing: boolean
        updates: boolean
        comments: boolean
        mentions: boolean
    }
    push: {
        messages: boolean
        updates: boolean
        marketing: boolean
        security: boolean
    }
}

export interface SettingsState {
    notifications: NotificationSettings
    theme: string
    language: string
}

// Define initial state
const initialState: SettingsState = {
    notifications: {
        email: {
            security: true,
            marketing: false,
            updates: true,
            comments: true,
            mentions: true,
        },
        push: {
            messages: true,
            updates: false,
            marketing: false,
            security: true,
        },
    },
    theme: 'light',
    language: 'en',
}

// Create the settings slice
const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        // Update email notification settings
        updateEmailNotification: (state, action: PayloadAction<{ key: keyof NotificationSettings['email']; value: boolean }>) => {
            state.notifications.email[action.payload.key] = action.payload.value
        },

        // Update push notification settings
        updatePushNotification: (state, action: PayloadAction<{ key: keyof NotificationSettings['push']; value: boolean }>) => {
            state.notifications.push[action.payload.key] = action.payload.value
        },

        // Update all notification settings at once
        setNotifications: (state, action: PayloadAction<NotificationSettings>) => {
            state.notifications = action.payload
        },

        // Update theme
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload
        },

        // Update language
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload
        },

        // Reset all settings to default
        resetSettings: () => initialState,
    },
})

// Export actions
export const {
    updateEmailNotification,
    updatePushNotification,
    setNotifications,
    setTheme,
    setLanguage,
    resetSettings,
} = settingsSlice.actions

// Export reducer
export default settingsSlice.reducer
