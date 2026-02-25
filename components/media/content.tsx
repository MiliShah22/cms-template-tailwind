import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, Video, Headphones, FileText, Search, Upload, Grid, List, Download, Trash2, Eye } from "lucide-react"

const images = [
    { id: "IMG-001", name: "hero-banner.jpg", size: "2.4 MB", dimensions: "1920x1080", date: "2024-02-15" },
    { id: "IMG-002", name: "product-01.png", size: "1.2 MB", dimensions: "800x800", date: "2024-02-14" },
    { id: "IMG-003", name: "product-02.png", size: "1.1 MB", dimensions: "800x800", date: "2024-02-14" },
    { id: "IMG-004", name: "team-photo.jpg", size: "3.8 MB", dimensions: "2400x1600", date: "2024-02-13" },
    { id: "IMG-005", name: "logo-dark.png", size: "45 KB", dimensions: "512x512", date: "2024-02-12" },
    { id: "IMG-006", name: "logo-light.png", size: "42 KB", dimensions: "512x512", date: "2024-02-12" },
]

const videos = [
    { id: "VID-001", name: "product-demo.mp4", size: "125 MB", duration: "5:32", date: "2024-02-10" },
    { id: "VID-002", name: "tutorial-01.mp4", size: "89 MB", duration: "12:45", date: "2024-02-08" },
]

const audio = [
    { id: "AUD-001", name: "podcast-ep1.mp3", size: "45 MB", duration: "32:15", date: "2024-02-05" },
    { id: "AUD-002", name: "podcast-ep2.mp3", size: "52 MB", duration: "38:42", date: "2024-02-01" },
]

const documents = [
    { id: "DOC-001", name: "user-guide.pdf", size: "4.2 MB", pages: 45, date: "2024-01-28" },
    { id: "DOC-002", name: "terms-of-service.pdf", size: "1.8 MB", pages: 12, date: "2024-01-15" },
]

export function MediaContent() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                        <ImageIcon className="h-4 w-4" />
                        Media Library
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Media</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Manage your images, videos, audio files and documents.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button size="sm" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Files
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Images</CardTitle>
                        <ImageIcon className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">156</div>
                        <p className="mt-1 text-xs text-gray-500">2.1 GB total</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Videos</CardTitle>
                        <Video className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">24</div>
                        <p className="mt-1 text-xs text-gray-500">1.8 GB total</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Audio</CardTitle>
                        <Headphones className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">18</div>
                        <p className="mt-1 text-xs text-gray-500">450 MB total</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Documents</CardTitle>
                        <FileText className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">32</div>
                        <p className="mt-1 text-xs text-gray-500">28 MB total</p>
                    </CardContent>
                </Card>
            </div>

            {/* Media Browser */}
            <Card>
                <CardContent className="pt-4">
                    <div className="mb-4 flex items-center gap-2">
                        <div className="flex items-center gap-2 rounded-md border bg-background px-2 py-1 text-xs text-gray-500">
                            <Search className="h-3 w-3" />
                            Search
                        </div>
                        <Input placeholder="Search media..." className="h-9 max-w-sm bg-transparent text-sm" />
                    </div>

                    <Tabs defaultValue="images" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 sm:w-auto">
                            <TabsTrigger value="images">Images</TabsTrigger>
                            <TabsTrigger value="videos">Videos</TabsTrigger>
                            <TabsTrigger value="audio">Audio</TabsTrigger>
                            <TabsTrigger value="documents">Documents</TabsTrigger>
                        </TabsList>

                        <TabsContent value="images" className="pt-4">
                            <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                                {images.map((img) => (
                                    <div
                                        key={img.id}
                                        className="group relative aspect-square rounded-lg border bg-gray-100 dark:bg-gray-800 overflow-hidden"
                                    >
                                        <div className="flex h-full items-center justify-center">
                                            <ImageIcon className="h-12 w-12 text-gray-400" />
                                        </div>
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <Button variant="secondary" size="icon" className="h-8 w-8">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="secondary" size="icon" className="h-8 w-8">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-white">
                                            <p className="truncate text-xs font-medium">{img.name}</p>
                                            <p className="text-[10px] opacity-75">{img.size}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="videos" className="pt-4">
                            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {videos.map((vid) => (
                                    <div key={vid.id} className="rounded-lg border p-4">
                                        <div className="aspect-video rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                                            <Video className="h-12 w-12 text-gray-400" />
                                        </div>
                                        <h3 className="font-medium text-sm truncate">{vid.name}</h3>
                                        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                                            <span>{vid.size}</span>
                                            <span>{vid.duration}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="audio" className="pt-4">
                            <div className="space-y-2">
                                {audio.map((a) => (
                                    <div key={a.id} className="flex items-center justify-between rounded-lg border p-3">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-2">
                                                <Headphones className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-sm">{a.name}</h3>
                                                <p className="text-xs text-gray-500">{a.duration}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">{a.size}</div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="documents" className="pt-4">
                            <div className="space-y-2">
                                {documents.map((doc) => (
                                    <div key={doc.id} className="flex items-center justify-between rounded-lg border p-3">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-2">
                                                <FileText className="h-4 w-4 text-gray-400" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-sm">{doc.name}</h3>
                                                <p className="text-xs text-gray-500">{doc.pages} pages</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">{doc.size}</div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
