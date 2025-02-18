"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/entrar");
        }
    }, [user, loading, router]);

    if (loading) {
        return <p className="text-white text-center mt-20">Carregando...</p>;
    }

    return user ? <>{children}</> : null; 
}
