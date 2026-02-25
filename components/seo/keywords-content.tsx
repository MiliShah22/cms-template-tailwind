import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, TrendingUp, TrendingDown, Plus } from "lucide-react"

const keywordsData = [
    { id: 1, keyword: "CMS software", position: 3, change: 2, volume: 12100, difficulty: "medium", pages: 5 },
    { id: 2, keyword: "best CMS platform", position: 8, change: -1, volume: 5400, difficulty: "hard", pages: 3 },
    { id: 3, keyword: "website builder", position: 12, change: 3, volume: 22100, difficulty: "very hard", pages: 8 },
    { id: 4, keyword: "CMS for small business", position: 5, change: 0, volume: 8100, difficulty: "medium", pages: 4 },
    { id: 5, keyword: "open source CMS", position: 15, change: 5, volume: 6600, difficulty: "hard", pages: 2 },
    { id: 6, keyword: "enterprise CMS", position: 22, change: -3, volume: 3900, difficulty: "very hard", pages: 6 },
    { id: 7, keyword: "headless CMS", position: 18, change: 1, volume: 4800, difficulty: "hard", pages: 3 },
    { id: 8, keyword: "CMS comparison", position: 7, change: 2, volume: 3200, difficulty: "medium", pages: 4 },
]

export function SeoKeywordsContent() {
    const top3 = keywordsData.filter(k => k.position <= 3).length
    const top10 = keywordsData.filter(k => k.position <= 10).length
    const avgPosition = keywordsData.reduce((acc, k) => acc + k.position, 0) / keywordsData.length

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                        <Search className="h-4 w-4" />
                        SEO
                    </div>
                    <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">Keywords</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Track keyword rankings and search performance.
                    </p>
                </div>
                <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Keyword
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Keywords</CardTitle>
                        <Search className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{keywordsData.length}</div>
                        <p className="mt-1 text-xs text-gray-500">Tracked</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Top 3</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{top3}</div>
                        <p className="mt-1 text-xs text-gray-500">Rankings</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Top 10</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{top10}</div>
                        <p className="mt-1 text-xs text-gray-500">Rankings</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Position</CardTitle>
                        <Search className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold">{avgPosition.toFixed(1)}</div>
                        <p className="mt-1 text-xs text-gray-500">Position</p>
                    </CardContent>
                </Card>
            </div>

            {/* Keywords Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Keyword Rankings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Keyword</TableHead>
                                    <TableHead>Position</TableHead>
                                    <TableHead>Change</TableHead>
                                    <TableHead>Volume</TableHead>
                                    <TableHead>Difficulty</TableHead>
                                    <TableHead>Pages</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {keywordsData.map((keyword) => (
                                    <TableRow key={keyword.id}>
                                        <TableCell className="font-medium">{keyword.keyword}</TableCell>
                                        <TableCell>
                                            <Badge variant={keyword.position <= 3 ? "default" : "secondary"} className={keyword.position <= 3 ? "bg-green-500" : ""}>
                                                #{keyword.position}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                {keyword.change > 0 ? (
                                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                                ) : keyword.change < 0 ? (
                                                    <TrendingDown className="h-4 w-4 text-red-500" />
                                                ) : null}
                                                <span className={keyword.change > 0 ? "text-green-500" : keyword.change < 0 ? "text-red-500" : ""}>
                                                    {keyword.change > 0 ? "+" : ""}{keyword.change}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600">{keyword.volume.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={
                                                keyword.difficulty === "easy" ? "border-green-500 text-green-500" :
                                                    keyword.difficulty === "medium" ? "border-amber-500 text-amber-500" :
                                                        keyword.difficulty === "hard" ? "border-red-500 text-red-500" :
                                                            "border-red-700 text-red-700"
                                            }>
                                                {keyword.difficulty}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600">{keyword.pages}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
