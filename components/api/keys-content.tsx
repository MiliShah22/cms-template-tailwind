import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Key, Plus, Copy, Trash2, Eye, EyeOff, Clock, Activity } from "lucide-react"

const apiKeysData = [
    { id: 1, name: "Production API", key: "pk_live_xxxxx...xxxxx", created: "2024-01-15", lastUsed: "2024-02-15", status: "active", requests: 15420 },
    { id: 2, name: "Development API", key: "pk_test_xxxxx...xxxxx", created: "2024-01-20", lastUsed: "2024-02-14", status: "active", requests: 8920 },
    { id: 3, name: "Mobile App", key: "pk_live_xxxxx...xxxxx", created: "2024-02-01", lastUsed: "2024-02-15", status: "active", requests: 4250 },
    { id: 4, name: "Staging Environment", key: "pk_test_xxxxx...xxxxx", created: "2024-01-25", lastUsed: "2024-02-10", status: "inactive", requests: 1200 },
    { id: 5, name: "Legacy System", key: "pk_live_xxxxx...xxxxx", created: "2023-12-01", lastUsed: "2024-01-15", status: "expired", requests: 25000 },
]

export function ApiKeysContent() {
    const activeKeys = apiKeysData.filter(k => k.status === "active").length
    const totalRequests = apiKeysData.reduce((acc, k) => acc + k.requests, 0)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                        <Key className="h-4 w-4" />
                        API
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">API Keys</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Manage your API keys and access tokens.
                    </p>
                </div>
                <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Key
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Keys</CardTitle>
                        <Key className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{apiKeysData.length}</div>
                        <p className="mt-1 text-xs text-gray-500">API keys</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Keys</CardTitle>
                        <Key className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{activeKeys}</div>
                        <p className="mt-1 text-xs text-gray-500">In use</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                        <Activity className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{totalRequests.toLocaleString()}</div>
                        <p className="mt-1 text-xs text-gray-500">This month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rate Limit</CardTitle>
                        <Clock className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">78%</div>
                        <p className="mt-1 text-xs text-gray-500">Of 10000/hr</p>
                    </CardContent>
                </Card>
            </div>

            {/* API Keys Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">API Keys</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Key</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead>Last Used</TableHead>
                                    <TableHead className="text-center">Requests</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {apiKeysData.map((apiKey) => (
                                    <TableRow key={apiKey.id}>
                                        <TableCell className="font-medium">{apiKey.name}</TableCell>
                                        <TableCell>
                                            <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                                {apiKey.key}
                                            </code>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600">{apiKey.created}</TableCell>
                                        <TableCell className="text-sm text-gray-600">{apiKey.lastUsed}</TableCell>
                                        <TableCell className="text-center">{apiKey.requests.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={apiKey.status === "active" ? "default" : "secondary"}
                                                className={apiKey.status === "active" ? "bg-green-500" :
                                                    apiKey.status === "inactive" ? "bg-gray-500" : "bg-red-500"}>
                                                {apiKey.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
