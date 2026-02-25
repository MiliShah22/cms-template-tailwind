import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Video, Users, Clock, Plus, Play, MoreHorizontal, MapPin } from "lucide-react"

const scheduledMeetings = [
    { id: 1, title: "Weekly Team Standup", date: "2024-02-15", time: "10:00 AM", duration: "30 min", attendees: 5, type: "video", host: "John Smith" },
    { id: 2, title: "Product Review", date: "2024-02-15", time: "2:00 PM", duration: "1 hour", attendees: 8, type: "video", host: "Sarah Johnson" },
    { id: 3, title: "Client Presentation", date: "2024-02-16", time: "11:00 AM", duration: "1 hour", attendees: 3, type: "video", host: "Mike Davis" },
    { id: 4, title: "Sprint Planning", date: "2024-02-17", time: "9:00 AM", duration: "2 hours", attendees: 6, type: "video", host: "Emily Brown" },
]

const meetingRooms = [
    { id: 1, name: "Main Conference", capacity: 50, status: "available" },
    { id: 2, name: "Small Meeting Room A", capacity: 8, status: "in-use" },
    { id: 3, name: "Small Meeting Room B", capacity: 6, status: "available" },
    { id: 4, name: "Training Room", capacity: 20, status: "available" },
]

const recentRecordings = [
    { id: 1, title: "Q1 Planning Session", date: "2024-02-10", duration: "1h 23m", size: "450 MB" },
    { id: 2, title: "Product Demo", date: "2024-02-08", duration: "45m", size: "280 MB" },
    { id: 3, title: "Client Call - Acme Corp", date: "2024-02-05", duration: "32m", size: "180 MB" },
]

export function MeetingsContent() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                        <Video className="h-4 w-4" />
                        Meetings
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Meetings</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Schedule and manage video conferences and meetings.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        New Meeting
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
                        <Calendar className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{scheduledMeetings.length}</div>
                        <p className="mt-1 text-xs text-gray-500">This week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Meeting Rooms</CardTitle>
                        <MapPin className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{meetingRooms.length}</div>
                        <p className="mt-1 text-xs text-gray-500">Available now</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Recordings</CardTitle>
                        <Video className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{recentRecordings.length}</div>
                        <p className="mt-1 text-xs text-gray-500">This month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
                        <Users className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">22</div>
                        <p className="mt-1 text-xs text-gray-500">Across all meetings</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Upcoming Meetings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Upcoming Meetings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {scheduledMeetings.map((meeting) => (
                            <div key={meeting.id} className="flex items-start justify-between rounded-lg border p-3">
                                <div className="flex items-start gap-3">
                                    <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                                        <Video className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-sm">{meeting.title}</h3>
                                        <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {meeting.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {meeting.time}
                                            </span>
                                        </div>
                                        <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <Users className="h-3 w-3" />
                                                {meeting.attendees} attendees
                                            </span>
                                            <span>by {meeting.host}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Play className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Meeting Rooms */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Meeting Rooms</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {meetingRooms.map((room) => (
                            <div key={room.id} className="flex items-center justify-between rounded-lg border p-3">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                                        <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-sm">{room.name}</h3>
                                        <p className="text-xs text-gray-500">Capacity: {room.capacity} people</p>
                                    </div>
                                </div>
                                <Badge
                                    variant="outline"
                                    className={room.status === "available" ? "border-green-500 text-green-700" : "border-red-500 text-red-700"}
                                >
                                    {room.status === "available" ? "Available" : "In Use"}
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Recent Recordings */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Recent Recordings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {recentRecordings.map((recording) => (
                            <div key={recording.id} className="flex items-center justify-between rounded-lg border p-3">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                                        <Video className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-sm">{recording.title}</h3>
                                        <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                                            <span>{recording.date}</span>
                                            <span>{recording.duration}</span>
                                            <span>{recording.size}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm">
                                        Play
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
