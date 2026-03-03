"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export function LoginFormLayout3() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsLoading(false)
        window.location.href = "/dashboard"
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-2 gap-0">
            {/* Left Side - Dashboard Illustration */}
            <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
                {/* Decorative animated circles */}
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-400/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />

                {/* Dashboard SVG Mockup */}
                <svg
                    viewBox="0 0 480 540"
                    className="w-full h-full max-w-lg max-h-96 relative z-10"
                    style={{ filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))" }}
                >
                    {/* Background */}
                    <rect width="480" height="540" fill="#f8fafc" rx="12" />

                    {/* Header */}
                    <defs>
                        <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#1e40af" />
                        </linearGradient>
                        <filter id="shadow">
                            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
                        </filter>
                    </defs>

                    {/* Header Bar */}
                    <rect width="480" height="60" fill="url(#headerGrad)" filter="url(#shadow)" />

                    {/* Header Logo */}
                    <rect x="16" y="16" width="28" height="28" fill="#ffffff" opacity="0.9" rx="4" />
                    <text x="32" y="37" fontSize="16" fontWeight="bold" fill="#1e40af" textAnchor="middle">
                        C
                    </text>

                    {/* Header Title */}
                    <text x="58" y="40" fontSize="14" fontWeight="600" fill="#ffffff">
                        CMS Dashboard
                    </text>

                    {/* Header Actions */}
                    <circle cx="448" cy="30" r="12" fill="#ffffff" opacity="0.2" />
                    <circle cx="428" cy="30" r="12" fill="#ffffff" opacity="0.2" />

                    {/* Sidebar */}
                    <rect x="0" y="60" width="80" height="480" fill="#1e293b" />

                    {/* Sidebar Items */}
                    {[0, 1, 2, 3, 4].map((i) => (
                        <g key={`sidebar-${i}`}>
                            <rect x="12" y={80 + i * 60} width="56" height="44" fill={i === 0 ? "#3b82f6" : "#334155"} rx="6" opacity={i === 0 ? 1 : 0.5} />
                            <circle cx="40" cy={102 + i * 60} r="6" fill="#ffffff" opacity={i === 0 ? 1 : 0.4} />
                        </g>
                    ))}

                    {/* Main Content Area */}
                    <g transform="translate(90, 70)">
                        {/* Stats Cards */}
                        {[
                            { x: 0, title: "Total Users", value: "2,543", color: "#3b82f6" },
                            { x: 110, title: "Revenue", value: "$45.2K", color: "#10b981" },
                            { x: 220, title: "Orders", value: "1,234", color: "#f59e0b" },
                        ].map((stat, i) => (
                            <g key={`stat-${i}`}>
                                <rect x={stat.x} y="0" width="100" height="70" fill="#f1f5f9" rx="8" filter="url(#shadow)" />
                                <rect x={stat.x} y="0" width="100" height="6" fill={stat.color} rx="8 8 0 0" />
                                <text x={stat.x + 50} y="25" fontSize="11" fill="#64748b" textAnchor="middle" fontWeight="500">
                                    {stat.title}
                                </text>
                                <text x={stat.x + 50} y="50" fontSize="18" fill="#1e293b" textAnchor="middle" fontWeight="bold">
                                    {stat.value}
                                </text>
                            </g>
                        ))}
                    </g>

                    {/* Chart Area */}
                    <g transform="translate(90, 150)">
                        <rect width="370" height="120" fill="#f1f5f9" rx="8" filter="url(#shadow)" />

                        {/* Chart Title */}
                        <text x="10" y="20" fontSize="12" fontWeight="600" fill="#1e293b">
                            Sales Overview
                        </text>

                        {/* Chart Bars */}
                        {[10, 25, 35, 28, 42, 38, 45].map((height, i) => (
                            <rect
                                key={`bar-${i}`}
                                x={20 + i * 48}
                                y={100 - (height * 70) / 50}
                                width="38"
                                height={(height * 70) / 50}
                                fill="#3b82f6"
                                rx="2"
                                opacity="0.8"
                            />
                        ))}

                        {/* X-axis labels */}
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                            <text key={`label-${i}`} x={57 + i * 48} y="115" fontSize="10" fill="#94a3b8" textAnchor="middle">
                                {day}
                            </text>
                        ))}
                    </g>

                    {/* Table Area */}
                    <g transform="translate(90, 280)">
                        <rect width="370" height="110" fill="#f1f5f9" rx="8" filter="url(#shadow)" />

                        {/* Table Header */}
                        <rect width="370" height="28" fill="#e2e8f0" rx="8 8 0 0" />
                        <text x="12" y="20" fontSize="11" fontWeight="600" fill="#1e293b">
                            Recent Orders
                        </text>

                        {/* Table Rows */}
                        {[0, 1, 2].map((i) => (
                            <g key={`row-${i}`}>
                                <line x1="12" y1={28 + (i + 1) * 24} x2="358" y2={28 + (i + 1) * 24} stroke="#cbd5e1" strokeWidth="1" />
                                <circle cx="20" cy={40 + i * 24} r="4" fill="#10b981" opacity="0.6" />
                                <text x="32" y="45" fontSize="10" fill="#475569">
                                    Order #{1234 + i}
                                </text>
                                <text x="320" y="45" fontSize="9" fill="#94a3b8">
                                    $245
                                </text>
                            </g>
                        ))}
                    </g>
                </svg>
            </div>

            {/* Right Side - Form */}
            <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900">
                <div className="w-full max-w-sm text-slate-900 dark:text-slate-100">
                    {/* Mobile Logo */}
                    <div className="lg:hidden text-center mb-12">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-lg mb-6">
                            <span className="text-white font-bold text-2xl">C</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">CMS Full Form</h1>
                    </div>

                    {/* Form Header */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
                        <p className="text-slate-600 dark:text-slate-400">Sign in to your account</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div className="space-y-3">
                            <Label htmlFor="email" className="text-slate-900 dark:text-slate-100 font-semibold text-sm">
                                Email
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    className="pl-12 h-12 border-2 border-slate-200 hover:border-slate-300 focus:border-blue-500 rounded-lg"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password" className="text-slate-900 dark:text-slate-100 font-semibold text-sm">
                                    Password
                                </Label>
                                <Link href="/auth/forgot-v2" className="text-sm text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400 font-medium">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="pl-12 pr-12 h-12 border-2 border-slate-200 hover:border-slate-300 focus:border-blue-500 rounded-lg"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                                />
                                <button
                                    type="button"
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember */}
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={formData.rememberMe}
                                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))}
                            />
                            <Label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400">
                                Keep me signed in
                            </Label>
                        </div>

                        {/* Sign In Button */}
                        <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold" disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-slate-700" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-3 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">Or</span>
                        </div>
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                        <Button variant="outline" type="button" className="h-11">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                        </Button>
                        <Button variant="outline" type="button" className="h-11">
                            <Github className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Sign Up Link */}
                    <p className="text-center text-slate-600 dark:text-slate-400">
                        New to CMS Full Form?{" "}
                        <Link href="/auth/register-v2" className="text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-400 font-semibold">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
