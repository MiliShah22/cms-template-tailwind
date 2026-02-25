import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building2, Users, Globe, Settings, Plus, Mail, Phone, MapPin } from "lucide-react"

const organization = {
    name: "CMSFullForm Inc.",
    type: "Enterprise",
    founded: "2020",
    employees: 45,
    location: "San Francisco, CA",
    website: "cmsfullform.com",
    email: "contact@cmsfullform.com",
    phone: "+1 (555) 123-4567",
}

const teamMembers = [
    { id: 1, name: "John Smith", role: "CEO", email: "john@cmsfullform.com", status: "active" },
    { id: 2, name: "Sarah Johnson", role: "CTO", email: "sarah@cmsfullform.com", status: "active" },
    { id: 3, name: "Mike Davis", role: "Lead Developer", email: "mike@cmsfullform.com", status: "active" },
    { id: 4, name: "Emily Brown", role: "Product Manager", email: "emily@cmsfullform.com", status: "active" },
    { id: 5, name: "David Wilson", role: "Designer", email: "david@cmsfullform.com", status: "away" },
]

const departments = [
    { name: "Engineering", members: 15, color: "bg-blue-500" },
    { name: "Product", members: 8, color: "bg-purple-500" },
    { name: "Design", members: 6, color: "bg-pink-500" },
    { name: "Marketing", members: 10, color: "bg-green-500" },
    { name: "Support", members: 6, color: "bg-orange-500" },
]

export function OrganizationContent() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                        <Building2 className="h-4 w-4" />
                        Organization
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{organization.name}</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Manage your organization settings, team members and departments.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Settings className="h-4 w-4" />
                        Settings
                    </Button>
                    <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Invite Member
                    </Button>
                </div>
            </div>

            {/* Organization Info */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Organization Type</CardTitle>
                        <Building2 className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{organization.type}</div>
                        <p className="mt-1 text-xs text-gray-500">Since {organization.founded}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                        <Users className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{organization.employees}</div>
                        <p className="mt-1 text-xs text-gray-500">Active team members</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Location</CardTitle>
                        <MapPin className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{organization.location}</div>
                        <p className="mt-1 text-xs text-gray-500">Primary office</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Website</CardTitle>
                        <Globe className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{organization.website}</div>
                        <p className="mt-1 text-xs text-gray-500">Official website</p>
                    </CardContent>
                </Card>
            </div>

            {/* Departments & Team */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Departments */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Departments</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {departments.map((dept) => (
                            <div key={dept.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`h-3 w-3 rounded-full ${dept.color}`} />
                                    <span className="text-sm font-medium">{dept.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-24 rounded-full bg-gray-200 dark:bg-gray-700">
                                        <div
                                            className={`h-2 rounded-full ${dept.color}`}
                                            style={{ width: `${(dept.members / 15) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-500">{dept.members}</span>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Contact Info */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{organization.email}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{organization.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Globe className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{organization.website}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{organization.location}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Team Members */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Name</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Role</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Email</th>
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teamMembers.map((member) => (
                                    <tr key={member.id} className="border-b border-gray-100 dark:border-gray-800">
                                        <td className="py-3 px-4 text-sm font-medium">{member.name}</td>
                                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{member.role}</td>
                                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{member.email}</td>
                                        <td className="py-3 px-4">
                                            <Badge
                                                variant="outline"
                                                className={
                                                    member.status === "active"
                                                        ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20"
                                                        : "border-yellow-500 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20"
                                                }
                                            >
                                                {member.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
