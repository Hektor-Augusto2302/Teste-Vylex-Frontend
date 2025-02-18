"use client";

import { useState, useEffect } from "react";
import { useTask } from "@/hooks/useTask";
import { useAuth } from "@/hooks/useAuth";
import { 
    CardContainer, 
    ButtonConcluido, 
    ButtonAtualizar, 
    ButtonExcluir, 
    ButtonGroup 
} from "@/styles/Home.styles";

export default function Home() {
    const { tasks, deleteTask } = useTask();
    const { user } = useAuth();
    const [taskList, setTaskList] = useState(tasks || []);
    const [completedTasks, setCompletedTasks] = useState<string[]>([]);
    const [pendingTasks, setPendingTasks] = useState<typeof taskList>([]);

    useEffect(() => {
        if (user) {
            const userTasks = tasks?.filter(task => task.userId === user.uid) || [];
            setTaskList(userTasks);
        }
    }, [tasks, user]);

    useEffect(() => {
        const storedCompletedTasks = localStorage.getItem("completedTasks");
        if (storedCompletedTasks) {
            setCompletedTasks(JSON.parse(storedCompletedTasks));
        }
    }, []);

    useEffect(() => {
        // Filtra as tarefas que ainda não foram concluídas
        setPendingTasks(taskList.filter(task => !completedTasks.includes(task._id ?? "")));
    }, [taskList, completedTasks]);

    const markAsCompleted = (taskId: string) => {
        if (!completedTasks.includes(taskId)) {
            const newCompletedTasks = [...completedTasks, taskId];
            setCompletedTasks(newCompletedTasks);
            localStorage.setItem("completedTasks", JSON.stringify(newCompletedTasks));
        }
    };

    return (
        <div className="p-6 md:p-10 max-w-6xl mx-auto">
            {pendingTasks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pendingTasks.map((task) => {
                        const taskId = task._id ?? "";

                        return (
                            <CardContainer key={taskId}>
                                <h3>{task.title}</h3>
                                <p>{task.description}</p>
                                <ButtonGroup>
                                    <ButtonConcluido onClick={() => markAsCompleted(taskId)}>
                                        Concluído
                                    </ButtonConcluido>
                                    <ButtonAtualizar onClick={() => window.location.href = `/editar/${taskId}`}>
                                        Atualizar
                                    </ButtonAtualizar>
                                    <ButtonExcluir onClick={() => deleteTask(taskId)}>
                                        Excluir
                                    </ButtonExcluir>
                                </ButtonGroup>
                            </CardContainer>
                        );
                    })}
                </div>
            ) : (
                <p className="text-center text-xl">
                    {taskList.length > 0
                        ? "Todas as tarefas foram concluídas ou excluidas!"
                        : "Nenhuma tarefa encontrada"}
                </p>
            )}
        </div>
    );
}