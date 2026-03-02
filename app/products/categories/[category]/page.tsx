import type { Metadata } from "next"
import { ProductsContent } from "@/components/products/content"

interface Params {
    category: string
}

export function generateMetadata({ params }: { params: Params }): Metadata {
    const display = getDisplayName(params.category.toLowerCase())
    return {
        title: `${display} products - CMSFullForm Dashboard`,
        description: `Listing of products in the ${display} category`,
    }
}

import { getCategorySlugs, getDisplayName } from "@/lib/products"

export function generateStaticParams() {
    return getCategorySlugs().map((c) => ({ category: c }))
}

export default function CategoryPage({ params }: { params: Params }) {
    const slug = params.category.toLowerCase()

    // optional custom messaging per category
    const extraMessage =
        slug === "electronics"
            ? "All the latest gadgets and devices."
            : slug === "clothing"
                ? "Browse apparel and fashion items."
                : slug === "books"
                    ? "Find books across genres."
                    : undefined

    return (
        <div className="space-y-6">
            {extraMessage && (
                <p className="text-sm text-gray-600">{extraMessage}</p>
            )}

            {/* pass slug so ProductsContent can capitalise it and filter */}
            <ProductsContent filterCategory={slug} hideTabs />
        </div>
    )
}
