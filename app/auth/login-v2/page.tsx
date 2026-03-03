import type { Metadata } from "next"
import { LoginFormLayout2 } from "@/components/auth/login-form-layout2"

export const metadata: Metadata = {
    title: "Sign In - CMSFullForm Dashboard",
    description: "Sign in to your CMSFullForm account",
}

export default function LoginLayout2Page() {
    return <LoginFormLayout2 />
}
