import React, { useEffect, useRef, useState } from 'react'
import API from '../api/api'
import QRCode from 'react-qr-code'
import anime from 'animejs'

export default function UrlCard({ url, onViewAnalytics, onDelete }) {
  const apiBase = (import.meta.env.VITE_API_BASE || '').replace(/\/?api\/?$/i, '')
  const defaultOrigin = window.location.origin
  const base = apiBase || defaultOrigin
  const shortUrl = `${base.replace(/\/$/, '')}/${url.shortId}`

  const [qrOpen, setQrOpen] = useState(false)
  const svgRef = useRef(null)
  const cardRef = useRef(null)
  const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)

  useEffect(() => {
    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        translateY: [14, 0],
        opacity: [0, 1],
        scale: [0.995, 1],
        duration: 520,
        easing: 'easeOutCubic'
      })
    }
  }, [])

  const onMove = (e) => {
    if (isTouch) return // disable tilt on touch devices
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    const rx = (-dy) * 5
    const ry = (dx) * 7
    anime.remove(el)
    anime({ targets: el, transform: `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`, duration: 200, easing: 'easeOutCubic' })
  }
  const onLeave = () => {
    const el = cardRef.current
    anime.remove(el)
    anime({ targets: el, transform: 'rotateX(0deg) rotateY(0deg) translateZ(0)', duration: 420, easing: 'easeOutCubic' })
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      anime({ targets: cardRef.current, scale: [1, 0.98, 1], duration: 260 })
      // lightweight toast can be added later
    } catch (e) { /* ignore */ }
  }

  const del = async () => {
    if (!confirm('Delete this URL?')) return
    try { await API.delete(`/url/${url._id}`); onDelete() } catch (e) { alert('Delete failed') }
  }

  const downloadQr = () => {
    try {
      const svgEl = svgRef.current?.querySelector('svg')
      if (!svgEl) return alert('QR not loaded yet')
      const svgData = new XMLSerializer().serializeToString(svgEl)
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
      const urlBlob = URL.createObjectURL(svgBlob)
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width; canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
        canvas.toBlob(blob => {
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = `shortwave-${url.shortId}.png`
          document.body.appendChild(link); link.click(); link.remove()
        })
        URL.revokeObjectURL(urlBlob)
      }
      img.onerror = () => alert('Could not convert QR to image')
      img.src = urlBlob
    } catch (e) {
      alert('Download failed')
    }
  }

  return (
    <>
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="card h-full flex flex-col justify-between"
        role="article"
        aria-label="URL card"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="card-content text-left">
            <a href={shortUrl} target="_blank" rel="noreferrer" className="font-semibold inline-block text-slate-100 hover:underline" title={shortUrl} style={{backgroundImage: 'linear-gradient(90deg,#00f5a0,#7c3aed)', WebkitBackgroundClip: 'text', color: 'transparent'}}>{shortUrl}</a>
            <p className="text-sm text-slate-300 mt-2 truncate-2">{url.longUrl}</p>
          </div>

          <div className="card-actions flex-row sm:flex-col md:flex-row gap-2">
            <button onClick={copy} className="px-3 py-2 text-sm border rounded-xl bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.04)] transition" aria-label="Copy short URL">Copy</button>
            <button onClick={() => setQrOpen(true)} className="px-3 py-2 text-sm border rounded-xl bg-[rgba(124,58,237,0.06)] hover:bg-[rgba(124,58,237,0.1)] transition" aria-label="Show QR code">QR</button>
            <button onClick={onViewAnalytics} className="px-3 py-2 text-sm border rounded-xl bg-[rgba(6,182,212,0.06)] hover:bg-[rgba(6,182,212,0.12)] transition" aria-label="View analytics">View</button>
            <button onClick={del} className="px-3 py-2 text-sm rounded-xl text-white" style={{backgroundImage:'linear-gradient(90deg,#ff6b81,#7c3aed)'}} aria-label="Delete">Delete</button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <span className="font-semibold text-slate-200">{url.clicks} clicks</span>
          </div>
          <div className="text-slate-400">{new Date(url.createdAt).toLocaleDateString()}</div>
        </div>
      </div>

      {qrOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 modal-backdrop bg-black/40" onClick={() => setQrOpen(false)} />
          <div className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 w-full max-w-sm z-10 border border-white/30" role="dialog" aria-modal="true">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-gray-800">QR Code</h4>
              <button onClick={() => setQrOpen(false)} className="text-slate-600">Close</button>
            </div>

            <div ref={svgRef} className="flex justify-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <QRCode value={shortUrl} size={180} />
            </div>

            <div className="mt-4 flex gap-3 justify-center">
              <button onClick={downloadQr} className="px-4 py-2 border rounded-lg">Download PNG</button>
              <a href={shortUrl} target="_blank" rel="noreferrer" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">Open Link</a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
