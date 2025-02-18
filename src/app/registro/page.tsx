"use client";

import GuestRoute from "../components/GuestRoute/GuesteRoute";
import RegisterForm from "../components/RegisterForm/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <GuestRoute>
                <RegisterForm />
            </GuestRoute>
        </div>
    );
}