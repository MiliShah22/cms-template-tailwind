"use client"

import Image from "next/image"
import { TrendingUp, TrendingDown } from "lucide-react"

interface Product {
  id: string
  name: string
  category: string
  sales: number
  mrr: string
  change: number
  image: string
}

// Align with products in `components/products/content.tsx`
const products: Product[] = [
  {
    id: "PRD-1024",
    name: "CMS Starter Plan",
    category: "Subscription",
    sales: 624,
    mrr: "$11,856",
    change: 12.5,
    image: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "PRD-1008",
    name: "CMS Pro Plan",
    category: "Subscription",
    sales: 341,
    mrr: "$16,709",
    change: 8.2,
    image: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "PRD-0992",
    name: "SEO Toolkit Addon",
    category: "Addon",
    sales: 487,
    mrr: "$4,383",
    change: 23.1,
    image: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "PRD-0975",
    name: "Analytics Upgrade",
    category: "Addon",
    sales: 128,
    mrr: "$1,920",
    change: 4.7,
    image: "/placeholder.svg?height=48&width=48",
  },
  {
    id: "PRD-0960",
    name: "Priority Support",
    category: "Addon",
    sales: 92,
    mrr: "$2,208",
    change: -1.9,
    image: "/placeholder.svg?height=48&width=48",
  },
]

export default function TopProducts() {
  return (
    <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Products</h3>
        <select className="text-sm border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          <option>This month</option>
          <option>Last month</option>
          <option>Last 3 months</option>
        </select>
      </div>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-gray-600 dark:text-gray-400">
                {index + 1}
              </div>
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={48}
                height={48}
                className="rounded-lg object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{product.mrr}</p>
              <div className="flex items-center justify-end space-x-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">{product.sales} active</span>
                <div className="flex items-center">
                  {product.change > 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  <span className={`text-xs ml-1 ${product.change > 0 ? "text-green-600" : "text-red-600"}`}>
                    {product.change > 0 ? "+" : ""}
                    {product.change}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
