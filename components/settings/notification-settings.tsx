"use client"

import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/lib/store'
import { updateEmailNotification, updatePushNotification } from '@/lib/store/settingsSlice'
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Bell, Mail, MessageSquare } from "lucide-react"

export default function NotificationSettings() {
  const dispatch = useDispatch<AppDispatch>()
  const notifications = useSelector((state: RootState) => state.settings.notifications)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Settings
        </CardTitle>
        <CardDescription>Choose what notifications you want to receive and how</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Email Notifications */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Notifications
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Security Alerts</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Get notified about security events and login attempts
                </p>
              </div>
              <Switch
                checked={notifications.email.security}
                onCheckedChange={(checked) => dispatch(updateEmailNotification({ key: 'security', value: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Product Updates</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">News about product features and updates</p>
              </div>
              <Switch
                checked={notifications.email.updates}
                onCheckedChange={(checked) => dispatch(updateEmailNotification({ key: 'updates', value: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Comments & Replies</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  When someone comments on your posts or replies to you
                </p>
              </div>
              <Switch
                checked={notifications.email.comments}
                onCheckedChange={(checked) => dispatch(updateEmailNotification({ key: 'comments', value: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Mentions</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  When someone mentions you in a comment or post
                </p>
              </div>
              <Switch
                checked={notifications.email.mentions}
                onCheckedChange={(checked) => dispatch(updateEmailNotification({ key: 'mentions', value: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Marketing</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Tips, offers, and promotional content</p>
              </div>
              <Switch
                checked={notifications.email.marketing}
                onCheckedChange={(checked) => dispatch(updateEmailNotification({ key: 'marketing', value: checked }))}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Push Notifications */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Push Notifications
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Messages</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Direct messages and chat notifications</p>
              </div>
              <Switch
                checked={notifications.push.messages}
                onCheckedChange={(checked) => dispatch(updatePushNotification({ key: 'messages', value: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Security Alerts</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Important security notifications</p>
              </div>
              <Switch
                checked={notifications.push.security}
                onCheckedChange={(checked) => dispatch(updatePushNotification({ key: 'security', value: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Product Updates</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">New features and important updates</p>
              </div>
              <Switch
                checked={notifications.push.updates}
                onCheckedChange={(checked) => dispatch(updatePushNotification({ key: 'updates', value: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Marketing</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Promotional notifications and offers</p>
              </div>
              <Switch
                checked={notifications.push.marketing}
                onCheckedChange={(checked) => dispatch(updatePushNotification({ key: 'marketing', value: checked }))}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
