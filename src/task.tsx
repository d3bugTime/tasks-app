import { useState, type FormEvent } from "react";

interface Task {
    id: number;
    text: string;
    done: boolean;
}

const initialTasks: Task[] = [
    { id: 1, text: "Sketch the layout", done: true },
    { id: 2, text: "Write the proposal", done: false },
    { id: 3, text: "Send invoice", done: false },
];

export default function TaskApp() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [draft, setDraft] = useState<string>("");

    const addTask = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const text = draft.trim();
        if (!text) return;
        setTasks([{ id: Date.now(), text, done: false }, ...tasks]);
        setDraft("");
    };

    const toggleTask = (id: number) =>
        setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

    const removeTask = (id: number) => setTasks(tasks.filter((t) => t.id !== id));

    const remaining = tasks.filter((t) => !t.done).length;

    return (
        <div className="min-h-screen w-full flex justify-center bg-stone-100 px-4 py-16">
            <div className="w-full max-w-md">
                <div className="flex items-baseline justify-between mb-6">
                    <h1 className="text-2xl font-serif text-stone-900">Today</h1>
                    <span className="text-sm text-stone-500">
            {remaining} left
          </span>
                </div>

                <form onSubmit={addTask} className="flex gap-2 mb-6">
                    <input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="Add a task"
                        className="flex-1 bg-white border border-stone-300 rounded-md px-3 py-2 text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-500"
                    />
                    <button
                        type="submit"
                        className="bg-emerald-900 text-white rounded-md px-4 py-2 text-sm hover:bg-emerald-700 active:scale-95 transition"
                    >
                        Add
                    </button>
                </form>

                <ul className="space-y-1">
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            className="group flex items-center gap-3 bg-white border border-stone-200 rounded-md px-3 py-2"
                        >
                            <button
                                onClick={() => toggleTask(task.id)}
                                aria-label={task.done ? "Mark as not done" : "Mark as done"}
                                className={`w-5 h-5 shrink-0 rounded-full border flex items-center justify-center transition ${
                                    task.done
                                        ? "bg-stone-900 border-stone-900"
                                        : "border-stone-400"
                                }`}
                            >
                                {task.done && (
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-3 h-3 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                    >
                                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </button>

                            <span
                                className={`flex-1 text-sm ${
                                    task.done ? "line-through text-stone-400" : "text-stone-800"
                                }`}
                            >
                {task.text}
              </span>

                            <button
                                onClick={() => removeTask(task.id)}
                                aria-label="Delete task"
                                className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-stone-700 transition text-sm"
                            >
                                remove
                            </button>
                        </li>
                    ))}

                    {tasks.length === 0 && (
                        <li className="text-sm text-stone-400 text-center py-8">
                            Nothing here yet.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}