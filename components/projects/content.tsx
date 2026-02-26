"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Folder, Plus, Calendar, Users, Clock, ArrowRight } from "lucide-react"

const projects = [
  {
    id: "PRJ-001",
    name: "Website Redesign",
    description: "Complete overhaul of company website with new branding",
    status: "in-progress",
    priority: "high",
    progress: 65,
    dueDate: "2024-03-15",
    team: ["John", "Sarah", "Mike"],
    tasks: { total: 24, completed: 16 },
  },
  {
    id: "PRJ-002",
    name: "Mobile App Development",
    description: "iOS and Android app for customer portal",
    status: "in-progress",
    priority: "high",
    progress: 40,
    dueDate: "2024-04-30",
    team: ["Mike", "Emily"],
    tasks: { total: 32, completed: 13 },
  },
  {
    id: "PRJ-003",
    name: "SEO Optimization",
    description: "Improve search engine rankings and organic traffic",
    status: "completed",
    priority: "medium",
    progress: 100,
    dueDate: "2024-02-28",
    team: ["Sarah", "David"],
    tasks: { total: 18, completed: 18 },
  },
  {
    id: "PRJ-004",
    name: "Payment Gateway Integration",
    description: "Add new payment methods and improve checkout flow",
    status: "planning",
    priority: "high",
    progress: 15,
    dueDate: "2024-05-15",
    team: ["Mike"],
    tasks: { total: 12, completed: 2 },
  },
  {
    id: "PRJ-005",
    name: "Customer Support Chat",
    description: "Implement live chat support for customers",
    status: "planning",
    priority: "medium",
    progress: 0,
    dueDate: "2024-06-01",
    team: ["Emily", "John"],
    tasks: { total: 15, completed: 0 },
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

export function ProjectsContent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    status: "planning",
    priority: "medium",
    dueDate: "",
  })

  const activeProjects = projects.filter((p) => p.status !== "completed").length
  const completedProjects = projects.filter((p) => p.status === "completed").length
  const totalTasks = projects.reduce((acc, p) => acc + p.tasks.total, 0)
  const completedTasks = projects.reduce((acc, p) => acc + p.tasks.completed, 0)

  const handleSaveProject = () => {
    // Handle save logic here
    console.log("Saving project:", newProject)
    setIsDialogOpen(false)
    // Reset form
    setNewProject({
      name: "",
      description: "",
      status: "planning",
      priority: "medium",
      dueDate: "",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
            <Folder className="h-4 w-4" />
            Project Management
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Track and manage your ongoing projects and tasks.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" className="gap-2" onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* New Project Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Enter the basic details for your new project.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                placeholder="Enter project name"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter project description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newProject.status}
                  onValueChange={(value) => setNewProject({ ...newProject, status: value })}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newProject.priority}
                  onValueChange={(value) => setNewProject({ ...newProject, priority: value })}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={newProject.dueDate}
                onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProject}>Create Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Folder className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{activeProjects}</div>
            <p className="mt-1 text-xs text-gray-500">In progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <ArrowRight className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{completedProjects}</div>
            <p className="mt-1 text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Clock className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{totalTasks}</div>
            <p className="mt-1 text-xs text-gray-500">Across all projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{Math.round((completedTasks / totalTasks) * 100)}%</div>
            <p className="mt-1 text-xs text-gray-500">{completedTasks} of {totalTasks} tasks</p>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <Badge className={`text-xs ${priorityColors[project.priority]}`}>
                        {project.priority}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{project.description}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`${project.status === "completed"
                      ? "border-green-500 text-green-700"
                      : project.status === "in-progress"
                        ? "border-blue-500 text-blue-700"
                        : "border-yellow-500 text-yellow-700"
                      }`}
                  >
                    {project.status.replace("-", " ")}
                  </Badge>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Due {project.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{project.team.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      {project.tasks.completed}/{project.tasks.total} tasks
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
