"use client";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "@/app/components/Home/Home";

export default function Dashboard() {

    return (
        <ProtectedRoute>
            <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <h1 className="text-2xl">Painel de Tarefas</h1>
                <Home />
            </div>
        </ProtectedRoute>
    );
}