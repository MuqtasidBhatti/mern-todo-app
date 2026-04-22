import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const [user, setUser] = useState(null)
    const [tasks, setTasks] = useState([])
    const [form, setForm] = useState({ title: "", content: "" })
    const [error, setError] = useState("")
    const [editID, setEditId] = useState(null)
    const [editForm, setEditForm] = useState({ title: "", content: "" })

    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) { navigate('/login'); return }

        fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.json()).then(data => setUser(data.user))

        fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.json()).then(data => setTasks(data.tasks))
    }, [])

    const addTask = async () => {
        if (!form.title || !form.content) { setError("Please fill in the both fields"); return }
        if (form.title.length > 100) { setError("Title is too long"); return }
    if (form.content.length > 500) { setError("Content is too long"); return }
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        if (!res.ok || !data.task) { setError(data.message || "Fill all fields"); return }
        setTasks([...tasks, data.task])
        setForm({ title: "", content: "" })
        setError("")
    }

    const updateTask = async (id) => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify(editForm)
        })
        const data = await res.json()
        setTasks(tasks.map(task => task._id === id ? data.task : task))
        setEditId(null)
    }

    const deleteTask = async (id) => {
        await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
        setTasks(tasks.filter(task => task._id !== id))
    }

    const toggleComplete = async (id) => {
        const task = tasks.find(task => task._id === id)
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ completed: !task.completed })
        })
        const data = await res.json()
        setTasks(tasks.map(t => t._id === id ? data.task : t))
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    const completedCount = tasks.filter(t => t.completed).length

    return (
        <div className="min-h-screen bg-zinc-950 px-4 py-10">
            <div className="max-w-xl mx-auto">

                {/* Navbar */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-white text-2xl font-semibold tracking-tight">Todo App</h1>
                        {user
                            ? <p className="text-zinc-500 text-sm mt-0.5">Welcome back, <span className="text-zinc-300">{user.name}</span></p>
                            : <p className="text-zinc-600 text-sm">Loading...</p>
                        }
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-zinc-500 text-sm border border-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-900 hover:text-white transition-colors cursor-pointer"
                    >
                        Logout
                    </button>
                </div>

                {/* Stats */}
                <div className="flex gap-3 mb-8">
                    <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3">
                        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Total</p>
                        <p className="text-white text-2xl font-semibold">{tasks.length}</p>
                    </div>
                    <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3">
                        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Completed</p>
                        <p className="text-white text-2xl font-semibold">{completedCount}</p>
                    </div>
                    <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3">
                        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1">Remaining</p>
                        <p className="text-white text-2xl font-semibold">{tasks.length - completedCount}</p>
                    </div>
                </div>

                {/* Add Task */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-8">
                    <p className="text-zinc-400 text-xs uppercase tracking-widest mb-4">New Task</p>

                    {error && (
                        <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    <div className="flex flex-col gap-3">
                        <input
                            placeholder="Title"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="bg-zinc-950 text-white text-sm px-4 py-3 rounded-lg border border-zinc-800 outline-none focus:border-zinc-500 transition-colors placeholder:text-zinc-600"
                        />
                        <input
                            placeholder="Content"
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            className="bg-zinc-950 text-white text-sm px-4 py-3 rounded-lg border border-zinc-800 outline-none focus:border-zinc-500 transition-colors placeholder:text-zinc-600"
                        />
                        <button
                            onClick={addTask}
                            className="bg-white text-zinc-950 text-sm font-semibold py-3 rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer"
                        >
                            Add Task
                        </button>
                    </div>
                </div>

                {/* Task List */}
                <div className="flex flex-col gap-3">
                    {tasks.length === 0 && (
                        <p className="text-zinc-600 text-sm text-center py-10">No tasks yet. Add one above.</p>
                    )}

                    {tasks.map(task => (
                        <div
                            key={task._id}
                            className={`bg-zinc-900 border rounded-xl p-5 transition-colors ${task.completed ? 'border-zinc-700 opacity-60' : 'border-zinc-800'}`}
                        >
                            {editID === task._id ? (
                                /* Edit Mode */
                                <div className="flex flex-col gap-3">
                                    <input
                                        value={editForm.title}
                                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                        className="bg-zinc-950 text-white text-sm px-4 py-3 rounded-lg border border-zinc-700 outline-none focus:border-zinc-500 transition-colors"
                                    />
                                    <input
                                        value={editForm.content}
                                        onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                                        className="bg-zinc-950 text-white text-sm px-4 py-3 rounded-lg border border-zinc-700 outline-none focus:border-zinc-500 transition-colors"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => updateTask(task._id)}
                                            className="flex-1 bg-white text-zinc-950 text-sm font-semibold py-2 rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditId(null)}
                                            className="flex-1 text-zinc-400 text-sm border border-zinc-700 py-2 rounded-lg hover:bg-zinc-800 transition-colors  cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* View Mode */
                                <div>
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div>
                                            <h4 className={`text-sm font-semibold ${task.completed ? 'line-through text-zinc-500' : 'text-white'}`}>
                                                {task.title}
                                            </h4>
                                            <p className={`text-sm mt-1 ${task.completed ? 'text-zinc-600' : 'text-zinc-400'}`}>
                                                {task.content}
                                            </p>
                                            <p className="text-zinc-600 text-xs mt-2">
                                                {new Date(task.createdAt).toLocaleDateString(`en-us`, {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric"
                                                })}
                                            </p>

                                        </div>

                                        {/* Complete Toggle */}
                                        <button
                                            onClick={() => toggleComplete(task._id)}
                                            className={`shrink-0 w-6 h-6 rounded-full border-2 border-zinc-600 flex items-center justify-center transition-colors ${task.completed ? 'bg-white border-white' : 'border-zinc-600 hover:border-zinc-400'}`}
                                        >
                                            {task.completed && (
                                                <svg className="w-3 h-3 text-zinc-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </button>


                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => { setEditId(task._id); setEditForm({ title: task.title, content: task.content }) }}
                                            className="text-zinc-500 text-xs border border-zinc-800 px-3 py-1.5 rounded-lg hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteTask(task._id)}
                                            className="text-red-500/70 text-xs border border-red-500/20 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Dashboard