"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    ArrowLeft,
    Calendar,
    Users,
    Clock,
    CheckCircle2,
    Circle,
    MoreHorizontal,
    Edit,
    Trash2,
    Link2,
    MessageSquare,
    Paperclip,
} from "lucide-react"
import Link from "next/link"

// Sample project data - in real app this would come from API/database
const projects = [
    {
        id: "PRJ-001",
        name: "Website Redesign",
        description: "Complete overhaul of company website with new branding, improved UX, and modern design system. This project involves redesigning all pages, implementing new components, and ensuring mobile responsiveness.",
        status: "in-progress",
        priority: "high",
        progress: 65,
        dueDate: "2024-03-15",
        startDate: "2024-01-15",
        team: [
            { name: "John", role: "Lead Developer", avatar: "JD" },
            { name: "Sarah", role: "Designer", avatar: "SA" },
            { name: "Mike", role: "Frontend Dev", avatar: "MK" },
        ],
        tasks: [
            { id: 1, title: "Design homepage mockup", status: "completed", assignee: "Sarah" },
            { id: 2, title: "Create design system components", status: "completed", assignee: "Sarah" },
            { id: 3, title: "Implement responsive navigation", status: "completed", assignee: "Mike" },
            { id: 4, title: "Build homepage sections", status: "in-progress", assignee: "John" },
            { id: 5, title: "Add animations and transitions", status: "pending", assignee: "Mike" },
            { id: 6, title: "Integrate with CMS", status: "pending", assignee: "John" },
            { id: 7, title: "Performance optimization", status: "pending", assignee: "John" },
            { id: 8, title: "Cross-browser testing", status: "pending", assignee: "Mike" },
        ],
        activities: [
            { id: 1, type: "comment", user: "John", action: "commented on", target: "homepage design", time: "2 hours ago" },
            { id: 2, type: "task", user: "Sarah", action: "completed", target: "design system components", time: "5 hours ago" },
            { id: 3, type: "update", user: "Mike", action: "updated", target: "navigation implementation", time: "1 day ago" },
            { id: 4, type: "file", user: "John", action: "uploaded", target: "project-brief-v2.pdf", time: "2 days ago" },
        ],
    },
    {
        id: "PRJ-002",
        name: "Mobile App Development",
        description: "iOS and Android app for customer portal with real-time notifications, order tracking, and account management features.",
        status: "in-progress",
        priority: "high",
        progress: 40,
        dueDate: "2024-04-30",
        startDate: "2024-02-01",
        team: [
            { name: "Mike", role: "iOS Developer", avatar: "MK" },
            { name: "Emily", role: "Android Developer", avatar: "EM" },
        ],
        tasks: [
            { id: 1, title: "Setup project structure", status: "completed", assignee: "Mike" },
            { id: 2, title: "Implement authentication", status: "completed", assignee: "Emily" },
            { id: 3, title: "Build user profile screen", status: "in-progress", assignee: "Mike" },
            { id: 4, title: "Add push notifications", status: "pending", assignee: "Emily" },
        ],
        activities: [
            { id: 1, type: "task", user: "Mike", action: "started", target: "profile screen", time: "1 day ago" },
        ],
    },
    {
        id: "PRJ-003",
        name: "SEO Optimization",
        description: "Improve search engine rankings and organic traffic through technical SEO, content optimization, and backlink strategy.",
        status: "completed",
        priority: "medium",
        progress: 100,
        dueDate: "2024-02-28",
        startDate: "2024-01-01",
        team: [
            { name: "Sarah", role: "SEO Specialist", avatar: "SA" },
            { name: "David", role: "Content Writer", avatar: "DV" },
        ],
        tasks: [
            { id: 1, title: "Audit current SEO status", status: "completed", assignee: "Sarah" },
            { id: 2, title: "Optimize meta tags", status: "completed", assignee: "Sarah" },
            { id: 3, title: "Create SEO content", status: "completed", assignee: "David" },
        ],
        activities: [],
    },
    {
        id: "PRJ-004",
        name: "Payment Gateway Integration",
        description: "Add new payment methods and improve checkout flow with Stripe, PayPal, and local payment options.",
        status: "planning",
        priority: "high",
        progress: 15,
        dueDate: "2024-05-15",
        startDate: "2024-03-01",
        team: [
            { name: "Mike", role: "Backend Developer", avatar: "MK" },
        ],
        tasks: [
            { id: 1, title: "Research payment providers", status: "completed", assignee: "Mike" },
            { id: 2, title: "Setup Stripe account", status: "in-progress", assignee: "Mike" },
        ],
        activities: [],
    },
    {
        id: "PRJ-005",
        name: "Customer Support Chat",
        description: "Implement live chat support for customers with AI-powered bot and agent dashboard.",
        status: "planning",
        priority: "medium",
        progress: 0,
        dueDate: "2024-06-01",
        startDate: "2024-04-01",
        team: [
            { name: "Emily", role: "Product Manager", avatar: "EM" },
            { name: "John", role: "Backend Developer", avatar: "JD" },
        ],
        tasks: [],
        activities: [],
    },
]

const statusColors: Record<string, string> = {
    "in-progress": "bg-blue-500",
    completed: "bg-green-500",
    planning: "bg-yellow-500",
}

const priorityColors: Record<string, string> = {
    high: "text-red-600 bg-red-50 dark:bg-red-900/20",
    medium: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20",
    low: "text-gray-600 bg-gray-50 dark:bg-gray-900/20",
}

const statusBadgeColors: Record<string, string> = {
    "in-progress": "border-blue-500 text-blue-700",
    completed: "border-green-500 text-green-700",
    planning: "border-yellow-500 text-yellow-700",
}

interface ProjectDetailContentProps {
    projectId: string
}

export function ProjectDetailContent({ projectId }: ProjectDetailContentProps) {
    const project = projects.find((p) => p.id === projectId)

    if (!project) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Project Not Found</h2>
                <p className="text-gray-500 mt-2">The project you're looking for doesn't exist.</p>
                <Link href="/projects">
                    <Button className="mt-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Projects
                    </Button>
                </Link>
            </div>
        )
    }

    const completedTasks = project.tasks.filter((t) => t.status === "completed").length
    const totalTasks = project.tasks.length

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4">
                <Link href="/projects">
                    <Button variant="ghost" size="sm" className="gap-2 w-fit">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Projects
                    </Button>
                </Link>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-gray-500">{project.id}</span>
                            <Badge className={`text-xs ${priorityColors[project.priority]}`}>
                                {project.priority} priority
                            </Badge>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl">{project.description}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                        </Button>
                        <Button variant="outline" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Status</CardTitle>
                        <Badge variant="outline" className={statusBadgeColors[project.status]}>
                            {project.status.replace("-", " ")}
                        </Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold capitalize">{project.status.replace("-", " ")}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Progress</CardTitle>
                        <Clock className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{project.progress}%</div>
                        <Progress value={project.progress} className="h-2 mt-2" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Due Date</CardTitle>
                        <Calendar className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{project.dueDate}</div>
                        <p className="mt-1 text-xs text-gray-500">Started: {project.startDate}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tasks</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{completedTasks}/{totalTasks}</div>
                        <p className="mt-1 text-xs text-gray-500">completed</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Tasks Section */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {project.tasks.length > 0 ? (
                                <div className="space-y-3">
                                    {project.tasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                                        >
                                            {task.status === "completed" ? (
                                                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                            ) : task.status === "in-progress" ? (
                                                <Circle className="h-5 w-5 text-blue-500 flex-shrink-0 animate-pulse" />
                                            ) : (
                                                <Circle className="h-5 w-5 text-gray-300 flex-shrink-0" />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-medium ${task.status === "completed" ? "line-through text-gray-400" : "text-gray-900 dark:text-white"}`}>
                                                    {task.title}
                                                </p>
                                                <p className="text-xs text-gray-500">Assigned to {task.assignee}</p>
                                            </div>
                                            <Badge variant="outline" className="text-xs capitalize">
                                                {task.status.replace("-", " ")}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">No tasks yet</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Activity Section */}
                    {project.activities.length > 0 && (
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle className="text-lg">Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {project.activities.map((activity) => (
                                        <div key={activity.id} className="flex gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className="text-xs">
                                                    {activity.user.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <p className="text-sm">
                                                    <span className="font-medium">{activity.user}</span>{" "}
                                                    <span className="text-gray-600 dark:text-gray-400">{activity.action}</span>{" "}
                                                    <span className="font-medium">{activity.target}</span>
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Team Members */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Team Members</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {project.team.map((member, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarFallback>{member.avatar}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium">{member.name}</p>
                                            <p className="text-xs text-gray-500">{member.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="outline" className="w-full mt-4">
                                <Users className="h-4 w-4 mr-2" />
                                Add Team Member
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Add Comment
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Paperclip className="h-4 w-4 mr-2" />
                                Attach File
                            </Button>
                            <Button variant="outline" className="w-full justify-start">
                                <Link2 className="h-4 w-4 mr-2" />
                                Share Link
                            </Button>
                            <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Project
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
