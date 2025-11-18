import React, { useEffect, useState, useRef } from 'react'
import API from '../api/api'
import UrlCard from '../components/UrlCard'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import anime from 'animejs'

export default function Dashboard(){
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedHistory, setSelectedHistory] = useState([])
  const containerRef = useRef()
  const headerRef = useRef()
  const chartRef = useRef()

  useEffect(()=>{
    const load = async ()=>{
      try{
        const res = await API.get('/url/me')
        setUrls(res.data)
      }catch(err){ console.error(err) }
      setTimeout(()=> setLoading(false), 300)
    }
    load()
  },[])

  useEffect(()=>{
    if (headerRef.current) {
      anime({
        targets: headerRef.current,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 520,
        easing: 'easeOutCubic'
      })
    }
  }, [])

  useEffect(()=>{
    if(!containerRef.current) return
    const cards = containerRef.current.querySelectorAll('.card')
    anime.remove(cards)
    anime({
      targets: cards,
      translateY: [18, 0],
      opacity: [0, 1],
      scale: [0.985, 1],
      delay: anime.stagger(80),
      easing: 'easeOutCubic',
      duration: 460
    })
  },[urls, loading])

  useEffect(() => {
    if (chartRef.current && selectedHistory.length > 0) {
      anime({
        targets: chartRef.current,
        translateY: [18, 0],
        opacity: [0, 1],
        duration: 460,
        easing: 'easeOutCubic'
      })
    }
  }, [selectedHistory])

  const onViewAnalytics = (history) => {
    const chart = (history || []).map(h=>({ date: new Date(h.date).toLocaleDateString(), count: h.count }))
    setSelectedHistory(chart)
  }

  const skeletons = new Array(6).fill(0)

  return (
    <div className="space-y-8">
      <div ref={headerRef} className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent" style={{backgroundImage:'linear-gradient(90deg,#00f5a0,#7c3aed)'}}>Your URLs</h2>
          <p className="text-slate-400 mt-2">Manage and track your shortened links</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-100">{urls.length}</div>
          <div className="text-sm text-slate-400">Total URLs</div>
        </div>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {loading ? (
          skeletons.map((_, i) => (
            <div key={i} className="card-wrapper h-full">
              <div className="card h-full">
                <div className="h-28 skeleton rounded-xl mb-4"></div>
                <div className="h-12 skeleton rounded-lg"></div>
              </div>
            </div>
          ))
        ) : urls.length===0 ? (
          <div className="col-span-full p-12 bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-2xl shadow-lg border border-white/6 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">No URLs yet</h3>
            <p className="text-slate-400">Create your first shortened link from the homepage!</p>
          </div>
        ) : (
          urls.map(u => (
            <div key={u._id} className="card-wrapper h-full">
              <div className="card h-full flex flex-col justify-between">
                <UrlCard
                  url={u}
                  onViewAnalytics={() => onViewAnalytics(u.clickHistory)}
                  onDelete={() => setUrls(prev => prev.filter(x => x._id !== u._id))}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {selectedHistory.length > 0 && (
        <div ref={chartRef} className="p-6 bg-[rgba(255,255,255,0.02)] backdrop-blur-sm rounded-2xl shadow-xl border border-white/6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-100">Clicks over time</h3>
          </div>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <LineChart data={selectedHistory}>
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(6,8,15,0.95)', border: 'none', borderRadius: 12, boxShadow: '0 10px 25px rgba(0,0,0,0.4)' }} />
                <Line type="monotone" dataKey="count" stroke="#06b6d4" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-slate-400 mt-4 text-center">Click "View" on any URL card to update this chart</p>
        </div>
      )}
    </div>
  )
}
