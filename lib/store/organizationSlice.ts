import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define the organization state interface
export interface TeamMember {
    id: number
    name: string
    role: string
    email: string
    status: string
}

export interface Department {
    name: string
    members: number
    color: string
}

export interface OrganizationState {
    name: string
    type: string
    founded: string
    employees: number
    location: string
    website: string
    email: string
    phone: string
    teamMembers: TeamMember[]
    departments: Department[]
}

// Define initial state
const initialState: OrganizationState = {
    name: "CMSFullForm Inc.",
    type: "Enterprise",
    founded: "2020",
    employees: 45,
    location: "San Francisco, CA",
    website: "cmsfullform.com",
    email: "contact@cmsfullform.com",
    phone: "+1 (555) 123-4567",
    teamMembers: [
        { id: 1, name: "John Smith", role: "CEO", email: "john@cmsfullform.com", status: "active" },
        { id: 2, name: "Sarah Johnson", role: "CTO", email: "sarah@cmsfullform.com", status: "active" },
        { id: 3, name: "Mike Davis", role: "Lead Developer", email: "mike@cmsfullform.com", status: "active" },
        { id: 4, name: "Emily Brown", role: "Product Manager", email: "emily@cmsfullform.com", status: "active" },
        { id: 5, name: "David Wilson", role: "Designer", email: "david@cmsfullform.com", status: "away" },
    ],
    departments: [
        { name: "Engineering", members: 15, color: "bg-blue-500" },
        { name: "Product", members: 8, color: "bg-purple-500" },
        { name: "Design", members: 6, color: "bg-pink-500" },
        { name: "Marketing", members: 10, color: "bg-green-500" },
        { name: "Support", members: 6, color: "bg-orange-500" },
    ]
}

// Create the organization slice
const organizationSlice = createSlice({
    name: 'organization',
    initialState,
    reducers: {
        // Update organization details
        updateOrganization: (state, action: PayloadAction<Partial<OrganizationState>>) => {
            return { ...state, ...action.payload }
        },

        // Add a team member
        addTeamMember: (state, action: PayloadAction<TeamMember>) => {
            state.teamMembers.push(action.payload)
        },

        // Remove a team member
        removeTeamMember: (state, action: PayloadAction<number>) => {
            state.teamMembers = state.teamMembers.filter(member => member.id !== action.payload)
        },

        // Update a team member
        updateTeamMember: (state, action: PayloadAction<{ id: number; updates: Partial<TeamMember> }>) => {
            const index = state.teamMembers.findIndex(member => member.id === action.payload.id)
            if (index !== -1) {
                state.teamMembers[index] = { ...state.teamMembers[index], ...action.payload.updates }
            }
        },

        // Reset organization to default
        resetOrganization: () => initialState,
    },
})

// Export actions
export const {
    updateOrganization,
    addTeamMember,
    removeTeamMember,
    updateTeamMember,
    resetOrganization,
} = organizationSlice.actions

// Export reducer
export default organizationSlice.reducer
