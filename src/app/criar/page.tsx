"use client";

import CreateTasks from "../components/CreateTasks/CreateTasks";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

export default function CreatePage() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <ProtectedRoute>
                <CreateTasks />
            </ProtectedRoute>
        </div>
    );
}