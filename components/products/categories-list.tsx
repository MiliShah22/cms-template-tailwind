import Link from "next/link"
import { getCategorySlugs, getDisplayName } from "@/lib/products"

// derive from JSON data so it's always up to date
const categorySlugs = getCategorySlugs()

export default function CategoriesList() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Product categories</h1>
            <p className="text-sm text-gray-600">
                Select a category to filter the product catalog.
            </p>

            <ul className="mt-4 space-y-2">
                {categorySlugs.map((slug) => (
                    <li key={slug}>
                        <Link
                            href={`/products/categories/${slug}`}
                            className="text-indigo-600 hover:underline capitalize"
                        >
                            {displayName(slug)}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
