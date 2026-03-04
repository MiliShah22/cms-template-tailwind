"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import ProfileSettings from "./profile-settings"
import SecuritySettings from "./security-settings"
import NotificationSettings from "./notification-settings"
import DemoSettings from "./demo-settings"
import { User, Shield, Bell, Lock } from "lucide-react"

export default function SettingsContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your account settings and preferences</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-full">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <ProfileSettings />
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <SecuritySettings />
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationSettings />
          {/* Demo component showing Redux state in real-time */}
          <DemoSettings />
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy & Visibility</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Control who can see your information</p>
              </div>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg">
                  <p className="font-medium text-gray-900 dark:text-white">Profile Visibility</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Your profile is currently set to Public</p>
                </div>
                <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-lg">
                  <p className="font-medium text-gray-900 dark:text-white">Activity Status</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Others can see when you're online</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
