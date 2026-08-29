import { useState } from 'react'
import { IconRecycle, IconCoins, IconScan, IconClose } from '../components/icons'
import type { Screen } from '../App'
import { usePetStore } from '../store/usePetStore'
import { useProgressStore } from '../store/useProgressStore'
import { itemsThisWeek } from '../features/impact/metrics'
import { Pet } from '../pet/Pet'
import { usePetReaction } from '../pet/animations/usePetReaction'
import { Button } from '../components/Button'
import { ProgressBar } from '../components/ProgressBar'
import { ListItem } from '../components/ListItem'
import { PixelSun, PixelCloud, PixelBird, PixelTree, PixelBush, PixelBin } from './homeScenery'

interface HomeProps {
  onNavigate: (screen: Screen) => void
}

export function Home({ onNavigate }: HomeProps) {
  const { species, name, hunger, worn } = usePetStore()
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
    <div
      className="mx-auto flex h-[100dvh] max-w-[430px] flex-col overflow-hidden relative"
      style={{
        background:
          'linear-gradient(to bottom, #4A9FD8 0%, #4A9FD8 38%, #7EC8E8 38%, #7EC8E8 68%, #B5E0F0 68%, #B5E0F0 100%)',
      }}
    >
      {/* ═══ Background Environment ═══ */}
      <div className="absolute inset-0 z-0 pointer-events-none flex flex-col overflow-hidden">
        {/* Sky / Distant Campus */}
        <div className="flex-[3] relative">
          <PixelSun className="absolute top-6 left-8" />

          <PixelCloud className="absolute top-14 left-4 opacity-80 animate-float-slow" />
          <PixelCloud className="absolute top-6 right-32 opacity-70 animate-float-medium" />
          <div
            className="absolute top-28 left-1/2 -translate-x-1/2 opacity-60"
            style={{ animation: 'float-slow 35s linear infinite' }}
          >
            <PixelCloud />
          </div>

          {/* Birds in the sky */}
          <PixelBird
            className="absolute top-14 left-[30%] opacity-40"
            style={{ animation: 'bird-drift 12s ease-in-out infinite' } as React.CSSProperties}
          />
          <PixelBird
            className="absolute top-8 left-[45%] opacity-30"
            style={{ animation: 'bird-drift 15s ease-in-out infinite 2s' } as React.CSSProperties}
          />
          <PixelBird
            className="absolute top-22 left-[55%] opacity-25"
            style={{ animation: 'bird-drift 18s ease-in-out infinite 5s' } as React.CSSProperties}
          />

          {/* Rolling Hills — stepped terraces instead of blurred ellipses */}
          <div className="absolute bottom-0 left-0 w-full h-32 z-0" style={{ background: '#6BA06D' }} />
          <div className="absolute bottom-8 left-0 w-full h-8 z-0" style={{ background: '#5E8F60' }} />
          <div className="absolute bottom-16 left-[8%] w-[50%] h-6 z-0" style={{ background: '#5E8F60' }} />
        </div>

        {/* Ground */}
        <div className="flex-[2] relative z-20" style={{ background: '#6BBF6B' }}>
          <div className="absolute top-0 left-0 w-full h-6" style={{ background: '#8DD88F' }} />
        </div>

        {/* ═══ Midground props ═══ */}
        <div className="absolute inset-0 z-[15] pointer-events-none">
          <PixelTree className="absolute bottom-[48%] left-[-2%]" tone="#3A7A3E" />
          <PixelTree className="absolute bottom-[44%] right-[2%] scale-75" tone="#4A8F4E" />

          <PixelBin onClick={() => setShowRecyclePopup(true)} />

          <PixelBush className="absolute bottom-[40%] right-[8%]" />

          <div className="absolute bottom-[47%] right-[25%] flex gap-1 opacity-70 pointer-events-none">
            <div className="w-1.5 h-3 bg-[#4A8F4E]" />
            <div className="w-1.5 h-4 bg-[#3A7A3E]" />
            <div className="w-1.5 h-2 bg-[#4A8F4E]" />
          </div>
          <div className="absolute bottom-[45%] left-[35%] flex gap-1.5 opacity-60 pointer-events-none">
            <div className="w-1 h-2.5 bg-[#5DA860]" />
            <div className="w-1 h-3 bg-[#4A8F4E]" />
          </div>
        </div>
      </div>

      {/* ═══ Header UI ═══ */}
      <div className="relative z-20 flex justify-end items-start p-6">
        <div className="border-[3px] border-ink bg-card px-4 py-2 font-bold flex items-center gap-2 shadow-[3px_3px_0_var(--ink)] text-[var(--accent-blue)]">
          <IconCoins size={20} className="text-[var(--accent-blue)]" /> {credits}
        </div>
      </div>

      {/* ═══ Pet Area — grounded on the hill ═══ */}
      <div
        className="absolute left-0 right-0 z-[20] flex flex-col items-center pointer-events-none"
        style={{ bottom: '34%' }}
      >
        <div
          className="relative flex flex-col items-center justify-center cursor-pointer transform scale-[0.72] hover:scale-[0.75] transition-transform duration-300 pointer-events-auto"
          onClick={() => triggerReaction('wobble')}
        >
          {/* Status bubble */}
          {scansToday === 0 ? (
            <div className="absolute -top-10 border-[3px] border-ink bg-card px-3 py-1.5 font-bold text-xs shadow-[2px_2px_0_var(--ink)] z-20 animate-bounce whitespace-nowrap">
              I want a recycled snack!
            </div>
          ) : hunger < 50 ? (
            <div className="absolute -top-10 border-[3px] border-ink bg-card px-3 py-1.5 font-bold text-xs shadow-[2px_2px_0_var(--ink)] z-20 animate-bounce">
              I&apos;m hungry!
            </div>
          ) : null}

          <Pet species={species} mood={displayMood} reaction={reaction} accessories={worn} />

          {/* Ground contact shadow */}
          <div className="w-28 h-2 mt-1" style={{ background: 'rgba(58,122,62,0.35)' }} />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-white drop-shadow-md tracking-wide">
          {name || 'Your pet'}
        </h2>
      </div>

      {/* ═══ Bottom Overlay UI ═══ */}
      <div className="relative z-20 w-full flex flex-col gap-3 p-5 pb-24 mt-auto">
        <div className="flex flex-col gap-1.5 border-[3px] border-ink bg-card p-4 shadow-[3px_3px_0_var(--ink)]">
          <div className="flex items-center justify-between text-sm font-bold">
            <span>This week&apos;s items</span>
            <span className="opacity-60">
              {thisWeek} / {target}
            </span>
          </div>
          <ProgressBar value={progressPct} />
        </div>

        <ListItem
          icon={<IconScan size={20} />}
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
          <div className="absolute inset-0 bg-black/40" />

          {/* Card */}
          <div
            className="pixel-notch relative bg-card p-8 border-[3px] border-ink shadow-[6px_6px_0_var(--ink)] flex flex-col items-center gap-4 max-w-[300px] w-full"
            style={{ animation: 'popup-scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center border-[2px] border-ink bg-paper hover:bg-info/20 transition-colors"
              onClick={() => setShowRecyclePopup(false)}
            >
              <IconClose size={16} className="text-ink" />
            </button>

            {/* Icon */}
            <div className="w-16 h-16 border-[3px] border-ink flex items-center justify-center" style={{ background: '#3D8FB8' }}>
              <IconRecycle size={32} className="text-white" />
            </div>

            {/* Text */}
            <h3 className="text-lg font-bold text-ink text-center">Remember to recycle!</h3>
            <p className="text-sm text-[var(--text-muted)] text-center leading-relaxed">
              Every item you recycle helps your pet grow and keeps the planet healthy.
            </p>

            {/* CTA */}
            <Button
              className="px-6 py-2.5 text-sm mt-2 w-full"
              onClick={() => {
                setShowRecyclePopup(false)
                onNavigate('scan')
              }}
            >
              Scan an item now
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
