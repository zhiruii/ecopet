import { useState } from 'react'
import { Recycle, Coins, ScanLine, X } from 'lucide-react'
import type { Screen } from '../App'
import { usePetStore } from '../store/usePetStore'
import { useProgressStore } from '../store/useProgressStore'
import { itemsThisWeek } from '../features/impact/metrics'
import { Pet } from '../pet/Pet'
import { usePetReaction } from '../pet/animations/usePetReaction'
import { Button } from '../components/Button'
import { ProgressBar } from '../components/ProgressBar'
import { ListItem } from '../components/ListItem'

interface HomeProps {
  onNavigate: (screen: Screen) => void
}

/** Small SVG bird silhouette — a simple "V" gull shape */
function Bird({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 12" fill="none" className={className}>
      <path
        d="M0 8 Q6 0 12 6 Q18 0 24 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export function Home({ onNavigate }: HomeProps) {
  const { species, name, hunger } = usePetStore()
  const { credits, scans, baseline } = useProgressStore()
  const { reaction, triggerReaction } = usePetReaction()
  const [showRecyclePopup, setShowRecyclePopup] = useState(false)

  if (!species) return null

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const scansToday = scans.filter((s) => s.timestamp >= todayStart.getTime()).length

  const thisWeek = itemsThisWeek(scans)
  const target = baseline && baseline > 0 ? baseline : 5
  const progressPct = Math.min(100, (thisWeek / target) * 100)

  const displayMood = scansToday > 0 ? 'happy' : hunger < 30 ? 'sad' : 'idle'

  return (
    <div className="mx-auto flex h-[100dvh] max-w-[430px] flex-col overflow-hidden relative"
         style={{ background: 'linear-gradient(to bottom, #4A9FD8 0%, #7EC8E8 40%, #B5E0F0 70%, #D4EDF5 100%)' }}>

      {/* ═══ Background Environment ═══ */}
      <div className="absolute inset-0 z-0 pointer-events-none flex flex-col overflow-hidden">

        {/* Sky / Distant Campus */}
        <div className="flex-[3] relative">

          {/* Sun — warm gradient with golden glow */}
          <div
            className="absolute top-10 right-14 w-20 h-20 rounded-full"
            style={{
              background: 'radial-gradient(circle, #FFF8DC 0%, #FFE082 40%, #FFD25A 100%)',
              boxShadow: '0 0 60px 20px rgba(255,224,130,0.45), 0 0 120px 40px rgba(255,210,90,0.2)',
            }}
          />

          {/* Clouds — organic multi-blob clusters with float animation */}
          {/* Cloud cluster 1 (left) */}
          <div className="absolute top-16 left-4 animate-float-slow">
            <div className="relative w-40 h-16">
              <div className="absolute bottom-0 left-4 w-28 h-10 bg-white/65 rounded-full" />
              <div className="absolute bottom-2 left-0 w-16 h-14 bg-white/55 rounded-full" />
              <div className="absolute bottom-3 left-14 w-18 h-12 bg-white/70 rounded-full" />
            </div>
          </div>
          {/* Cloud cluster 2 (right) */}
          <div className="absolute top-6 right-36 animate-float-medium">
            <div className="relative w-28 h-12">
              <div className="absolute bottom-0 left-2 w-20 h-8 bg-white/50 rounded-full" />
              <div className="absolute bottom-1 left-0 w-12 h-10 bg-white/45 rounded-full" />
              <div className="absolute bottom-2 left-10 w-14 h-8 bg-white/55 rounded-full" />
            </div>
          </div>
          {/* Cloud cluster 3 (center-low) */}
          <div className="absolute top-28 left-1/2 -translate-x-1/2" style={{ animation: 'float-slow 35s linear infinite' }}>
            <div className="relative w-24 h-8">
              <div className="absolute bottom-0 left-2 w-16 h-6 bg-white/40 rounded-full" />
              <div className="absolute bottom-0 left-0 w-10 h-7 bg-white/35 rounded-full" />
            </div>
          </div>

          {/* Birds in the sky */}
          <Bird className="absolute top-14 left-[30%] w-5 h-2.5 text-[var(--ink)]/25"
                style={{ animation: 'bird-drift 12s ease-in-out infinite' } as React.CSSProperties} />
          <Bird className="absolute top-8 left-[45%] w-4 h-2 text-[var(--ink)]/20"
                style={{ animation: 'bird-drift 15s ease-in-out infinite 2s' } as React.CSSProperties} />
          <Bird className="absolute top-22 left-[55%] w-3 h-1.5 text-[var(--ink)]/15"
                style={{ animation: 'bird-drift 18s ease-in-out infinite 5s' } as React.CSSProperties} />
          <Bird className="absolute top-12 left-[20%] w-3.5 h-2 text-[var(--ink)]/20"
                style={{ animation: 'bird-drift 14s ease-in-out infinite 3s' } as React.CSSProperties} />

          {/* Rolling Hills (Background) — layered gradients for depth */}
          <div className="absolute bottom-0 left-[-10%] w-[120%] h-36 rounded-t-[100%] opacity-85 z-0"
               style={{ background: 'linear-gradient(to top, #6BA06D, #94C696)' }} />
          <div className="absolute -bottom-8 right-[-10%] w-[80%] h-44 rounded-t-[100%] opacity-90 z-0"
               style={{ background: 'linear-gradient(to top, #5E8F60, #8ABF8D)' }} />

          {/* Campus Buildings — warm tones, cleaner */}
          <div className="absolute bottom-4 left-0 w-full flex items-end justify-center gap-1.5 px-4 z-10 opacity-90">

            {/* Left Building */}
            <div className="w-24 h-28 rounded-t-xl relative overflow-hidden shadow-md"
                 style={{ background: 'linear-gradient(to bottom, #D4A99A, #C2948A)' }}>
              <div className="absolute top-0 w-full h-4 bg-[#B38379]" />
              <div className="grid grid-cols-2 gap-3 p-4 mt-4">
                <div className="w-5 h-7 bg-[#F6F2E6]/70 rounded-sm shadow-inner" />
                <div className="w-5 h-7 bg-white/50 rounded-sm shadow-inner" />
                <div className="w-5 h-7 bg-white/50 rounded-sm shadow-inner" />
                <div className="w-5 h-7 bg-[#F6F2E6]/70 rounded-sm shadow-inner" />
              </div>
            </div>

            {/* Center Clock Tower */}
            <div className="w-20 h-40 rounded-t-xl relative flex flex-col items-center shadow-lg z-10"
                 style={{ background: 'linear-gradient(to bottom, #F0E4D4, #E8D9C8)' }}>
              <div className="absolute -top-10 w-24 h-12 bg-[#B38379]"
                   style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
              <div className="w-24 h-2 bg-[#A07269] absolute -top-0 rounded-full" />
              <div className="w-10 h-10 rounded-full bg-white mt-5 flex items-center justify-center shadow-inner border-2 border-[#D1C2B0]">
                <div className="w-1 h-3 bg-[#B38379] rounded-full origin-bottom -mt-2" />
                <div className="w-2 h-1 bg-[#B38379] rounded-full origin-left ml-1" />
              </div>
              <div className="absolute bottom-0 w-10 h-14 bg-[#D3B476] rounded-t-full shadow-inner" />
            </div>

            {/* Right Building */}
            <div className="w-28 h-24 rounded-t-xl relative overflow-hidden flex flex-col items-center pt-3 shadow-md"
                 style={{ background: 'linear-gradient(to bottom, #E0C488, #D3B476)' }}>
              <div className="absolute top-0 w-full h-3 bg-[#C4A465]" />
              <div className="flex gap-2 px-2 mt-2">
                <div className="w-5 h-14 bg-white/50 rounded-t-full shadow-inner" />
                <div className="w-5 h-14 bg-[#F6F2E6]/70 rounded-t-full shadow-inner" />
                <div className="w-5 h-14 bg-white/50 rounded-t-full shadow-inner" />
              </div>
            </div>
          </div>
        </div>

        {/* Ground — rich green gradient */}
        <div className="flex-[2] relative z-20">
          <div className="absolute top-0 left-[-10%] w-[120%] h-full rounded-t-[100%] scale-[1.4] -translate-y-6"
               style={{ background: 'linear-gradient(to top, #4A8E4C, #6BBF6B, #8DD88F)', boxShadow: '0 -8px 30px rgba(74,142,76,0.25)' }} />
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-full opacity-35 rounded-t-[100%]"
               style={{ background: 'linear-gradient(to top, #5DA85F, #9EE3A1)' }} />
        </div>

      {/* ═══ Midground props (sibling to background for correct z-stacking) ═══ */}
      <div className="absolute inset-0 z-[15] pointer-events-none">

          {/* ── Tree Left — layered foliage ── */}
          <div className="absolute bottom-[38%] left-[-2%] w-28 h-44 pointer-events-none">
            {/* Ground shadow */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-20 h-5 bg-black/8 rounded-[100%] blur-[3px]" />
            {/* Trunk with gradient */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-20 rounded-sm shadow-inner"
                 style={{ background: 'linear-gradient(to bottom, #9E7B63, #7A5C45)' }} />
            {/* Trunk knot */}
            <div className="absolute bottom-8 left-1/2 -translate-x-[40%] w-2.5 h-2 bg-[#6D4F3A] rounded-full opacity-60" />
            {/* Foliage layers — darkest at bottom, lightest at top */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-26 h-26 bg-[#3A7A3E] rounded-full shadow-md" />
            <div className="absolute top-6 left-1 w-22 h-22 bg-[#4A8F4E] rounded-full shadow-sm" />
            <div className="absolute top-3 left-3 w-18 h-18 bg-[#5DA860] rounded-full shadow-sm" />
            <div className="absolute top-0 left-6 w-14 h-14 bg-[#7CC87F] rounded-full" />
            {/* Highlight spot (sun reflection) */}
            <div className="absolute top-4 left-10 w-6 h-6 bg-[#A8E5AB]/50 rounded-full blur-[2px]" />
          </div>

          {/* ── Tree Right (smaller) ── */}
          <div className="absolute bottom-[32%] right-[2%] w-16 h-28 pointer-events-none">
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-3 bg-black/8 rounded-[100%] blur-[2px]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3.5 h-12 rounded-sm"
                 style={{ background: 'linear-gradient(to bottom, #9E7B63, #7A5C45)' }} />
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#3A7A3E] rounded-full shadow-md" />
            <div className="absolute top-3 left-1 w-12 h-12 bg-[#4A8F4E] rounded-full shadow-sm" />
            <div className="absolute top-0 left-3 w-10 h-10 bg-[#6BBF6B] rounded-full" />
            <div className="absolute top-2 left-6 w-4 h-4 bg-[#A8E5AB]/40 rounded-full blur-[1px]" />
          </div>

          {/* ── Recycling Bin — INTERACTIVE ── */}
          <div
            className="absolute bottom-[30%] left-[12%] w-14 h-20 pointer-events-auto cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
            onClick={() => setShowRecyclePopup(true)}
          >
            {/* Bin Shadow */}
            <div className="absolute -bottom-2 left-1 w-12 h-3 bg-black/10 rounded-[100%] blur-[3px]" />
            {/* Bin Body */}
            <div className="absolute bottom-0 w-full h-16 rounded-b-xl rounded-t-sm flex items-center justify-center border-b-[6px] border-black/10 shadow-md"
                 style={{ background: 'linear-gradient(to bottom, #56A0C7, #3D8FB8)' }}>
              <Recycle size={24} className="text-white opacity-95 drop-shadow-md mt-1" strokeWidth={2.5} />
            </div>
            {/* Bin Lid */}
            <div className="absolute top-0 -left-0.5 w-[110%] h-4 rounded-t-lg shadow-sm flex justify-center border border-white/20"
                 style={{ background: 'linear-gradient(to right, #7BCAEE, #5DB1D9)' }}>
              <div className="w-6 h-1.5 bg-white/40 rounded-full mt-1" />
            </div>
          </div>

          {/* ── Bush bottom-right ── */}
          <div className="absolute bottom-[28%] right-[8%] w-20 h-14 pointer-events-none">
            <div className="absolute -bottom-1 left-0 w-16 h-3 bg-black/8 rounded-[100%] blur-[2px]" />
            <div className="absolute bottom-0 right-0 w-18 h-10 bg-[#3A7A3E] rounded-full shadow-md" />
            <div className="absolute bottom-1 right-4 w-14 h-12 bg-[#4A8F4E] rounded-full shadow-sm" />
            <div className="absolute bottom-2 right-6 w-8 h-8 bg-[#5DA860] rounded-full" />
          </div>

          {/* ── Grass tufts ── */}
          <div className="absolute bottom-[35%] right-[25%] flex gap-1 opacity-45 pointer-events-none">
            <div className="w-1.5 h-3 bg-[#4A8F4E] rounded-full rotate-[-20deg]" />
            <div className="w-1.5 h-4 bg-[#3A7A3E] rounded-full" />
            <div className="w-1.5 h-2 bg-[#4A8F4E] rounded-full rotate-[20deg]" />
          </div>
          <div className="absolute bottom-[33%] left-[35%] flex gap-1.5 opacity-35 pointer-events-none">
            <div className="w-1 h-2.5 bg-[#5DA860] rounded-full rotate-[-15deg]" />
            <div className="w-1 h-3 bg-[#4A8F4E] rounded-full rotate-[5deg]" />
          </div>
        </div>
      </div>

      {/* ═══ Header UI ═══ */}
      <div className="relative z-20 flex justify-end items-start p-6">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-black flex items-center gap-2 soft-shadow text-[var(--accent-blue)]">
          <Coins size={20} className="fill-[var(--accent-blue)] text-[var(--accent-blue)]" /> {credits}
        </div>
      </div>

      {/* ═══ Pet Area — grounded on the hill ═══ */}
      <div className="absolute left-0 right-0 z-[20] flex flex-col items-center pointer-events-none" style={{ bottom: '34%' }}>
        <div
          className="relative flex flex-col items-center justify-center cursor-pointer transform scale-[1.20] hover:scale-[1.25] transition-transform duration-300 pointer-events-auto"
          onClick={() => triggerReaction('wobble')}
        >
          {/* Status bubble */}
          {scansToday === 0 ? (
            <div className="absolute -top-10 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-2xl rounded-bl-none font-bold text-xs soft-shadow z-20 animate-bounce text-[var(--text-main)] whitespace-nowrap">
              I want a recycled snack! ♻️
            </div>
          ) : hunger < 50 ? (
            <div className="absolute -top-10 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-2xl rounded-bl-none font-bold text-xs soft-shadow z-20 animate-bounce text-[var(--text-main)]">
              I&apos;m hungry! 🍎
            </div>
          ) : null}

          <Pet species={species} mood={displayMood} reaction={reaction} />

          {/* Ground contact shadow — matches hill color */}
          <div className="w-28 h-5 rounded-[100%] blur-[4px] mt-1"
               style={{ background: 'radial-gradient(ellipse, rgba(58,122,62,0.35) 0%, transparent 70%)' }} />
        </div>
        <h2 className="mt-6 text-2xl font-black text-white drop-shadow-md tracking-wide">
          {name || 'Your pet'}
        </h2>
      </div>

      {/* ═══ Bottom Overlay UI ═══ */}
      <div className="relative z-20 w-full flex flex-col gap-3 p-5 pb-24 mt-auto">
        <div className="flex flex-col gap-1.5 rounded-2xl bg-white/85 p-4 soft-shadow backdrop-blur-md">
          <div className="flex items-center justify-between text-sm font-bold">
            <span>This week&apos;s items</span>
            <span className="opacity-60">
              {thisWeek} / {target}
            </span>
          </div>
          <ProgressBar value={progressPct} />
        </div>

        <ListItem
          className="bg-white/90 soft-shadow backdrop-blur-md"
          icon={<ScanLine size={20} strokeWidth={2.5} />}
          title="Got something to recycle?"
          subtitle="Snap it, sort it, earn credits"
          trailing={
            <Button className="px-4 py-2 text-sm" onClick={() => onNavigate('scan')}>
              Start
            </Button>
          }
        />
      </div>

      {/* ═══ Recycle Popup ═══ */}
      {showRecyclePopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-8"
          style={{ animation: 'backdrop-fade-in 0.2s ease-out' }}
          onClick={() => setShowRecyclePopup(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

          {/* Card */}
          <div
            className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 soft-shadow flex flex-col items-center gap-4 max-w-[300px] w-full border border-white/50"
            style={{ animation: 'popup-scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
              onClick={() => setShowRecyclePopup(false)}
            >
              <X size={16} className="text-[var(--ink)]" />
            </button>

            {/* Icon */}
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
                 style={{ background: 'linear-gradient(135deg, #56A0C7, #3D8FB8)' }}>
              <Recycle size={32} className="text-white" strokeWidth={2.5} />
            </div>

            {/* Text */}
            <h3 className="text-xl font-black text-[var(--ink)] text-center">
              Remember to recycle!!!
            </h3>
            <p className="text-sm text-[var(--text-muted)] text-center leading-relaxed">
              Every item you recycle helps your pet grow and keeps the planet healthy. 🌍
            </p>

            {/* CTA */}
            <Button className="px-6 py-2.5 text-sm mt-2 w-full" onClick={() => { setShowRecyclePopup(false); onNavigate('scan') }}>
              Scan an item now
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
