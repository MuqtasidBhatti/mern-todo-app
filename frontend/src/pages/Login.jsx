import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        if(!form.email || !form.password) {
            setError("Please fill in the fields")
            return
        }
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
        const data = await res.json()

        if (!res.ok || !data.token) {
            setError(data.message || "Invalid credentials")
            return
        }
        localStorage.setItem('token', data.token)
        navigate('/dashboard')
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
            <div className="w-full max-w-sm">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-white text-3xl font-semibold tracking-tight">Welcome back</h1>
                    <p className="text-zinc-500 text-sm mt-2">
                        Don't have an account?{' '}
                        <span
                            onClick={() => navigate('/register')}
                            className="text-white underline underline-offset-4 cursor-pointer hover:text-zinc-300 transition-colors"
                        >
                            Sign up
                        </span>
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}

                {/* Fields */}
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-zinc-400 text-xs uppercase tracking-widest">Email</label>
                        <input
                            placeholder="john@example.com"
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="bg-zinc-900 text-white text-sm px-4 py-3 rounded-lg border border-zinc-800 outline-none focus:border-zinc-500 transition-colors placeholder:text-zinc-600"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-zinc-400 text-xs uppercase tracking-widest">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="bg-zinc-900 text-white text-sm px-4 py-3 rounded-lg border border-zinc-800 outline-none focus:border-zinc-500 transition-colors placeholder:text-zinc-600"
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        className="mt-2 bg-white text-zinc-950 text-sm font-semibold py-3 rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer"
                    >
                        Login
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Login