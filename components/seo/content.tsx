import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, TrendingUp, TrendingDown, ExternalLink, Edit, Plus, Target } from "lucide-react"

const keywords = [
    { id: 1, keyword: "CMS software", position: 3, volume: 8200, difficulty: "medium", trend: "up" },
    { id: 2, keyword: "website builder", position: 5, volume: 12400, difficulty: "high", trend: "up" },
    { id: 3, keyword: "drag and drop editor", position: 2, volume: 5600, difficulty: "low", trend: "stable" },
    { id: 4, keyword: "ecommerce platform", position: 8, volume: 18900, difficulty: "high", trend: "down" },
    { id: 5, keyword: "free CMS", position: 1, volume: 9200, difficulty: "medium", trend: "up" },
]

const metaTags = [
    { id: 1, page: "Home", title: "CMSFullForm - Best CMS Platform", description: "Build beautiful websites with our easy-to-use CMS", status: "optimized" },
    { id: 2, page: "Pricing", title: "Pricing - CMSFullForm", description: "Choose the perfect plan for your needs", status: "optimized" },
    { id: 3, page: "Blog", title: "Blog - CMSFullForm", description: "", status: "missing" },
    { id: 4, page: "Contact", title: "Contact Us - CMSFullForm", description: "Get in touch with our team", status: "optimized" },
    { id: 5, page: "Features", title: "", description: "", status: "missing" },
]

const sitemap = [
    { url: "/", priority: "high", status: "indexed" },
    { url: "/about", priority: "medium", status: "indexed" },
    { url: "/pricing", priority: "high", status: "indexed" },
    { url: "/contact", priority: "medium", status: "indexed" },
    { url: "/blog", priority: "medium", status: "indexed" },
    { url: "/blog/post-1", priority: "low", status: "indexed" },
]

export function SeoContent() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                        <Search className="h-4 w-4" />
                        SEO
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Search Engine Optimization</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Monitor and improve your search engine rankings.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Search Console
                    </Button>
                    <Button size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Keyword
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Organic Traffic</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">24,500</div>
                        <p className="mt-1 text-xs text-gray-500">+18% this month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Position</CardTitle>
                        <Target className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">4.2</div>
                        <p className="mt-1 text-xs text-gray-500">-0.5 improvement</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Indexed Pages</CardTitle>
                        <Search className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">156</div>
                        <p className="mt-1 text-xs text-gray-500">All pages indexed</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">SEO Score</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">85/100</div>
                        <p className="mt-1 text-xs text-gray-500">Good - needs work</p>
                    </CardContent>
                </Card>
            </div>

            {/* SEO Details */}
            <Card>
                <CardContent className="pt-4">
                    <Tabs defaultValue="keywords" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 sm:w-auto">
                            <TabsTrigger value="keywords">Keywords</TabsTrigger>
                            <TabsTrigger value="meta">Meta Tags</TabsTrigger>
                            <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
                        </TabsList>

                        <TabsContent value="keywords" className="pt-4">
                            <div className="w-full overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Keyword</TableHead>
                                            <TableHead className="text-right">Position</TableHead>
                                            <TableHead className="text-right">Volume</TableHead>
                                            <TableHead>Difficulty</TableHead>
                                            <TableHead>Trend</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {keywords.map((kw) => (
                                            <TableRow key={kw.id}>
                                                <TableCell className="font-medium">{kw.keyword}</TableCell>
                                                <TableCell className="text-right">{kw.position}</TableCell>
                                                <TableCell className="text-right text-gray-600">{kw.volume.toLocaleString()}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            kw.difficulty === "low"
                                                                ? "border-green-500 text-green-700"
                                                                : kw.difficulty === "medium"
                                                                    ? "border-yellow-500 text-yellow-700"
                                                                    : "border-red-500 text-red-700"
                                                        }
                                                    >
                                                        {kw.difficulty}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    {kw.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                                                    {kw.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                                                    {kw.trend === "stable" && <span className="text-gray-400">-</span>}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        <TabsContent value="meta" className="pt-4">
                            <div className="w-full overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Page</TableHead>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {metaTags.map((tag) => (
                                            <TableRow key={tag.id}>
                                                <TableCell className="font-medium">{tag.page}</TableCell>
                                                <TableCell className="text-sm text-gray-600 max-w-[200px] truncate">
                                                    {tag.title || "-"}
                                                </TableCell>
                                                <TableCell className="text-sm text-gray-600 max-w-[250px] truncate">
                                                    {tag.description || "-"}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            tag.status === "optimized"
                                                                ? "border-green-500 text-green-700"
                                                                : "border-red-500 text-red-700"
                                                        }
                                                    >
                                                        {tag.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </TabsContent>

                        <TabsContent value="sitemap" className="pt-4">
                            <div className="w-full overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>URL</TableHead>
                                            <TableHead>Priority</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sitemap.map((item, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell className="font-medium">{item.url}</TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary">{item.priority}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className="border-green-500 text-green-700"
                                                    >
                                                        {item.status}
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
