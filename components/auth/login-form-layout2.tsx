"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, Github, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export function LoginFormLayout2() {
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
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="w-full max-w-md">
                {/* Logo and Title */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg mb-6">
                        <span className="text-white font-bold text-2xl">C</span>
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">CMS Full Form</h1>
                    <p className="text-slate-600 dark:text-slate-400">Content Management Made Easy</p>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome back</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">Sign in to your account to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-medium">
                                Email address
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    className="pl-10 h-11 border-slate-200"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-medium">
                                    Password
                                </Label>
                                <Link href="/auth/forgot-v2" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                    Forgot?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="pl-10 pr-10 h-11 border-slate-200"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center space-x-2 pt-2">
                            <Checkbox
                                id="remember"
                                checked={formData.rememberMe}
                                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))}
                            />
                            <Label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
                                Remember me for 30 days
                            </Label>
                        </div>

                        {/* Sign In Button */}
                        <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold" disabled={isLoading}>
                            {isLoading ? "Signing in..." : "Sign in"}
                            {!isLoading && <ArrowRight className="h-4 w-4 ml-2" />}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" type="button" className="h-10">
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                        <Button variant="outline" type="button" className="h-10">
                            <Github className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Sign Up Link */}
                    <p className="text-center text-slate-600 dark:text-slate-400">
                        Don't have an account?{" "}
                        <Link href="/auth/register-v2" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold">
                            Create one
                        </Link>
                    </p>
                </div>

                {/* Footer */}
                <p className="text-center text-slate-500 text-sm mt-8">
                    <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
                        Continue as guest
                    </Link>
                </p>
            </div>
        </div>
    )
}
