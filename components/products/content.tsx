import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Package, Tag, Filter, Plus, TrendingUp } from "lucide-react"

const products = [
  {
    id: "PRD-1024",
    name: "CMS Starter Plan",
    sku: "CMS-ST-01",
    category: "Subscriptions",
    price: "$19.00",
    stock: 243,
    status: "active",
    trend: "+12%",
  },
  {
    id: "PRD-1008",
    name: "CMS Pro Plan",
    sku: "CMS-PR-01",
    category: "Subscriptions",
    price: "$49.00",
    stock: 88,
    status: "active",
    trend: "+7%",
  },
  {
    id: "PRD-0992",
    name: "SEO Toolkit Addon",
    sku: "ADD-SEO-01",
    category: "Addons",
    price: "$9.00",
    stock: 510,
    status: "active",
    trend: "+23%",
  },
  {
    id: "PRD-0975",
    name: "Analytics Upgrade",
    sku: "ADD-ANALYTICS",
    category: "Addons",
    price: "$15.00",
    stock: 132,
    status: "draft",
    trend: "-",
  },
]

export function ProductsContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
            <Package className="h-4 w-4" />
            Catalog
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage your product catalog, pricing and availability across channels.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Advanced filters
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            New product
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">32</div>
            <p className="mt-1 text-xs text-gray-500">Visible in the storefront</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">5</div>
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
            <div className="text-2xl font-semibold">+14.3%</div>
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
                  <SelectItem value="subscriptions">Subscriptions</SelectItem>
                  <SelectItem value="addons">Addons</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:w-auto">
              <TabsTrigger value="all">All products</TabsTrigger>
              <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
              <TabsTrigger value="addons">Addons</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="pt-4">
              <ProductsTable />
            </TabsContent>
            <TabsContent value="subscriptions" className="pt-4">
              <ProductsTable filterCategory="Subscriptions" />
            </TabsContent>
            <TabsContent value="addons" className="pt-4">
              <ProductsTable filterCategory="Addons" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

interface ProductsTableProps {
  filterCategory?: string
}

function ProductsTable({ filterCategory }: ProductsTableProps) {
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


