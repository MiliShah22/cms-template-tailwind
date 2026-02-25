import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Database, Download, Upload, Clock, Plus, RefreshCw, Check, X } from "lucide-react"

const backups = [
    { id: 1, name: "Full Backup - Feb 15", date: "2024-02-15", time: "2:00 AM", size: "4.2 GB", type: "full", status: "completed" },
    { id: 2, name: "Incremental Backup - Feb 14", date: "2024-02-14", time: "2:00 AM", size: "125 MB", type: "incremental", status: "completed" },
    { id: 3, name: "Incremental Backup - Feb 13", date: "2024-02-13", time: "2:00 AM", size: "98 MB", type: "incremental", status: "completed" },
    { id: 4, name: "Full Backup - Feb 10", date: "2024-02-10", time: "2:00 AM", size: "4.1 GB", type: "full", status: "completed" },
    { id: 5, name: "Database Backup - Feb 15", date: "2024-02-15", time: "6:00 AM", size: "45 MB", type: "database", status: "completed" },
]

const schedules = [
    { id: 1, name: "Daily Full Backup", frequency: "Daily", time: "2:00 AM", retention: "7 days", status: "active" },
    { id: 2, name: "Hourly Incremental", frequency: "Hourly", time: "Every hour", retention: "24 hours", status: "active" },
    { id: 3, name: "Weekly Database", frequency: "Weekly", time: "Sunday 6:00 AM", retention: "30 days", status: "active" },
]

export function BackupContent() {
    const totalBackups = backups.length
    const totalSize = backups.reduce((acc, b) => {
        const sizeNum = parseFloat(b.size)
        return acc + (b.size.includes("GB") ? sizeNum * 1024 : sizeNum)
    }, 0)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                        <Database className="h-4 w-4" />
                        System
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Backup & Restore</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Manage backups, restore points and disaster recovery.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <RefreshCw className="h-4 w-4" />
                        Sync Now
                    </Button>
                    <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Create Backup
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Backups</CardTitle>
                        <Database className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{totalBackups}</div>
                        <p className="mt-1 text-xs text-gray-500">Available</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                        <Download className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{(totalSize / 1024).toFixed(1)} GB</div>
                        <p className="mt-1 text-xs text-gray-500">Of 50 GB</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Last Backup</CardTitle>
                        <Clock className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">2h ago</div>
                        <p className="mt-1 text-xs text-gray-500">Full backup</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Next Scheduled</CardTitle>
                        <Clock className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">10h</div>
                        <p className="mt-1 text-xs text-gray-500">Incremental</p>
                    </CardContent>
                </Card>
            </div>

            {/* Backup History */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Backup History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Size</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {backups.map((backup) => (
                                    <TableRow key={backup.id}>
                                        <TableCell className="font-medium">{backup.name}</TableCell>
                                        <TableCell className="text-sm text-gray-600">{backup.date}</TableCell>
                                        <TableCell className="text-sm text-gray-600">{backup.time}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">{backup.type}</Badge>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600">{backup.size}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="border-green-500 text-green-700">
                                                <Check className="h-3 w-3 mr-1" />
                                                {backup.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Upload className="h-4 w-4" />
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

            {/* Scheduled Backups */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Scheduled Backups</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {schedules.map((schedule) => (
                            <div key={schedule.id} className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <h3 className="font-semibold">{schedule.name}</h3>
                                    <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                                        <span>{schedule.frequency}</span>
                                        <span>{schedule.time}</span>
                                        <span>Retention: {schedule.retention}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="border-green-500 text-green-700">
                                        <Check className="h-3 w-3 mr-1" />
                                        {schedule.status}
                                    </Badge>
                                    <Button variant="outline" size="sm">Edit</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
