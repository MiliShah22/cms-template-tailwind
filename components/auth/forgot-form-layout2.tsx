"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"

export function ForgotFormLayout2() {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [email, setEmail] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsLoading(false)
        setIsSuccess(true)
    }

    const handleResendEmail = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 space-y-6">
                    {!isSuccess ? (
                        <>
                            <div className="text-center">
                                <h2 className="text-2xl font-bold mb-2">Forgot your password?</h2>
                                <p className="text-slate-600 dark:text-slate-400">No worries! Enter your email and we'll send a reset link.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            className="pl-10"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Sending reset link..." : "Send reset link"}
                                </Button>
                            </form>

                            <div className="text-center">
                                <Link
                                    href="/auth/login-v2"
                                    className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to sign in
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-6 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>

                            <h2 className="text-2xl font-bold mb-2">Check your email</h2>
                            <p className="text-slate-600 dark:text-slate-400">
                                We've sent a password reset link to <strong>{email}</strong>
                            </p>

                            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 text-left">
                                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">What's next?</h3>
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs font-medium text-blue-600">1</span>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Check your email inbox (and spam folder)</p>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs font-medium text-blue-600">2</span>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Click the reset password link in the email</p>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <span className="text-xs font-medium text-blue-600">3</span>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Create a new password and sign in</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleResendEmail}
                                    disabled={isLoading}
                                    className="w-full bg-transparent"
                                >
                                    {isLoading ? "Resending..." : "Resend email"}
                                </Button>

                                <Link
                                    href="/auth/login-v2"
                                    className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to sign in
                                </Link>
                            </div>

                            <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                                <div className="flex items-center justify-center space-x-6 text-sm text-slate-500 dark:text-slate-400">
                                    <div className="flex items-center space-x-2">
                                        <span>Link expires in 24h</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span>Secure & encrypted</span>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">
                                    Need help?{' '}
                                    <Link href="/support" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200">
                                        Contact support
                                    </Link>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}