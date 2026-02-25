import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Search, Plus, Globe, Eye, Edit, Trash2, Copy } from "lucide-react"

const pages = [
    { id: "PGS-001", title: "Home", slug: "/", status: "published", author: "John Smith", lastModified: "2024-02-15", views: 12500 },
    { id: "PGS-002", title: "About Us", slug: "/about", status: "published", author: "Sarah Johnson", lastModified: "2024-02-10", views: 4200 },
    { id: "PGS-003", title: "Services", slug: "/services", status: "published", author: "Mike Davis", lastModified: "2024-02-08", views: 3800 },
    { id: "PGS-004", title: "Pricing", slug: "/pricing", status: "published", author: "Emily Brown", lastModified: "2024-02-12", views: 5600 },
    { id: "PGS-005", title: "Contact", slug: "/contact", status: "published", author: "John Smith", lastModified: "2024-02-05", views: 2900 },
    { id: "PGS-006", title: "Blog", slug: "/blog", status: "published", author: "Sarah Johnson", lastModified: "2024-02-14", views: 8200 },
    { id: "PGS-007", title: "Features", slug: "/features", status: "draft", author: "Mike Davis", lastModified: "2024-02-13", views: 0 },
    { id: "PGS-008", title: "Testimonials", slug: "/testimonials", status: "draft", author: "Emily Brown", lastModified: "2024-02-11", views: 0 },
]

const blogPosts = [
    { id: "BLG-001", title: "Getting Started with CMSFullForm", category: "Tutorial", status: "published", author: "John Smith", date: "2024-02-15", views: 1250 },
    { id: "BLG-002", title: "10 Tips for Better SEO", category: "SEO", status: "published", author: "Sarah Johnson", date: "2024-02-12", views: 2340 },
    { id: "BLG-003", title: "New Features Released", category: "News", status: "published", author: "Mike Davis", date: "2024-02-10", views: 1890 },
    { id: "BLG-004", title: "How to Customize Your Theme", category: "Tutorial", status: "draft", author: "Emily Brown", date: "2024-02-14", views: 0 },
]

export function PagesContent() {
    const publishedPages = pages.filter((p) => p.status === "published").length
    const draftPages = pages.filter((p) => p.status === "draft").length

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                        <FileText className="h-4 w-4" />
                        Content Management
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Pages</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Create and manage your website pages and blog posts.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        New Page
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
                        <FileText className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{pages.length}</div>
                        <p className="mt-1 text-xs text-gray-500">Website pages</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Published</CardTitle>
                        <Globe className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{publishedPages}</div>
                        <p className="mt-1 text-xs text-gray-500">Live on website</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Drafts</CardTitle>
                        <Edit className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{draftPages}</div>
                        <p className="mt-1 text-xs text-gray-500">Work in progress</p>
                    </CardContent>
                </Card>
            </div>

            {/* Pages & Blog Tabs */}
            <Card>
                <CardContent className="pt-4">
                    <div className="mb-4 flex items-center gap-2">
                        <div className="flex items-center gap-2 rounded-md border bg-background px-2 py-1 text-xs text-gray-500">
                            <Search className="h-3 w-3" />
                            Search
                        </div>
                        <Input placeholder="Search pages..." className="h-9 max-w-sm bg-transparent text-sm" />
                    </div>

                    <Tabs defaultValue="pages" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 sm:w-auto">
                            <TabsTrigger value="pages">Website Pages</TabsTrigger>
                            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
                        </TabsList>

                        <TabsContent value="pages" className="pt-4">
                            <div className="w-full overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Page Title</TableHead>
                                            <TableHead>Slug</TableHead>
                                            <TableHead>Author</TableHead>
                                            <TableHead>Last Modified</TableHead>
                                            <TableHead className="text-right">Views</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {pages.map((page) => (
                                            <TableRow key={page.id}>
                                                <TableCell className="font-medium">{page.title}</TableCell>
                                                <TableCell className="text-sm text-gray-600">{page.slug}</TableCell>
                                                <TableCell className="text-sm text-gray-600">{page.author}</TableCell>
                                                <TableCell className="text-sm text-gray-600">{page.lastModified}</TableCell>
                                                <TableCell className="text-right text-sm">{page.views.toLocaleString()}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={page.status === "published" ? "border-green-500 text-green-700" : "border-yellow-500 text-yellow-700"}
                                                    >
                                                        {page.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        <TabsContent value="blog" className="pt-4">
                            <div className="w-full overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Post Title</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Author</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead className="text-right">Views</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {blogPosts.map((post) => (
                                            <TableRow key={post.id}>
                                                <TableCell className="font-medium">{post.title}</TableCell>
                                                <TableCell className="text-sm text-gray-600">
                                                    <Badge variant="secondary">{post.category}</Badge>
                                                </TableCell>
                                                <TableCell className="text-sm text-gray-600">{post.author}</TableCell>
                                                <TableCell className="text-sm text-gray-600">{post.date}</TableCell>
                                                <TableCell className="text-right text-sm">{post.views.toLocaleString()}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={post.status === "published" ? "border-green-500 text-green-700" : "border-yellow-500 text-yellow-700"}
                                                    >
                                                        {post.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
