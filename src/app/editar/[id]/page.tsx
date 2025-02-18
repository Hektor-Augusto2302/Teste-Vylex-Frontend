import UpdateTaskForm from "@/app/components/UpdateTask/UpdateTask";
import ProtectedRoute from "@/app/components/ProtectedRoute/ProtectedRoute";

export default function EditTaskPage() {
    return (
        <div className="flex justify-center items-center min-h-screen p-8">
            <ProtectedRoute>
                <UpdateTaskForm />
            </ProtectedRoute>
        </div>
    );
}