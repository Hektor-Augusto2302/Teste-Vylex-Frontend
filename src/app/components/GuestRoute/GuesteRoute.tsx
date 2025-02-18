"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface GuestRouteProps {
    children: ReactNode;
}

export default function GuestRoute({ children }: GuestRouteProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push("/");
        }
    }, [user, loading, router]);

    if (loading) {
        return <p className="text-white text-center mt-20">Carregando...</p>;
    }

    return !user ? <>{children}</> : null;
}