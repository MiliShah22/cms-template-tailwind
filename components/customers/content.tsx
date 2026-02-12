import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Users2, Filter, UserPlus, Mail, Star } from "lucide-react"

const customers = [
  {
    id: "CUS-2041",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    segment: "VIP",
    orders: 42,
    spent: "$4,920",
    status: "active",
  },
  {
    id: "CUS-1988",
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    segment: "New",
    orders: 3,
    spent: "$210",
    status: "active",
  },
  {
    id: "CUS-1905",
    name: "Kristin Watson",
    email: "kristin.watson@example.com",
    segment: "Inactive",
    orders: 12,
    spent: "$980",
    status: "inactive",
  },
  {
    id: "CUS-1850",
    name: "Devon Lane",
    email: "devon.lane@example.com",
    segment: "VIP",
    orders: 31,
    spent: "$3,430",
    status: "active",
  },
]

export function CustomersContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
            <Users2 className="h-4 w-4" />
            CRM
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            View, segment and manage customers interacting with your CMS.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Segments
          </Button>
          <Button size="sm" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add customer
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-sm font-medium">Total customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">1,284</div>
            <p className="mt-1 text-xs text-gray-500">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-sm font-medium">Active this month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">342</div>
            <p className="mt-1 text-xs text-gray-500">Logged in or placed an order</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-sm font-medium">VIP customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">27</div>
            <p className="mt-1 text-xs text-gray-500">High LTV & engagement</p>
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
                placeholder="Search by name, email or ID..."
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
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="h-9 w-[160px] text-xs">
                  <SelectValue placeholder="Segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All segments</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 sm:w-auto">
              <TabsTrigger value="all">All customers</TabsTrigger>
              <TabsTrigger value="vip">VIP</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="pt-4">
              <CustomersTable />
            </TabsContent>
            <TabsContent value="vip" className="pt-4">
              <CustomersTable filterSegment="VIP" />
            </TabsContent>
            <TabsContent value="inactive" className="pt-4">
              <CustomersTable filterSegment="Inactive" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

interface CustomersTableProps {
  filterSegment?: string
}

function CustomersTable({ filterSegment }: CustomersTableProps) {
  const rows = filterSegment
    ? customers.filter((c) => c.segment === filterSegment)
    : customers

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="hidden md:table-cell">Segment</TableHead>
            <TableHead className="hidden sm:table-cell text-right">Orders</TableHead>
            <TableHead className="text-right">Total spent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span>{customer.name}</span>
                    {customer.segment === "VIP" && (
                      <Badge variant="outline" className="flex items-center gap-1 text-[10px] uppercase">
                        <Star className="h-3 w-3 text-amber-500" />
                        VIP
                      </Badge>
                    )}
                  </div>
                  <span className="mt-0.5 text-[11px] text-gray-500">{customer.id}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3 text-gray-400" />
                  {customer.email}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <span className="text-sm text-gray-700 dark:text-gray-200">{customer.segment}</span>
              </TableCell>
              <TableCell className="hidden sm:table-cell text-right text-sm text-gray-600">
                {customer.orders}
              </TableCell>
              <TableCell className="text-right font-medium">{customer.spent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


