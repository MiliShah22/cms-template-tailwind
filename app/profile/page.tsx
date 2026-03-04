"use client"

import { useState } from "react"
import { User, Mail, Phone, MapPin, Globe, Clock, Languages, LogOut, Lock, Bell as BellIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Layout from "@/components/cmsfullform/layout"

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false)
    const [activeTab, setActiveTab] = useState("profile")
    const [formData, setFormData] = useState({
        firstName: "Alex",
        lastName: "Watson",
        email: "alex.watson@example.com",
        phone: "+1 (555) 123-4567",
        bio: "Prompt Engineer passionate about AI and technology. Love creating innovative solutions and sharing knowledge with the community.",
        location: "San Francisco, CA",
        website: "https://alexwatson.dev",
        timezone: "America/Los_Angeles",
        language: "en",
    })

    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        pushNotifications: true,
        marketingEmails: false,
        smsAlerts: true,
    })

    const [twoFAEnabled, setTwoFAEnabled] = useState(false)

    const handleSave = () => {
        setIsEditing(false)
        // In a real app, save to backend
    }

    const handleCancel = () => {
        setIsEditing(false)
    }

    return (
        <Layout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Account</h1>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger value="profile" className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span className="hidden sm:inline">Profile</span>
                        </TabsTrigger>
                        <TabsTrigger value="security" className="flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            <span className="hidden sm:inline">Security</span>
                        </TabsTrigger>
                        <TabsTrigger value="preferences" className="flex items-center gap-2">
                            <BellIcon className="h-4 w-4" />
                            <span className="hidden sm:inline">Preferences</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Profile Tab */}
                    <TabsContent value="profile" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Profile Information</CardTitle>
                                        <CardDescription>Update your personal information and profile details</CardDescription>
                                    </div>
                                    {!isEditing ? (
                                        <Button onClick={() => setIsEditing(true)} size="sm">
                                            Edit Profile
                                        </Button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Button onClick={handleSave} size="sm">
                                                Save Changes
                                            </Button>
                                            <Button onClick={handleCancel} variant="outline" size="sm">
                                                Cancel
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Profile Picture */}
                                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src="/profile-placeholder.svg" alt="Profile" />
                                        <AvatarFallback>AW</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900 dark:text-white">Profile Photo</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">JPG, PNG or GIF (max. 5MB)</p>
                                        {isEditing && (
                                            <Button variant="outline" size="sm" className="mt-2">
                                                Upload Photo
                                            </Button>
                                        )}
                                    </div>
                                </div>

                                {/* Basic Information */}
                                <div className="grid gap-4 md:gap-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input
                                                id="firstName"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">
                                            <Mail className="h-4 w-4 inline mr-2" />
                                            Email Address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">
                                            <Phone className="h-4 w-4 inline mr-2" />
                                            Phone Number
                                        </Label>
                                        <Input
                                            id="phone"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Textarea
                                            id="bio"
                                            value={formData.bio}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            disabled={!isEditing}
                                            rows={3}
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="location">
                                                <MapPin className="h-4 w-4 inline mr-2" />
                                                Location
                                            </Label>
                                            <Input
                                                id="location"
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="website">
                                                <Globe className="h-4 w-4 inline mr-2" />
                                                Website
                                            </Label>
                                            <Input
                                                id="website"
                                                value={formData.website}
                                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                                disabled={!isEditing}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="timezone">
                                                <Clock className="h-4 w-4 inline mr-2" />
                                                Timezone
                                            </Label>
                                            <Select
                                                value={formData.timezone}
                                                onValueChange={(value) => setFormData({ ...formData, timezone: value })}
                                                disabled={!isEditing}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                                                    <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                                                    <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                                                    <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                                                    <SelectItem value="Europe/London">London (GMT)</SelectItem>
                                                    <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                                                    <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="language">
                                                <Languages className="h-4 w-4 inline mr-2" />
                                                Language
                                            </Label>
                                            <Select
                                                value={formData.language}
                                                onValueChange={(value) => setFormData({ ...formData, language: value })}
                                                disabled={!isEditing}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="en">English</SelectItem>
                                                    <SelectItem value="es">Español</SelectItem>
                                                    <SelectItem value="fr">Français</SelectItem>
                                                    <SelectItem value="de">Deutsch</SelectItem>
                                                    <SelectItem value="ja">日本語</SelectItem>
                                                    <SelectItem value="zh">中文</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Security Tab */}
                    <TabsContent value="security" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Password & Security</CardTitle>
                                <CardDescription>Manage your password and security settings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Change Password */}
                                <div className="space-y-4">
                                    <h3 className="font-medium text-gray-900 dark:text-white">Change Password</h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="currentPassword">Current Password</Label>
                                        <Input id="currentPassword" type="password" placeholder="••••••••" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="newPassword">New Password</Label>
                                        <Input id="newPassword" type="password" placeholder="••••••••" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                                        <Input id="confirmPassword" type="password" placeholder="••••••••" />
                                    </div>
                                    <Button className="w-full md:w-auto">Update Password</Button>
                                </div>

                                <hr className="dark:border-gray-700" />

                                {/* Two-Factor Authentication */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                Add an extra layer of security to your account
                                            </p>
                                        </div>
                                        <Badge variant={twoFAEnabled ? "default" : "outline"}>
                                            {twoFAEnabled ? "Enabled" : "Disabled"}
                                        </Badge>
                                    </div>
                                    <Button
                                        onClick={() => setTwoFAEnabled(!twoFAEnabled)}
                                        variant={twoFAEnabled ? "destructive" : "default"}
                                    >
                                        {twoFAEnabled ? "Disable 2FA" : "Enable 2FA"}
                                    </Button>
                                </div>

                                <hr className="dark:border-gray-700" />

                                {/* Active Sessions */}
                                <div className="space-y-4">
                                    <h3 className="font-medium text-gray-900 dark:text-white">Active Sessions</h3>
                                    <div className="space-y-2">
                                        <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">Current Session</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Windows • Chrome • Last active: now</p>
                                            </div>
                                            <Badge>Active</Badge>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="w-full">
                                        Sign Out All Other Sessions
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Preferences Tab */}
                    <TabsContent value="preferences" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Preferences</CardTitle>
                                <CardDescription>Manage how you receive notifications</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Email Notifications */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates via email</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={preferences.emailNotifications}
                                        onChange={(e) =>
                                            setPreferences({ ...preferences, emailNotifications: e.target.checked })
                                        }
                                        className="h-5 w-5"
                                    />
                                </div>

                                {/* Push Notifications */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white">Push Notifications</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive browser notifications</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={preferences.pushNotifications}
                                        onChange={(e) =>
                                            setPreferences({ ...preferences, pushNotifications: e.target.checked })
                                        }
                                        className="h-5 w-5"
                                    />
                                </div>

                                {/* Marketing Emails */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white">Marketing Emails</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive promotions and updates</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={preferences.marketingEmails}
                                        onChange={(e) =>
                                            setPreferences({ ...preferences, marketingEmails: e.target.checked })
                                        }
                                        className="h-5 w-5"
                                    />
                                </div>

                                {/* SMS Alerts */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white">SMS Alerts</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Receive urgent alerts via SMS</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={preferences.smsAlerts}
                                        onChange={(e) => setPreferences({ ...preferences, smsAlerts: e.target.checked })}
                                        className="h-5 w-5"
                                    />
                                </div>

                                <Button className="w-full">Save Preferences</Button>
                            </CardContent>
                        </Card>

                        <Card className="border-red-200 dark:border-red-900">
                            <CardHeader>
                                <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">Delete Account</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        Once you delete your account, there is no going back. Please be certain.
                                    </p>
                                    <Button variant="destructive">Delete My Account</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    )
}
