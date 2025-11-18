import React, { useState, useRef, useEffect } from 'react'
import API from '../api/api'
import anime from 'animejs'

export default function ShortenForm(){
  const [longUrl, setLongUrl] = useState('')
  const [alias, setAlias] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(null)
  const btnRef = useRef(null)
  const toastRef = useRef(null)
  const formRef = useRef(null)

  useEffect(() => {
    if (formRef.current) {
      anime({
        targets: formRef.current,
        translateY: [18, 0],
        opacity: [0, 1],
        duration: 520,
        easing: 'easeOutCubic'
      })
    }
  }, [])

  const animateButtonRipple = (x, y) => {
    const btn = btnRef.current
    if (!btn) return
    const ripple = document.createElement('span')
    ripple.style.position = 'absolute'
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.style.width = ripple.style.height = '12px'
    ripple.style.borderRadius = '50%'
    ripple.style.background = 'rgba(255,255,255,0.6)'
    ripple.style.transform = 'translate(-50%,-50%)'
    ripple.style.pointerEvents = 'none'
    btn.appendChild(ripple)
    anime({
      targets: ripple,
      width: ['12px', '280px'],
      height: ['12px', '280px'],
      opacity: [0.9, 0],
      easing: 'easeOutQuad',
      duration: 700,
      complete: () => ripple.remove()
    })
  }

  const submit = async (e) => {
    e?.preventDefault()
    setMsg(null)
    setLoading(true)
    try{
      const res = await API.post('/url', { longUrl, alias: alias || undefined })
      const base = (import.meta.env.VITE_API_BASE || '').replace(/\/?api\/?$/i, '') || window.location.origin
      const newShort = `${base.replace(/\/$/, '')}/${res.data.shortId}`
      setMsg({ type: 'success', text: `Short URL created: ${newShort}`, shortUrl: newShort })
      setLongUrl(''); setAlias('')

      if (toastRef.current) {
        toastRef.current.classList.remove('opacity-0')
        anime.timeline().add({ targets: toastRef.current, translateY: [-12,0], opacity: [0,1], duration: 380, easing: 'easeOutCubic' })
      }
      if (btnRef.current) {
        btnRef.current.classList.add('gradient-slide')
        setTimeout(()=> btnRef.current.classList.remove('gradient-slide'), 1300)
        anime({ targets: btnRef.current, scale: [1, 0.985, 1], duration: 320, easing: 'easeOutQuad' })
      }
    }catch(err){
      setMsg({ type: 'error', text: err?.response?.data?.message || 'Failed to create short URL' })
    }finally{ setLoading(false) }
  }

  const onBtnClick = (ev) => {
    const rect = ev.currentTarget.getBoundingClientRect()
    const x = ev.clientX - rect.left
    const y = ev.clientY - rect.top
    animateButtonRipple(x, y)
  }

  return (
    <div className="relative">
      <form ref={formRef} onSubmit={submit} className="flex gap-3 flex-col sm:flex-row items-stretch bg-[rgba(255,255,255,0.02)] backdrop-blur-sm p-4 rounded-2xl border border-white/6">
        <input className="flex-1 p-3 border border-white/6 rounded-xl bg-transparent placeholder-slate-400 text-slate-100" placeholder="Paste your long URL here..." required value={longUrl} onChange={e=>setLongUrl(e.target.value)} />
        <input className="w-48 p-3 border border-white/6 rounded-xl bg-transparent placeholder-slate-400 text-slate-100" placeholder="Custom alias (optional)" value={alias} onChange={e=>setAlias(e.target.value)} />
        <div ref={btnRef} className="relative">
          <button onClick={onBtnClick} className="shorten-btn px-5 py-3 rounded-xl font-semibold" disabled={loading}>{loading ? 'Shortening...' : 'Shorten URL'}</button>
        </div>
      </form>

      <div ref={toastRef} className="mt-3 sw-toast opacity-0">
        {msg && (
          <div className={`${msg.type==='success' ? 'bg-[rgba(0,0,0,0.45)] border border-[rgba(124,58,237,0.12)]' : 'bg-[rgba(0,0,0,0.45)] border border-[rgba(255,70,97,0.12)]'} rounded-xl p-3`}>
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${msg.type==='success' ? 'bg-green-500' : 'bg-red-500'}`}>
                {msg.type==='success' ? (
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                )}
              </div>

                <div className="text-sm font-medium" style={{ color: msg.type==='success' ? '#059669' : '#dc2626' }}>
                  {msg.text}
                  {msg.shortUrl && (
                    <div className="mt-2 flex items-center gap-2">
                      <a href={msg.shortUrl} target="_blank" rel="noreferrer" className="text-blue-400 underline truncate">{msg.shortUrl}</a>
                      <button onClick={async()=>{await navigator.clipboard.writeText(msg.shortUrl)}} className="px-2 py-1 text-xs border rounded">Copy</button>
                    </div>
                  )}
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
