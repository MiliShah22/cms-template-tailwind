"use client"

import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function DemoSettings() {
    const notifications = useSelector((state: RootState) => state.settings.notifications)
    const theme = useSelector((state: RootState) => state.settings.theme)
    const language = useSelector((state: RootState) => state.settings.language)

    // Count enabled notifications
    const emailEnabled = Object.values(notifications.email).filter(Boolean).length
    const pushEnabled = Object.values(notifications.push).filter(Boolean).length
    const totalEnabled = emailEnabled + pushEnabled

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Live Redux State Demo
                    <Badge variant="secondary" className="animate-pulse">
                        Real-time
                    </Badge>
                </CardTitle>
                <CardDescription>
                    This component shows Redux state in real-time. Change settings above and watch values update instantly!
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Email Notifications State */}
                <div className="space-y-3">
                    <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Email Notifications State
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {Object.entries(notifications.email).map(([key, value]) => (
                            <div
                                key={key}
                                className={`p-2 rounded-lg text-center text-sm transition-colors ${value
                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                                    }`}
                            >
                                <span className="capitalize">{key}</span>
                                <div className="font-bold mt-1">{value ? 'ON' : 'OFF'}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Push Notifications State */}
                <div className="space-y-3">
                    <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Push Notifications State
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {Object.entries(notifications.push).map(([key, value]) => (
                            <div
                                key={key}
                                className={`p-2 rounded-lg text-center text-sm transition-colors ${value
                                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                                    }`}
                            >
                                <span className="capitalize">{key}</span>
                                <div className="font-bold mt-1">{value ? 'ON' : 'OFF'}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {emailEnabled}
                        </div>
                        <div className="text-xs text-purple-600 dark:text-purple-400">
                            Email Enabled
                        </div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                            {pushEnabled}
                        </div>
                        <div className="text-xs text-indigo-600 dark:text-indigo-400">
                            Push Enabled
                        </div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                            {totalEnabled}
                        </div>
                        <div className="text-xs text-orange-600 dark:text-orange-400">
                            Total Enabled
                        </div>
                    </div>
                </div>

                {/* Other Settings */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Theme</div>
                        <div className="font-medium capitalize">{theme}</div>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Language</div>
                        <div className="font-medium uppercase">{language}</div>
                    </div>
                </div>

                {/* JSON Preview */}
                <div className="pt-4 border-t">
                    <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2">
                        Raw Redux State (JSON)
                    </h4>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
                        {JSON.stringify(notifications, null, 2)}
                    </pre>
                </div>
            </CardContent>
        </Card>
    )
}
