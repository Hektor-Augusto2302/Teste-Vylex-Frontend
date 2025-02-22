"use client";

import GuestRoute from "../components/GuestRoute/GuesteRoute";
import LoginForm from "../components/LoginForm/LoginForm";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <GuestRoute>
                <LoginForm />
            </GuestRoute>
        </div>
    );
}