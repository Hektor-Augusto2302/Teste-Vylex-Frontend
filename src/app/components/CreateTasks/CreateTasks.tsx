"use client";

import { useState, useEffect } from "react";
import { useTask } from "@/hooks/useTask";
import { FormContainer, Title, Input, Button, ErrorText } from "@/styles/CreateTasks.styles";
import { TaskData } from "@/interfaces/ITaskData";

export default function CreateTaskForm() {
    const { createTask, loading, error } = useTask();
    const [formData, setFormData] = useState<Omit<TaskData, "_id">>({
        title: "",
        description: "",
    });

    const [taskCreated, setTaskCreated] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await createTask(formData);
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
                <Button type="submit" className="p-3 rounded font-semibold" disabled={loading}>
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