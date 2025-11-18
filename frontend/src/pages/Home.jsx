import React, { useEffect, useRef } from 'react'
import ShortenForm from '../components/ShortenForm'
import anime from 'animejs'

export default function Home(){
  const heroRef = useRef(null)
  const featuresRef = useRef(null)

  useEffect(() => {
    // Hero animation
    if (heroRef.current) {
      anime.timeline()
        .add({
          targets: heroRef.current.querySelector('h1'),
          translateY: [30, 0],
          opacity: [0, 1],
          duration: 800,
          easing: 'easeOutCubic'
        })
        .add({
          targets: heroRef.current.querySelector('p'),
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 600,
          easing: 'easeOutCubic'
        }, '-=400')
        .add({
          targets: heroRef.current.querySelector('.shorten-form'),
          translateY: [20, 0],
          opacity: [0, 1],
          duration: 600,
          easing: 'easeOutCubic'
        }, '-=300')
    }

    // Features animation
    if (featuresRef.current) {
      const featureCards = featuresRef.current.querySelectorAll('.feature-card')
      anime({
        targets: featureCards,
        translateY: [40, 0],
        opacity: [0, 1],
        scale: [0.95, 1],
        delay: anime.stagger(200),
        duration: 700,
        easing: 'easeOutCubic'
      })
    }
  }, [])

  return (
    <div className="py-20">
      <section ref={heroRef} className="relative text-center max-w-4xl mx-auto p-10 bg-[rgba(255,255,255,0.03)] backdrop-blur-md rounded-3xl shadow-2xl border border-white/6 overflow-hidden">
        <svg className="absolute -top-20 -left-40 opacity-20" width="420" height="420" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(200,200)">
            <path d="M80 -120C120 -80 160 -40 160 0C160 40 120 80 80 120C40 160 0 160 -40 140C-80 120 -120 80 -140 40C-160 0 -160 -40 -140 -80C-120 -120 -80 -160 -40 -160C0 -160 40 -140 80 -120Z" fill="#7c3aed" />
          </g>
        </svg>

        <h1 className="text-5xl font-extrabold mb-4 leading-tight" style={{backgroundImage: 'linear-gradient(90deg,#00f5a0,#7c3aed)', WebkitBackgroundClip: 'text', color: 'transparent'}}>
          ShortWave — fast, beautiful URL shortening
        </h1>
        <p className="text-slate-300 mb-8 text-lg">Shorten links, manage them per user, and view basic analytics — now with QR codes and delightful UI.</p>

        <div className="shorten-form mx-auto max-w-3xl">
          <ShortenForm />
          <div className="mt-4">
            <button onClick={() => window.scrollTo({ top: document.body.scrollTop + 400, behavior: 'smooth' })} className="mt-3 px-6 py-3 shorten-btn rounded-xl font-semibold">Get Started</button>
          </div>
        </div>
      </section>

      <section ref={featuresRef} className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="feature-card p-8 bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-2xl shadow-2xl border border-white/6 hover:shadow-[0_30px_80px_rgba(12,14,20,0.7)] transition-all duration-300 hover:-translate-y-1">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-bold text-xl mb-3 text-slate-100">Lightning Fast</h3>
          <ul className="text-slate-300 space-y-2">
            <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>Quick short links with nanoid</li>
            <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>Optional custom aliases</li>
            <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>Instant URL shortening</li>
          </ul>
        </div>
        <div className="feature-card p-8 bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-2xl shadow-2xl border border-white/6 hover:shadow-[0_30px_80px_rgba(12,14,20,0.7)] transition-all duration-300 hover:-translate-y-1">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="font-bold text-xl mb-3 text-slate-100">Smart Analytics</h3>
          <ol className="text-slate-300 space-y-2">
            <li className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>Per-user dashboard</li>
            <li className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>Click tracking & history</li>
            <li className="flex items-center"><span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>Beautiful data visualizations</li>
          </ol>
        </div>
      </section>

      <section className="mt-16 text-center">
        <div className="inline-block p-8" style={{backgroundImage: 'linear-gradient(90deg,#00f5a0,#7c3aed)', borderRadius: '20px', color: 'white', boxShadow: '0 30px 80px rgba(124,58,237,0.18)'}}>
          <h3 className="text-2xl font-bold mb-2">Ready to get started?</h3>
          <p className="text-blue-50 mb-4">Join thousands of users shortening URLs with style</p>
          <div className="flex justify-center space-x-4">
            <div className="w-3 h-3 bg-white/30 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
            <div className="w-3 h-3 bg-white/50 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <div className="w-3 h-3 bg-white/70 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </section>
    </div>
  )
}
