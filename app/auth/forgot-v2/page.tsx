import type { Metadata } from "next"
import { ForgotFormLayout2 } from "@/components/auth/forgot-form-layout2"

export const metadata: Metadata = {
    title: "Forgot Password - CMSFullForm Dashboard",
    description: "Reset your password by entering your email",
}

export default function ForgotLayout2Page() {
    return <ForgotFormLayout2 />
}