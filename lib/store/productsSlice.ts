import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product, getProducts } from '../products'

// initial state loaded from JSON so that existing UI still works
interface ProductsState {
    items: Product[]
}

const initialState: ProductsState = {
    items: getProducts(),
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct(state, action: PayloadAction<Product>) {
            state.items.push(action.payload)
        },
        updateProduct(state, action: PayloadAction<Product>) {
            const idx = state.items.findIndex((p) => p.id === action.payload.id)
            if (idx !== -1) {
                state.items[idx] = action.payload
            }
        },
        removeProduct(state, action: PayloadAction<string>) {
            state.items = state.items.filter((p) => p.id !== action.payload)
        },
    },
})

export const { addProduct, updateProduct, removeProduct } = productsSlice.actions
export default productsSlice.reducer
