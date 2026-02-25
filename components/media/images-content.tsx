import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Image, Search, Download, Trash2, Eye, Plus, Filter } from "lucide-react"

const imagesData = [
    { id: 1, name: "hero-banner.jpg", size: "2.4 MB", dimensions: "1920x1080", date: "2024-02-15", views: 1250 },
    { id: 2, name: "product-showcase.png", size: "1.8 MB", dimensions: "1200x800", date: "2024-02-14", views: 890 },
    { id: 3, name: "team-photo.jpg", size: "3.2 MB", dimensions: "2400x1600", date: "2024-02-12", views: 567 },
    { id: 4, name: "logo-dark.svg", size: "24 KB", dimensions: "512x512", date: "2024-02-10", views: 2340 },
    { id: 5, name: "testimonial-bg.jpg", size: "1.2 MB", dimensions: "1600x900", date: "2024-02-08", views: 445 },
    { id: 6, name: "blog-header.png", size: "890 KB", dimensions: "1200x630", date: "2024-02-05", views: 780 },
    { id: 7, name: "feature-icon.svg", size: "12 KB", dimensions: "256x256", date: "2024-02-03", views: 1560 },
    { id: 8, name: "about-us.jpg", size: "2.1 MB", dimensions: "1800x1200", date: "2024-02-01", views: 320 },
]

export function MediaImagesContent() {
    const totalSize = imagesData.reduce((acc, img) => {
        const sizeNum = parseFloat(img.size)
        return acc + (img.size.includes("MB") ? sizeNum * 1024 : sizeNum)
    }, 0)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                        <Image className="h-4 w-4" />
                        Media
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Images</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Manage and organize your image library.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filter
                    </Button>
                    <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Upload Images
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Images</CardTitle>
                        <Image className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{imagesData.length}</div>
                        <p className="mt-1 text-xs text-gray-500">Images</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                        <Image className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{(totalSize / 1024).toFixed(1)} MB</div>
                        <p className="mt-1 text-xs text-gray-500">Of 5 GB</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                        <Eye className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{imagesData.reduce((acc, img) => acc + img.views, 0).toLocaleString()}</div>
                        <p className="mt-1 text-xs text-gray-500">All time</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Size</CardTitle>
                        <Image className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{(totalSize / imagesData.length / 1024).toFixed(1)} MB</div>
                        <p className="mt-1 text-xs text-gray-500">Per image</p>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search images..." className="pl-9" />
                </div>
            </div>

            {/* Images Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {imagesData.map((image) => (
                    <Card key={image.id} className="overflow-hidden">
                        <div className="aspect-video bg-gray-100 flex items-center justify-center relative group">
                            <Image className="h-12 w-12 text-gray-400" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <Button variant="secondary" size="icon" className="h-8 w-8">
                                    <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="secondary" size="icon" className="h-8 w-8">
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <CardContent className="p-3">
                            <p className="font-medium truncate">{image.name}</p>
                            <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                                <span>{image.size}</span>
                                <span>{image.dimensions}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
