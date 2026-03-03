"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Package, Tag, Filter, Plus, TrendingUp, Eye } from "lucide-react"
import Link from "next/link"

import { getCategorySlugs, getDisplayName, Product } from "@/lib/products"
import { useAppSelector } from "@/lib/store/hooks"

// pull from redux store instead of static JSON
// selector will return the currentable array
const selectProducts = (state: any) => state.products.items

interface ProductsContentProps {
  filterCategory?: string
  hideTabs?: boolean
}

import { ProductForm } from "./product-form"

export function ProductsContent({
  filterCategory,
  hideTabs = false,
}: ProductsContentProps) {
  const products: Product[] = useAppSelector(selectProducts)
  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | undefined>()
  const [prefillCategory, setPrefillCategory] = useState<string | undefined>()

  const openNew = (category?: string) => {
    // open form for creating a new product; we use prefillCategory
    setEditProduct(undefined)
    setPrefillCategory(category)
    setShowForm(true)
  }
  const openEdit = (p: Product) => {
    setEditProduct(p)
    setPrefillCategory(undefined)
    setShowForm(true)
  }
  const closeForm = () => setShowForm(false)

  // if a filter category was provided it may come from a slug (lowercase)
  // convert to display form so the table filtering works with our mock data
  const displayCategory = filterCategory
    ?
    // simple capitalise first letter for basic slugs
    filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)
    : undefined

  // compute stats from the redux product list
  const allProducts = products
  const activeCount = allProducts.filter((p) => p.status === "active").length
  const lowStockCount = allProducts.filter((p) => p.stock < 100).length
  // placeholder trend: calculate % of active increasing vs decreasing?
  const revenueTrend = "+14.3%" // could be derived from real data

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
            <Package className="h-4 w-4" />
            Catalog
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
            {displayCategory ? `${displayCategory} products` : "Products"}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {displayCategory
              ? `Showing all items in the ${displayCategory} category.`
              : "Manage your product catalog, pricing and availability across channels."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Advanced filters
          </Button>
          <Button size="sm" className="gap-2" onClick={() => openNew(displayCategory)}>
            <Plus className="h-4 w-4" />
            New product
          </Button>
        </div>
      </div>

      {/* optionally show form */}
      {showForm && (
        <Card>
          <CardContent>
            <ProductForm initial={editProduct} prefillCategory={prefillCategory} onClose={closeForm} />
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{activeCount}</div>
            <p className="mt-1 text-xs text-gray-500">Visible in the storefront</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{lowStockCount}</div>
            <p className="mt-1 text-xs text-gray-500">Below safety threshold</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-sm font-medium">Revenue trend</CardTitle>
              <TrendingUp className="h-3 w-3 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{revenueTrend}</div>
            <p className="mt-1 text-xs text-gray-500">Last 30 days vs previous</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters & tabs */}
      <Card>
        <CardContent className="space-y-4 pt-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2 rounded-md border bg-background px-2 py-1 text-xs text-gray-500">
                <Search className="h-3 w-3" />
                Search
              </div>
              <Input
                placeholder="Search by name, SKU or ID..."
                className="h-9 max-w-sm bg-transparent text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="h-9 w-[140px] text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="h-9 w-[140px] text-xs">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {getCategorySlugs().map((slug) => (
                    <SelectItem key={slug} value={slug}>
                      {getDisplayName(slug)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {!hideTabs && (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 sm:w-auto">
                <TabsTrigger value="all">All products</TabsTrigger>
                {getCategorySlugs().map((slug) => (
                  <TabsTrigger key={slug} value={slug}>
                    {getDisplayName(slug)}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="all" className="pt-4">
                <ProductsTable onEdit={openEdit} />
              </TabsContent>
              {getCategorySlugs().map((slug) => (
                <TabsContent key={slug} value={slug} className="pt-4">
                  <ProductsTable filterCategory={getDisplayName(slug)} onEdit={openEdit} />
                </TabsContent>
              ))}
            </Tabs>
          )}
          {hideTabs && (
            <div className="pt-4">
              <ProductsTable filterCategory={displayCategory} onEdit={openEdit} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

interface ProductsTableProps {
  filterCategory?: string
  onEdit?: (product: Product) => void
}

export function ProductsTable({ filterCategory, onEdit }: ProductsTableProps) {
  const products: Product[] = useAppSelector(selectProducts)
  const rows = filterCategory
    ? products.filter((p) => p.category === filterCategory)
    : products

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[140px]">Product</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="hidden sm:table-cell text-right">Stock</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="hidden sm:table-cell text-right">Trend</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <span>{product.name}</span>
                  {product.status === "active" && (
                    <Badge variant="outline" className="text-[10px] uppercase">
                      Active
                    </Badge>
                  )}
                  {product.status === "draft" && (
                    <Badge variant="secondary" className="text-[10px] uppercase">
                      Draft
                    </Badge>
                  )}
                </div>
                <div className="mt-0.5 text-[11px] text-gray-500">{product.id}</div>
              </TableCell>
              <TableCell className="text-sm text-gray-600">{product.sku}</TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-200">
                  <Tag className="h-3 w-3 text-gray-400" />
                  {product.category}
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell text-right text-sm text-gray-600">
                {product.stock}
              </TableCell>
              <TableCell className="text-right font-medium">{product.price}</TableCell>
              <TableCell className="hidden sm:table-cell text-right text-xs text-emerald-600">
                {product.trend}
              </TableCell>
              <TableCell className="text-right">
                {onEdit && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEdit(product)}
                  >
                    Edit
                  </Button>
                )}

                <Link href={`/products/${product.id}`}>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


