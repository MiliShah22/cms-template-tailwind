"use client"

import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { updateOrganization } from "@/lib/store/organizationSlice"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Users, Globe, Settings, Plus, Mail, Phone, MapPin, Save, X } from "lucide-react"
import { toast } from "@/hooks/use-toast"

const roles = [
    "CEO",
    "CTO",
    "Lead Developer",
    "Product Manager",
    "Designer",
    "Developer",
    "Marketing Manager",
    "Sales Representative",
    "Support Specialist",
    "Data Analyst",
]

export function OrganizationContent() {
    const dispatch = useAppDispatch()
    const organization = useAppSelector((state) => state.organization)

    const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
    const [settingsDialogOpen, setSettingsDialogOpen] = useState(false)
    const [inviteForm, setInviteForm] = useState({
        name: "",
        email: "",
        role: "",
    })
    const [settingsForm, setSettingsForm] = useState({
        name: organization.name,
        type: organization.type,
        founded: organization.founded,
        location: organization.location,
        website: organization.website,
        email: organization.email,
        phone: organization.phone,
    })

    const handleInviteSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulated invite submission
        console.log("Inviting member:", inviteForm)
        toast({
            title: "Invitation Sent",
            description: `Invitation sent to ${inviteForm.email} as ${inviteForm.role}`,
            variant: "default",
        })
        setInviteForm({ name: "", email: "", role: "" })
        setInviteDialogOpen(false)
    }

    const handleSettingsSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Update the organization in Redux store
        dispatch(updateOrganization({
            name: settingsForm.name,
            type: settingsForm.type,
            founded: settingsForm.founded,
            location: settingsForm.location,
            website: settingsForm.website,
            email: settingsForm.email,
            phone: settingsForm.phone,
        }))
        console.log("Updating settings:", settingsForm)
        toast({
            title: "Settings Saved",
            description: "Your organization settings have been updated successfully.",
            variant: "default",
        })
        setSettingsDialogOpen(false)
    }

    const handleSettingsDialogOpen = (open: boolean) => {
        setSettingsDialogOpen(open)
        if (open) {
            // Reset settings form to current organization values when opening
            setSettingsForm({
                name: organization.name,
                type: organization.type,
                founded: organization.founded,
                location: organization.location,
                website: organization.website,
                email: organization.email,
                phone: organization.phone,
            })
        }
    }

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
                    <Dialog open={settingsDialogOpen} onOpenChange={handleSettingsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Settings className="h-4 w-4" />
                                Settings
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                                <DialogTitle>Organization Settings</DialogTitle>
                                <DialogDescription>
                                    Update your organization information and preferences.
                                </DialogDescription>
                            </DialogHeader>
                            <Tabs defaultValue="general" className="w-full">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="general">General</TabsTrigger>
                                    <TabsTrigger value="location">Location</TabsTrigger>
                                    <TabsTrigger value="contact">Contact</TabsTrigger>
                                </TabsList>
                                <form onSubmit={handleSettingsSubmit}>
                                    <TabsContent value="general" className="space-y-4">
                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="org-name">Organization Name</Label>
                                                <Input
                                                    id="org-name"
                                                    value={settingsForm.name}
                                                    onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="org-type">Organization Type</Label>
                                                <Select
                                                    value={settingsForm.type}
                                                    onValueChange={(value) => setSettingsForm({ ...settingsForm, type: value })}
                                                >
                                                    <SelectTrigger id="org-type">
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Startup">Startup</SelectItem>
                                                        <SelectItem value="Small Business">Small Business</SelectItem>
                                                        <SelectItem value="Medium">Medium</SelectItem>
                                                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                                                        <SelectItem value="Corporation">Corporation</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="org-founded">Founded Year</Label>
                                                <Input
                                                    id="org-founded"
                                                    type="number"
                                                    value={settingsForm.founded}
                                                    onChange={(e) => setSettingsForm({ ...settingsForm, founded: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="location" className="space-y-4">
                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="org-location">Location</Label>
                                                <Input
                                                    id="org-location"
                                                    value={settingsForm.location}
                                                    onChange={(e) => setSettingsForm({ ...settingsForm, location: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="org-website">Website</Label>
                                                <Input
                                                    id="org-website"
                                                    type="url"
                                                    value={settingsForm.website}
                                                    onChange={(e) => setSettingsForm({ ...settingsForm, website: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="contact" className="space-y-4">
                                        <div className="grid gap-4 py-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor="org-email">Email</Label>
                                                <Input
                                                    id="org-email"
                                                    type="email"
                                                    value={settingsForm.email}
                                                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="org-phone">Phone</Label>
                                                <Input
                                                    id="org-phone"
                                                    type="tel"
                                                    value={settingsForm.phone}
                                                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <DialogFooter className="mt-4">
                                        <Button type="button" variant="outline" onClick={() => setSettingsDialogOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="gap-2">
                                            <Save className="h-4 w-4" />
                                            Save Changes
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </Tabs>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
                        <DialogTrigger asChild>
                            <Button size="sm" className="gap-2">
                                <Plus className="h-4 w-4" />
                                Invite Member
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Invite Team Member</DialogTitle>
                                <DialogDescription>
                                    Send an invitation to join your organization.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleInviteSubmit}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="member-name">Full Name</Label>
                                        <Input
                                            id="member-name"
                                            placeholder="John Doe"
                                            value={inviteForm.name}
                                            onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="member-email">Email Address</Label>
                                        <Input
                                            id="member-email"
                                            type="email"
                                            placeholder="john@example.com"
                                            value={inviteForm.email}
                                            onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="member-role">Role</Label>
                                        <Select
                                            value={inviteForm.role}
                                            onValueChange={(value) => setInviteForm({ ...inviteForm, role: value })}
                                            required
                                        >
                                            <SelectTrigger id="member-role">
                                                <SelectValue placeholder="Select role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roles.map((role) => (
                                                    <SelectItem key={role} value={role}>
                                                        {role}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setInviteDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="gap-2">
                                        <Mail className="h-4 w-4" />
                                        Send Invitation
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
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
                        {organization.departments.map((dept) => (
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
                                {organization.teamMembers.map((member) => (
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
