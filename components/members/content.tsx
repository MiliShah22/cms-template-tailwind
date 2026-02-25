import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Search, Plus, Shield, Eye, Edit, Mail, MoreHorizontal } from "lucide-react"

const members = [
  { id: 1, name: "John Smith", email: "john@cmsfullform.com", role: "Administrator", status: "active", lastActive: "2 mins ago", avatar: "JS" },
  { id: 2, name: "Sarah Johnson", email: "sarah@cmsfullform.com", role: "Editor", status: "active", lastActive: "1 hour ago", avatar: "SJ" },
  { id: 3, name: "Mike Davis", email: "mike@cmsfullform.com", role: "Editor", status: "active", lastActive: "3 hours ago", avatar: "MD" },
  { id: 4, name: "Emily Brown", email: "emily@cmsfullform.com", role: "Viewer", status: "away", lastActive: "1 day ago", avatar: "EB" },
  { id: 5, name: "David Wilson", email: "david@cmsfullform.com", role: "Editor", status: "offline", lastActive: "3 days ago", avatar: "DW" },
  { id: 6, name: "Lisa Chen", email: "lisa@cmsfullform.com", role: "Viewer", status: "active", lastActive: "30 mins ago", avatar: "LC" },
]

const roles = [
  { id: 1, name: "Administrator", description: "Full access to all features", members: 1, color: "bg-red-500" },
  { id: 2, name: "Editor", description: "Can create and edit content", members: 3, color: "bg-blue-500" },
  { id: 3, name: "Viewer", description: "Read-only access", members: 2, color: "bg-green-500" },
]

export function MembersContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
            <Users className="h-4 w-4" />
            Team Management
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Members</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage team members, roles and permissions.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Invite Member
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{members.length}</div>
            <p className="mt-1 text-xs text-gray-500">Team members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <Shield className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">1</div>
            <p className="mt-1 text-xs text-gray-500">Full access</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Editors</CardTitle>
            <Edit className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">3</div>
            <p className="mt-1 text-xs text-gray-500">Can edit content</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Viewers</CardTitle>
            <Eye className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">2</div>
            <p className="mt-1 text-xs text-gray-500">Read-only access</p>
          </CardContent>
        </Card>
      </div>

      {/* Members Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-md border bg-background px-2 py-1 text-xs text-gray-500">
              <Search className="h-3 w-3" />
              Search
            </div>
            <Input placeholder="Search members..." className="h-9 max-w-sm bg-transparent text-sm" />
          </div>

          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback>{member.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          member.role === "Administrator"
                            ? "border-red-500 text-red-700"
                            : member.role === "Editor"
                              ? "border-blue-500 text-blue-700"
                              : "border-green-500 text-green-700"
                        }
                      >
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          member.status === "active"
                            ? "border-green-500 text-green-700"
                            : member.status === "away"
                              ? "border-yellow-500 text-yellow-700"
                              : "border-gray-500 text-gray-700"
                        }
                      >
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">{member.lastActive}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Roles Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Roles & Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {roles.map((role) => (
              <div key={role.id} className="rounded-lg border p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`h-3 w-3 rounded-full ${role.color}`} />
                  <h3 className="font-semibold">{role.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                <p className="text-xs text-gray-500">{role.members} member{role.members > 1 ? "s" : ""}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
