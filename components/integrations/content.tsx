import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Layers, Globe, Puzzle, Zap, Plus, Settings } from "lucide-react"

const integrations = [
    { id: 1, name: "Stripe", description: "Payment processing", icon: "💳", status: "connected", category: "payments" },
    { id: 2, name: "Mailchimp", description: "Email marketing", icon: "📧", status: "connected", category: "marketing" },
    { id: 3, name: "Google Analytics", description: "Website analytics", icon: "📊", status: "connected", category: "analytics" },
    { id: 4, name: "Slack", description: "Team communication", icon: "💬", status: "connected", category: "communication" },
    { id: 5, name: "Zapier", description: "Workflow automation", icon: "⚡", status: "connected", category: "automation" },
    { id: 6, name: "Dropbox", description: "Cloud storage", icon: "☁️", status: "available", category: "storage" },
    { id: 7, name: "Twilio", description: "SMS notifications", icon: "📱", status: "available", category: "communication" },
    { id: 8, name: "Hotjar", description: "User behavior analytics", icon: "🔍", status: "available", category: "analytics" },
]

export function IntegrationsContent() {
    const connectedCount = integrations.filter(i => i.status === "connected").length

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                        <Layers className="h-4 w-4" />
                        Integrations
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Integrations</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Connect with third-party services and extend functionality.
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total</CardTitle>
                        <Layers className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{integrations.length}</div>
                        <p className="mt-1 text-xs text-gray-500">Available</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Connected</CardTitle>
                        <Puzzle className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{connectedCount}</div>
                        <p className="mt-1 text-xs text-gray-500">Active integrations</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Available</CardTitle>
                        <Globe className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{integrations.length - connectedCount}</div>
                        <p className="mt-1 text-xs text-gray-500">Ready to connect</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">API Usage</CardTitle>
                        <Zap className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">78%</div>
                        <p className="mt-1 text-xs text-gray-500">Of limit</p>
                    </CardContent>
                </Card>
            </div>

            {/* Connected Integrations */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Connected Integrations</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {integrations.filter(i => i.status === "connected").map((integration) => (
                            <div key={integration.id} className="flex items-center justify-between rounded-lg border p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-2xl dark:bg-gray-800">
                                        {integration.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{integration.name}</h3>
                                        <p className="text-xs text-gray-500">{integration.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="border-green-500 text-green-700">
                                        Connected
                                    </Badge>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Settings className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Available Integrations */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Available Integrations</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {integrations.filter(i => i.status === "available").map((integration) => (
                            <div key={integration.id} className="flex flex-col items-center justify-center rounded-lg border p-6 text-center hover:shadow-md transition-shadow">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl dark:bg-gray-800 mb-4">
                                    {integration.icon}
                                </div>
                                <h3 className="font-semibold mb-1">{integration.name}</h3>
                                <p className="text-xs text-gray-500 mb-4">{integration.description}</p>
                                <Button size="sm" className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    Connect
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
