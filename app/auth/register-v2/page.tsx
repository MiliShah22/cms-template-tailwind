import type { Metadata } from "next"
import { RegisterFormLayout2 } from "@/components/auth/register-form-layout2"

export const metadata: Metadata = {
    title: "Sign Up - CMSFullForm Dashboard",
    description: "Create an account on CMSFullForm",
}

export default function RegisterLayout2Page() {
    return <RegisterFormLayout2 />
}