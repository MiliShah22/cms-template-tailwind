import type { Metadata } from "next"
import { ResetPasswordFormLayout2 } from "@/components/auth/reset-password-form-layout2"

export const metadata: Metadata = {
    title: "Reset Password - CMSFullForm Dashboard",
    description: "Choose a new password for your account",
}

export default function ResetPasswordLayout2Page() {
    return <ResetPasswordFormLayout2 />
}