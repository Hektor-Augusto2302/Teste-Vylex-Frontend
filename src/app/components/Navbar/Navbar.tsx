"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    Gestão de Tarefas
                </Link>

                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Menu size={28} />
                </button>

                <ul className={`md:flex gap-6 absolute md:static w-full md:w-auto top-16 left-0 transition-all duration-300 ease-in-out ${isOpen ? 'block bg-secondary' : 'hidden'} md:block p-4 md:p-0`}
                    style={{ backgroundColor: isOpen ? 'var(--secondary-bg)' : 'transparent' }}
                >
                    {!user ? (
                        <>
                            <li>
                                <Link href="/entrar">Entrar</Link>
                            </li>
                            <li>
                                <Link href="/registro">Registrar</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/criar">Criar Tarefa</Link>
                            </li>
                            <li>
                                <button onClick={logout}>Sair</button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}