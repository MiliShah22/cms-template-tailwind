import storage from 'redux-persist/lib/storage'
import { PersistConfig } from 'redux-persist'

export const persistConfig = {
    key: 'root',
    storage,
    // Whitelist the slices you want to persist
    whitelist: ['settings', 'organization'],
}

// Type for the root state
export interface RootState {
    settings: {
        notifications: {
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
        theme: string
        language: string
    }
    organization: {
        name: string
        type: string
        founded: string
        employees: number
        location: string
        website: string
        email: string
        phone: string
        teamMembers: Array<{
            id: number
            name: string
            role: string
            email: string
            status: string
        }>
        departments: Array<{
            name: string
            members: number
            color: string
        }>
    }
}
