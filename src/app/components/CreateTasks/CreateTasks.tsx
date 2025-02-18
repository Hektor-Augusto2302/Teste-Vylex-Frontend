"use client";

import { useState, useEffect } from "react";
import { useTask } from "@/hooks/useTask";
import { useAuth } from "@/hooks/useAuth"; // 🔹 Importa o hook de autenticação
import { FormContainer, Title, Input, Button, ErrorText } from "@/styles/CreateTasks.styles";
import { TaskData } from "@/interfaces/ITaskData";

export default function CreateTaskForm() {
    const { createTask, loading, error } = useTask();
    const { user } = useAuth(); // 🔹 Obtém o usuário logado
    const [formData, setFormData] = useState<Omit<TaskData, "_id" | "userId">>({
        title: "",
        description: "",
    });

    const [taskCreated, setTaskCreated] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) return;

        await createTask(formData, user.uid);
        setTaskCreated(true);
    };

    useEffect(() => {
        if (taskCreated && !loading) {
            window.location.href = "/";
        }
    }, [taskCreated, loading]);

    return (
        <FormContainer>
            <Title className="text-center">Criar Tarefa</Title>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                    type="text"
                    name="title"
                    placeholder="Título"
                    value={formData.title}
                    onChange={handleChange}
                    className="p-3 rounded border"
                    required
                />
                <Input
                    type="text"
                    name="description"
                    placeholder="Descrição"
                    value={formData.description}
                    onChange={handleChange}
                    className="p-3 rounded border"
                    required
                />
                {error && <ErrorText>{error}</ErrorText>}
                <Button type="submit" className="p-3 rounded font-semibold" disabled={loading || !user}>
                    {loading ? "Criando..." : "Criar Tarefa"}
                </Button>
            </form>
            {taskCreated && !loading && (
                <p className="text-center text-green-500 font-semibold mt-4">
                    Tarefa criada com sucesso!
                </p>
            )}
        </FormContainer>
    );
}