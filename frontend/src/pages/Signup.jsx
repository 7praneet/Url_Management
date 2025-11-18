import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from '../api/api'
import anime from 'animejs'

export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const nav = useNavigate()
  const formRef = useRef(null)

  useEffect(() => {
    if (formRef.current) {
      anime({
        targets: formRef.current,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 700,
        easing: 'easeOutCubic'
      })
    }
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try{
      const res = await API.post('/auth/signup', { name, email, password })
      localStorage.setItem('sw_token', res.data.token)
      localStorage.setItem('sw_user', JSON.stringify(res.data.user))
      nav('/dashboard')
    }catch(err){
      setError(err?.response?.data?.message || 'Signup failed')
    }finally{setLoading(false)}
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{background: 'radial-gradient(900px 400px at 10% 10%, rgba(124,58,237,0.08), transparent), var(--bg-0)'}}>
      <div ref={formRef} className="max-w-md w-full bg-[rgba(255,255,255,0.03)] backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{backgroundImage: 'linear-gradient(90deg,#00f5a0,#7c3aed)', WebkitBackgroundClip: 'text', color: 'transparent'}}>Join ShortWave</h2>
          <p className="text-slate-300">Create your account to get started</p>
        </div>

        {error && (
          <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,70,97,0.12)] rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-red-300 font-medium">{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={submit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Full Name</label>
            <input
              type="text"
              required
              placeholder="Enter your full name"
              value={name}
              onChange={e=>setName(e.target.value)}
              className="w-full p-4 border border-white/6 rounded-xl bg-[rgba(255,255,255,0.02)] text-slate-100 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[rgba(124,58,237,0.18)] transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Email</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              className="w-full p-4 border border-white/6 rounded-xl bg-[rgba(255,255,255,0.02)] text-slate-100 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[rgba(124,58,237,0.18)] transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Password</label>
            <input
              type="password"
              required
              placeholder="Create a password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              className="w-full p-4 border border-white/6 rounded-xl bg-[rgba(255,255,255,0.02)] text-slate-100 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[rgba(124,58,237,0.18)] transition-all duration-200"
            />
          </div>

          <button
            className="btn btn-primary w-full supr disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Creating account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
