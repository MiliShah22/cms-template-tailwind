import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Folder, Filter, Plus, Clock, Users2 } from "lucide-react"

const projects = [
  {
    id: "PRJ-0012",
    name: "Marketing Site Revamp",
    owner: "Jane Cooper",
    status: "In progress",
    progress: "68%",
    dueDate: "2024-03-15",
  },
  {
    id: "PRJ-0011",
    name: "CMS Migration",
    owner: "Cody Fisher",
    status: "Planning",
    progress: "12%",
    dueDate: "2024-04-01",
  },
  {
    id: "PRJ-0009",
    name: "SEO Landing Pages",
    owner: "Kristin Watson",
    status: "Completed",
    progress: "100%",
    dueDate: "2024-01-20",
  },
  {
    id: "PRJ-0007",
    name: "SaaS Dashboard Theme",
    owner: "Devon Lane",
    status: "In progress",
    progress: "41%",
    dueDate: "2024-02-28",
  },
]

export function ProjectsContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
            <Folder className="h-4 w-4" />
            Workspace
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Track implementation projects, campaigns and CMS initiatives.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Views
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            New project
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-sm font-medium">Open projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">8</div>
            <p className="mt-1 text-xs text-gray-500">Across all teams</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-sm font-medium">Average completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">56%</div>
            <p className="mt-1 text-xs text-gray-500">Active projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-sm font-medium">Delayed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">2</div>
            <p className="mt-1 text-xs text-gray-500">Past their due date</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters & tabs */}
      <Card>
        <CardContent className="space-y-4 pt-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2 rounded-md border bg-background px-2 py-1 text-xs text-gray-500">
                <Search className="h-3 w-3" />
                Search
              </div>
              <Input
                placeholder="Search by project name or ID..."
                className="h-9 max-w-sm bg-transparent text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="h-9 w-[140px] text-xs">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="in-progress">In progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="table" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:w-auto">
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>
            <TabsContent value="table" className="pt-4">
              <ProjectsTable />
            </TabsContent>
            <TabsContent value="overview" className="pt-4">
              <ProjectsOverview />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function ProjectsTable() {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[220px]">Project</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="hidden sm:table-cell text-right">Progress</TableHead>
            <TableHead className="text-right">Due date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>{project.name}</span>
                  <span className="mt-0.5 text-[11px] text-gray-500">{project.id}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-gray-700 dark:text-gray-200">
                <div className="flex items-center gap-1">
                  <Users2 className="h-3 w-3 text-gray-400" />
                  {project.owner}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <StatusBadge status={project.status} />
              </TableCell>
              <TableCell className="hidden sm:table-cell text-right text-sm text-gray-600">
                {project.progress}
              </TableCell>
              <TableCell className="text-right text-sm text-gray-600">
                <div className="flex items-center justify-end gap-1">
                  <Clock className="h-3 w-3 text-gray-400" />
                  {project.dueDate}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === "In progress") {
    return (
      <Badge className="bg-blue-50 text-xs font-normal text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
        In progress
      </Badge>
    )
  }
  if (status === "Completed") {
    return (
      <Badge className="bg-emerald-50 text-xs font-normal text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
        Completed
      </Badge>
    )
  }
  if (status === "Planning") {
    return (
      <Badge className="bg-amber-50 text-xs font-normal text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
        Planning
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="text-xs font-normal">
      {status}
    </Badge>
  )
}

function ProjectsOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="space-y-1 pb-2">
          <CardTitle className="text-sm font-medium">By status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center justify-between">
            <span>In progress</span>
            <span className="font-medium">4</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Planning</span>
            <span className="font-medium">3</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Completed</span>
            <span className="font-medium">12</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="space-y-1 pb-2">
          <CardTitle className="text-sm font-medium">This week</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center justify-between">
            <span>Due in next 7 days</span>
            <span className="font-medium">3</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Blocked</span>
            <span className="font-medium">1</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Newly created</span>
            <span className="font-medium">5</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="space-y-1 pb-2">
          <CardTitle className="text-sm font-medium">Team load</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center justify-between">
            <span>Marketing</span>
            <span className="font-medium">3 projects</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Product</span>
            <span className="font-medium">2 projects</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Engineering</span>
            <span className="font-medium">5 projects</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


