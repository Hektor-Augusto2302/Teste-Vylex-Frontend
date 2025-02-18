import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { TaskData } from "@/interfaces/ITaskData";

export const useTask = () => {
    const [tasks, setTasks] = useState<TaskData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            setError(null);

            try {
                const querySnapshot = await getDocs(collection(db, "tasks"));
                const taskList = querySnapshot.docs.map((doc) => ({ _id: doc.id, ...doc.data() })) as TaskData[];
                setTasks(taskList);
            } catch {
                setError("Erro ao buscar tarefas.");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const createTask = async (taskData: Omit<TaskData, "_id">) => {
        setLoading(true);
        setError(null);
    
        try {
            const docRef = await addDoc(collection(db, "tasks"), taskData);
            setTasks([...(tasks || []), { _id: docRef.id, ...taskData }]);
        } catch {
            setError("Erro ao criar tarefa.");
        } finally {
            setLoading(false);
        }
    };

    const updateTask = async (taskId: string, updatedData: Partial<TaskData>) => {
        setLoading(true);
        setError(null);
    
        try {
            const taskRef = doc(db, "tasks", taskId);
            await updateDoc(taskRef, updatedData);
            setTasks(
                tasks?.map((task) =>
                    task._id === taskId ? { ...task, ...updatedData } : task
                ) || []
            );
        } catch {
            setError("Erro ao atualizar a tarefa.");
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async (taskId: string) => {
        setLoading(true);
        setError(null);

        try {
            await deleteDoc(doc(db, "tasks", taskId));
            setTasks(tasks?.filter(task => task._id !== taskId) || []);
        } catch {
            setError("Erro ao excluir a tarefa.");
        } finally {
            setLoading(false);
        }
    };

    return { tasks, loading, error, createTask, updateTask, deleteTask };
};