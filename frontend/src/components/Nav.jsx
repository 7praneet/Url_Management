import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import anime from 'animejs'

export default function Nav(){
  const user = typeof window !== 'undefined' && localStorage.getItem('sw_user') ? JSON.parse(localStorage.getItem('sw_user')) : null
  const nav = useNavigate()
  const navRef = useRef(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (navRef.current) {
      anime({
        targets: navRef.current,
        translateY: [-18, 0],
        opacity: [0, 1],
        duration: 520,
        easing: 'easeOutCubic'
      })
    }
    // close menu on route change or escape
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const logout = ()=>{
    localStorage.removeItem('sw_token')
    localStorage.removeItem('sw_user')
    setOpen(false)
    nav('/')
  }

  return (
    <>
      <header ref={navRef} className="fixed left-0 right-0 z-50 backdrop-blur-md bg-[rgba(5,6,10,0.66)] border-b border-white/6">
        <div className="container px-4 py-3 flex items-center justify-between">
          <Link to='/' className="flex items-center gap-3">
            <div style={{width:38, height:38, borderRadius:10, backgroundImage:'linear-gradient(90deg,#00f5a0,#7c3aed)'}} />
            <span className="font-bold text-lg" style={{backgroundImage:'linear-gradient(90deg,#00f5a0,#7c3aed)', WebkitBackgroundClip:'text', color:'transparent'}}>ShortWave</span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden sm:flex items-center gap-4">
            <Link to='/' className="text-slate-200 hover:text-white font-medium transition-colors">Home</Link>
            <Link to='/dashboard' className="text-slate-200 hover:text-white font-medium transition-colors">Dashboard</Link>

            {user ? (
              <>
                <span className="text-slate-200/70 hidden lg:inline mr-3">Hi, {user.name?.split(' ')[0] || 'User'}</span>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-3 py-1 rounded-lg text-white font-medium"
                  style={{backgroundImage:'linear-gradient(90deg,#ff4d6d,#7c3aed)', boxShadow:'0 8px 26px rgba(124,58,237,0.12)'}}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to='/login' className="inline-flex items-center px-3 py-1 rounded-lg text-slate-200 hover:text-white font-medium transition-colors">Login</Link>
                <Link to='/signup' className="inline-flex items-center ml-2 px-3 py-1 rounded-lg text-white font-medium" style={{backgroundImage:'linear-gradient(90deg,#06b6d4,#7c3aed)', boxShadow:'0 8px 26px rgba(6,182,212,0.08)'}}>Sign up</Link>
              </>
            )}
          </nav>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <Link to={user ? '/dashboard' : '/login'} className="text-slate-200 mr-3 px-2 py-1 rounded-md">{user ? 'Dashboard' : 'Login'}</Link>

            <button
              onClick={() => setOpen(v => !v)}
              aria-label="Toggle menu"
              className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.03)] flex items-center justify-center text-slate-200"
            >
              {/* hamburger / close */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* spacer so fixed header doesn't overlap content */}
      <div className="app-top-space" aria-hidden="true" />

      {/* Mobile slide-down menu */}
      {open && (
        <div className="md:hidden fixed top-[72px] left-0 right-0 z-40">
          <div className="container px-4">
            <div className="bg-[rgba(6,8,15,0.9)] border border-white/6 rounded-lg p-4 shadow-lg backdrop-blur-md">
              <nav className="flex flex-col gap-3">
                <Link onClick={()=>setOpen(false)} to="/" className="text-slate-100 font-medium py-2">Home</Link>
                <Link onClick={()=>setOpen(false)} to="/dashboard" className="text-slate-100 font-medium py-2">Dashboard</Link>
                {user ? (
                  <>
                    <div className="text-slate-300 py-2">Hello, {user.name?.split(' ')[0] || 'User'}</div>
                    <button onClick={logout} className="w-full text-left px-3 py-2 rounded-lg text-white" style={{backgroundImage:'linear-gradient(90deg,#ff4d6d,#7c3aed)'}}>Logout</button>
                  </>
                ) : (
                  <>
                    <Link onClick={()=>setOpen(false)} to="/login" className="px-3 py-2 rounded-lg text-slate-100 hover:bg-white/2">Login</Link>
                    <Link onClick={()=>setOpen(false)} to="/signup" className="px-3 py-2 rounded-lg text-white" style={{backgroundImage:'linear-gradient(90deg,#06b6d4,#7c3aed)'}}>Sign up</Link>
                  </>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
