import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Shield, Plus, Edit, Trash2, Check, X } from "lucide-react"

const rolesData = [
    { id: 1, name: "Admin", description: "Full access to all features", members: 3, permissions: 25, color: "red" },
    { id: 2, name: "Editor", description: "Can edit content and manage posts", members: 8, permissions: 15, color: "blue" },
    { id: 3, name: "Author", description: "Can create and edit own content", members: 12, permissions: 10, color: "green" },
    { id: 4, name: "Contributor", description: "Can create content for review", members: 15, permissions: 5, color: "amber" },
    { id: 5, name: "Subscriber", description: "Can only view content", members: 45, permissions: 2, color: "gray" },
]

const permissionsList = [
    { name: "Dashboard Access", admin: true, editor: true, author: true, contributor: false, subscriber: false },
    { name: "Content Management", admin: true, editor: true, author: true, contributor: false, subscriber: false },
    { name: "User Management", admin: true, editor: false, author: false, contributor: false, subscriber: false },
    { name: "Settings", admin: true, editor: false, author: false, contributor: false, subscriber: false },
    { name: "Media Library", admin: true, editor: true, author: true, contributor: true, subscriber: false },
    { name: "Comments", admin: true, editor: true, author: false, contributor: false, subscriber: false },
    { name: "Analytics", admin: true, editor: true, author: false, contributor: false, subscriber: false },
]

export function MembersRolesContent() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                        <Users className="h-4 w-4" />
                        Team
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Roles</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Manage member roles and permissions.
                    </p>
                </div>
                <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Role
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Roles</CardTitle>
                        <Shield className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{rolesData.length}</div>
                        <p className="mt-1 text-xs text-gray-500">Roles defined</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                        <Users className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{rolesData.reduce((acc, r) => acc + r.members, 0)}</div>
                        <p className="mt-1 text-xs text-gray-500">Team members</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Roles</CardTitle>
                        <Shield className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{rolesData.length}</div>
                        <p className="mt-1 text-xs text-gray-500">In use</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Permissions</CardTitle>
                        <Shield className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{permissionsList.length}</div>
                        <p className="mt-1 text-xs text-gray-500">Available</p>
                    </CardContent>
                </Card>
            </div>

            {/* Roles Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Roles</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="text-center">Members</TableHead>
                                    <TableHead className="text-center">Permissions</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rolesData.map((role) => (
                                    <TableRow key={role.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Badge className={`bg-${role.color}-500`}>{role.name}</Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600">{role.description}</TableCell>
                                        <TableCell className="text-center">{role.members}</TableCell>
                                        <TableCell className="text-center">{role.permissions}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <Edit className="h-4 w-4" />
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

            {/* Permissions Matrix */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Permissions Matrix</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Permission</TableHead>
                                    <TableHead className="text-center">Admin</TableHead>
                                    <TableHead className="text-center">Editor</TableHead>
                                    <TableHead className="text-center">Author</TableHead>
                                    <TableHead className="text-center">Contributor</TableHead>
                                    <TableHead className="text-center">Subscriber</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {permissionsList.map((perm, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell className="font-medium">{perm.name}</TableCell>
                                        <TableCell className="text-center">
                                            {perm.admin ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <X className="h-4 w-4 text-red-400 mx-auto" />}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {perm.editor ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <X className="h-4 w-4 text-red-400 mx-auto" />}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {perm.author ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <X className="h-4 w-4 text-red-400 mx-auto" />}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {perm.contributor ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <X className="h-4 w-4 text-red-400 mx-auto" />}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {perm.subscriber ? <Check className="h-4 w-4 text-green-500 mx-auto" /> : <X className="h-4 w-4 text-red-400 mx-auto" />}
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
