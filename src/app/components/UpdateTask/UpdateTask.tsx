"use client";

import { useState, useEffect } from "react";
import { useTask } from "@/hooks/useTask";
import { useParams, useRouter } from "next/navigation";
import { FormContainer, Title, Input, Button, ErrorText } from "@/styles/CreateTasks.styles";

export default function UpdateTaskForm() {
    const { updateTask, tasks } = useTask();
    const { id } = useParams();
    const router = useRouter();

    const taskToEdit = tasks?.find((task) => task._id === id);

    const [formData, setFormData] = useState({
        title: taskToEdit?.title || "",
        description: taskToEdit?.description || "",
    });

    const [error, setError] = useState("");

    useEffect(() => {
        if (taskToEdit) {
            setFormData({
                title: taskToEdit.title,
                description: taskToEdit.description,
            });
        }
    }, [taskToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.title || !formData.description) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        try {
            await updateTask(id as string, formData);
            router.push("/");
        } catch {
            setError("Erro ao buscar tarefas.");
        }
    };

    if (!taskToEdit) {
        return <div>Tarefa não encontrada</div>;
    }

    return (
        <FormContainer>
            <Title className="text-center">Atualizar Tarefa</Title>
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
                <Button type="submit" className="p-3 rounded font-semibold">
                    Atualizar
                </Button>
            </form>
        </FormContainer>
    );
};