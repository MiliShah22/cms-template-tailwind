import raw from "../data/products.json"

export interface Product {
    id: string
    name: string
    sku: string
    category: string
    price: string | number
    stock: number
    status: string
    trend: string
    tags?: string[]
    description?: string
    comparePrice?: number
    sales?: number
    revenue?: number
    rating?: number
    reviews?: number
    createdAt?: string
    updatedAt?: string
    variants?: any[]
    salesHistory?: any[]
    activities?: any[]
}

// raw comes in as any[] when importing JSON
const products = raw as Product[]

export function getProducts(): Product[] {
    return products
}

export function getCategorySlugs(): string[] {
    const slugs = products.map((p) => p.category.toLowerCase())
    return Array.from(new Set(slugs))
}

export function getDisplayName(slug: string): string {
    return slug.charAt(0).toUpperCase() + slug.slice(1)
}
