import type { Metadata } from "next"
import CategoriesList from "@/components/products/categories-list"

export const metadata: Metadata = {
    title: "Product Categories - CMSFullForm Dashboard",
    description: "Browse available product categories.",
}

export default function CategoriesPage() {
    return <CategoriesList />
}
