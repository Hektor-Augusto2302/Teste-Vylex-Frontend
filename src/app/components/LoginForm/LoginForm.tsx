"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { FormContainer, Title, Input, Button, ErrorText } from "@/styles/LoginForm.styles";
import { FirebaseError } from "firebase/app";
import Link from "next/link";

export default function LoginForm() {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!formData.email || !formData.password) {
            setError("Por favor, preencha todos os campos.");
            return;
        }
    
        try {
            await login(formData.email, formData.password);
        } catch (error: unknown) {
            console.error(error);
    
            if (error instanceof FirebaseError) {
                if (error.code === "auth/user-not-found") {
                    setError("Usuário não encontrado. Verifique o e-mail digitado.");
                } else if (error.code === "auth/wrong-password") {
                    setError("Senha incorreta. Tente novamente.");
                } else if (error.code === "auth/invalid-email") {
                    setError("E-mail inválido. Digite um e-mail válido.");
                } else if (error.code === "auth/invalid-credential") {
                    setError("Credenciais inválidas. Verifique os dados e tente novamente.");
                } else {
                    setError("Erro ao fazer login. Tente novamente.");
                }
            } else {
                setError("Erro desconhecido. Tente novamente.");
            }
        }
    };

    return (
        <FormContainer>
            <Title className="text-center">Login</Title>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-3 rounded border"
                    required
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    value={formData.password}
                    onChange={handleChange}
                    className="p-3 rounded border"
                    required
                />
                {error && <ErrorText>{error}</ErrorText>}
                <Button type="submit" className="p-3 rounded font-semibold">
                    Entrar
                </Button>
            </form>
            <div className="mt-4 text-center">
                <span>Ainda não é cadastrado? </span>
                <Link className="font-semibold link" href="/registro">
                    Clique aqui para se registrar.
                </Link>
            </div>
        </FormContainer>
    );
};