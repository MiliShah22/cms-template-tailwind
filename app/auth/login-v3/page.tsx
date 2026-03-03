import type { Metadata } from "next"
import { LoginFormLayout3 } from "@/components/auth/login-form-layout3"

export const metadata: Metadata = {
    title: "Sign In - CMSFullForm Dashboard",
    description: "Sign in to your CMSFullForm account",
}

export default function LoginLayout3Page() {
    return <LoginFormLayout3 />
}
