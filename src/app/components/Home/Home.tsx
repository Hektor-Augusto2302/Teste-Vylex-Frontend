"use client";

import { useState, useEffect } from "react";
import { useTask } from "@/hooks/useTask";
import { 
    CardContainer, 
    ButtonConcluido, 
    ButtonAtualizar, 
    ButtonExcluir, 
    ButtonGroup 
} from "@/styles/Home.styles";

export default function Home() {
    const { tasks, deleteTask } = useTask();
    const [taskList, setTaskList] = useState(tasks || []);
    const [completedTasks, setCompletedTasks] = useState<string[]>([]);

    const markAsCompleted = (taskId: string) => {
        console.log("Task ID:", taskId);

        if (!completedTasks.includes(taskId)) {
            const newCompletedTasks = [...completedTasks, taskId];
            setCompletedTasks(newCompletedTasks);
            localStorage.setItem("completedTasks", JSON.stringify(newCompletedTasks));
        }
    };

    useEffect(() => {
        setTaskList(tasks || []);
    }, [tasks]);

    useEffect(() => {
        const storedCompletedTasks = localStorage.getItem("completedTasks");
        if (storedCompletedTasks) {
            const parsedCompletedTasks = JSON.parse(storedCompletedTasks);
            setCompletedTasks(parsedCompletedTasks);
            console.log("Tarefas concluídas carregadas do localStorage:", parsedCompletedTasks);
        }
    }, []);

    return (
        <div className="p-6 md:p-10 max-w-6xl mx-auto">
            {taskList && taskList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {taskList.map((task) => {
                        const taskId = task._id ?? "";

                        return (
                            taskId && !completedTasks.includes(taskId) && (
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
                            )
                        );
                    })}
                </div>
            ) : (
                <p className="text-center text-xl">Nenhuma tarefa encontrada</p>
            )}
        </div>
    );
}