"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { FormContainer, Title, Input, Button, ErrorText } from "@/styles/RegisterForm.styles";

export default function RegisterForm() {
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formData.password.length < 6) {
            setError("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("As senhas não coincidem!");
            return;
        }

        try {
            await register(formData.email, formData.password);
        } catch (error: any) {
            if (error.code === "auth/email-already-in-use") {
                setError("Este e-mail já está em uso.");
            } else {
                setError("Erro ao registrar. Tente novamente.");
            }
        }
    };

    return (
        <FormContainer>
            <Title>Registro</Title>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-3"
                    required
                />
                <Input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-3"
                    required
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Senha"
                    value={formData.password}
                    onChange={handleChange}
                    className="p-3"
                    required
                />
                <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme sua senha"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="p-3"
                    required
                />
                {error && <ErrorText>{error}</ErrorText>}
                <Button type="submit" className="p-3">Registrar</Button>
            </form>
        </FormContainer>
    );
};