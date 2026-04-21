import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "" })
    const navigate = useNavigate()

    const handleSubmit = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
        const data = await res.json()
        console.log(data)
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
            <div className="w-full max-w-sm">

                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-white text-3xl font-semibold tracking-tight">Create account</h1>
                    <p className="text-zinc-500 text-sm mt-2">
                        Already have an account?{' '}
                        <span
                            onClick={() => navigate('/login')}
                            className="text-white underline underline-offset-4 cursor-pointer hover:text-zinc-300 transition-colors"
                        >
                            Sign in
                        </span>
                    </p>
                </div>

                {/* Fields */}
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-zinc-400 text-xs uppercase tracking-widest">Name</label>
                        <input
                            placeholder="John Doe"
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="bg-zinc-900 text-white text-sm px-4 py-3 rounded-lg border border-zinc-800 outline-none focus:border-zinc-500 transition-colors placeholder:text-zinc-600"
                        />
                    </div>

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
                        onClick={handleSubmit}
                        className="mt-2 bg-white text-zinc-950 text-sm font-semibold py-3 rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer"
                    >
                        Register
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Register