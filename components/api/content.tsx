import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Key, Zap, Plus, Copy, Trash2, Eye, EyeOff } from "lucide-react"

const apiKeys = [
    { id: 1, name: "Production API Key", key: "pk_live_*****************************1234", created: "2024-01-15", lastUsed: "2 mins ago", status: "active" },
    { id: 2, name: "Development API Key", key: "pk_test_*****************************5678", created: "2024-01-20", lastUsed: "1 hour ago", status: "active" },
    { id: 3, name: "CI/CD Pipeline", key: "pk_live_*****************************9012", created: "2024-02-01", lastUsed: "3 days ago", status: "active" },
]

const webhooks = [
    { id: 1, name: "Order Created", url: "https://api.example.com/webhooks/orders", events: ["order.created"], status: "active", lastTriggered: "10 mins ago" },
    { id: 2, name: "User Registered", url: "https://api.example.com/webhooks/users", events: ["user.created"], status: "active", lastTriggered: "1 hour ago" },
    { id: 3, name: "Payment Failed", url: "https://api.example.com/webhooks/payments", events: ["payment.failed"], status: "inactive", lastTriggered: "2 days ago" },
]

export function ApiContent() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                        <Code className="h-4 w-4" />
                        Developer Tools
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">API</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Manage API keys and webhooks for external integrations.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Create API Key
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">API Keys</CardTitle>
                        <Key className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{apiKeys.length}</div>
                        <p className="mt-1 text-xs text-gray-500">Active keys</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Webhooks</CardTitle>
                        <Zap className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{webhooks.length}</div>
                        <p className="mt-1 text-xs text-gray-500">Configured</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">API Requests</CardTitle>
                        <Code className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">45.2K</div>
                        <p className="mt-1 text-xs text-gray-500">This month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                        <Zap className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">99.9%</div>
                        <p className="mt-1 text-xs text-gray-500">Uptime</p>
                    </CardContent>
                </Card>
            </div>

            {/* API Keys & Webhooks */}
            <Card>
                <CardContent className="pt-4">
                    <Tabs defaultValue="keys" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 sm:w-auto">
                            <TabsTrigger value="keys">API Keys</TabsTrigger>
                            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
                        </TabsList>

                        <TabsContent value="keys" className="pt-4">
                            <div className="w-full overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>API Key</TableHead>
                                            <TableHead>Created</TableHead>
                                            <TableHead>Last Used</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {apiKeys.map((apiKey) => (
                                            <TableRow key={apiKey.id}>
                                                <TableCell className="font-medium">{apiKey.name}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <code className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
                                                            {apiKey.key}
                                                        </code>
                                                        <Button variant="ghost" size="icon" className="h-6 w-6">
                                                            <Copy className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm text-gray-600">{apiKey.created}</TableCell>
                                                <TableCell className="text-sm text-gray-600">{apiKey.lastUsed}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="border-green-500 text-green-700">
                                                        {apiKey.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        <TabsContent value="webhooks" className="pt-4">
                            <div className="w-full overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>URL</TableHead>
                                            <TableHead>Events</TableHead>
                                            <TableHead>Last Triggered</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {webhooks.map((webhook) => (
                                            <TableRow key={webhook.id}>
                                                <TableCell className="font-medium">{webhook.name}</TableCell>
                                                <TableCell>
                                                    <code className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
                                                        {webhook.url}
                                                    </code>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap gap-1">
                                                        {webhook.events.map((event) => (
                                                            <Badge key={event} variant="secondary" className="text-xs">
                                                                {event}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm text-gray-600">{webhook.lastTriggered}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={webhook.status === "active" ? "border-green-500 text-green-700" : "border-gray-500 text-gray-700"}
                                                    >
                                                        {webhook.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {/* Documentation Link */}
            <Card>
                <CardContent className="flex items-center justify-between p-4">
                    <div>
                        <h3 className="font-semibold">API Documentation</h3>
                        <p className="text-sm text-gray-600">Learn how to integrate with our API</p>
                    </div>
                    <Button variant="outline">View Docs</Button>
                </CardContent>
            </Card>
        </div>
    )
}
