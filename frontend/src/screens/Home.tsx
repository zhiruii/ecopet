import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { FoodId } from 'shared/types'
import { IconRecycle, IconCoins, IconScan, IconClose } from '../components/icons'
import type { Screen } from '../App'
import { usePetStore } from '../store/usePetStore'
import { useProgressStore } from '../store/useProgressStore'
import { FOOD_BY_ID } from '../data/shopItems'
import { FOOD_ICONS } from '../data/shopIcons'
import { Pet } from '../pet/Pet'
import { usePetReaction } from '../pet/animations/usePetReaction'
import { Button } from '../components/Button'
import { ProgressBar } from '../components/ProgressBar'
import { ListItem } from '../components/ListItem'
import { PixelSun, PixelCloud, PixelBird, PixelTree, PixelBush, PixelBin } from './homeScenery'

/** The food is eaten in three bites, so the icon vanishes a third at a time. */
const BITES = 3

interface Flight {
  food: FoodId
  /** Icon's start box, measured relative to the screen container. */
  from: { x: number; y: number }
  to: { x: number; y: number }
  size: number
}

interface HomeProps {
  onNavigate: (screen: Screen) => void
  /** Food the player armed in the Shop; swaps the bottom panel for a feed slot. */
  armedFood: FoodId | null
  onFeedDone: () => void
}

export function Home({ onNavigate, armedFood, onFeedDone }: HomeProps) {
  const { species, name, happiness, worn, inventory, consumeFood } = usePetStore()
  const { credits, scans } = useProgressStore()
  const { reaction, triggerReaction } = usePetReaction()
  const [showRecyclePopup, setShowRecyclePopup] = useState(false)
  const reduced = useReducedMotion()

  const stageRef = useRef<HTMLDivElement>(null)
  const petRef = useRef<HTMLDivElement>(null)
  const foodIconRef = useRef<HTMLSpanElement>(null)
  const [flight, setFlight] = useState<Flight | null>(null)
  const [bite, setBite] = useState(0)

  const held = armedFood ? inventory[armedFood] : 0
  const food = armedFood ? FOOD_BY_ID[armedFood] : null
  // A food with nothing left behind it falls back to the normal panel.
  const feeding = food !== null && held > 0

  const startFeed = useCallback(() => {
    const stage = stageRef.current
    const icon = foodIconRef.current
    const pet = petRef.current
    if (!stage || !icon || !pet || !armedFood) return

    const stageBox = stage.getBoundingClientRect()
    const iconBox = icon.getBoundingClientRect()
    const petBox = pet.getBoundingClientRect()

    setBite(0)
    setFlight({
      food: armedFood,
      size: iconBox.width,
      from: { x: iconBox.left - stageBox.left, y: iconBox.top - stageBox.top },
      // Aim at the pet's mouth, a little above its centre.
      to: {
        x: petBox.left - stageBox.left + petBox.width / 2 - iconBox.width / 2,
        y: petBox.top - stageBox.top + petBox.height * 0.42 - iconBox.height / 2,
      },
    })
  }, [armedFood])

  // Drives the bite sequence: hop, get bitten, repeat, then bank the happiness.
  useEffect(() => {
    if (!flight) return

    if (bite >= BITES) {
      const done = setTimeout(
        () => {
          consumeFood(flight.food)
          triggerReaction('wobble')
          setFlight(null)
          setBite(0)
          onFeedDone()
        },
        reduced ? 160 : 520,
      )
      return () => clearTimeout(done)
    }

    const next = setTimeout(
      () => {
        setBite((b) => b + 1)
        triggerReaction('wobble')
      },
      reduced ? 220 : 420,
    )
    return () => clearTimeout(next)
  }, [flight, bite, reduced, consumeFood, triggerReaction, onFeedDone])

  if (!species) return null

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const scansToday = scans.filter((s) => s.timestamp >= todayStart.getTime()).length

  const displayMood = flight ? 'eating' : scansToday > 0 ? 'happy' : happiness < 30 ? 'sad' : 'idle'

  const progress = bite / BITES
  const FlyingIcon = flight ? FOOD_ICONS[flight.food] : null

  return (
    <div
      ref={stageRef}
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
          ref={petRef}
          className="relative flex flex-col items-center justify-center cursor-pointer transform scale-[0.72] hover:scale-[0.75] transition-transform duration-300 pointer-events-auto"
          onClick={() => triggerReaction('wobble')}
        >
          {/* Status bubble — silent while eating, so nothing talks over the moment */}
          {flight ? null : scansToday === 0 ? (
            <div className="absolute -top-10 border-[3px] border-ink bg-card px-3 py-1.5 font-bold text-xs shadow-[2px_2px_0_var(--ink)] z-20 animate-bounce whitespace-nowrap">
              I want a recycled snack!
            </div>
          ) : happiness < 50 ? (
            <div className="absolute -top-10 border-[3px] border-ink bg-card px-3 py-1.5 font-bold text-xs shadow-[2px_2px_0_var(--ink)] z-20 animate-bounce whitespace-nowrap">
              Cheer me up with a snack!
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
        {feeding && food ? (
          <div
            className="pixel-notch flex items-center gap-4 border-[3px] border-ink bg-card p-4 shadow-[4px_4px_0_var(--ink)]"
            style={{ animation: 'popup-scale-in 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
          >
            <span className="relative shrink-0">
              <span
                ref={foodIconRef}
                className="flex h-16 w-16 items-center justify-center border-[2px] border-ink bg-paper p-1.5"
              >
                {/* Hidden while its copy is in flight, so the food really leaves the slot. */}
                {!flight && FOOD_ICONS[food.id]?.({ className: 'w-full h-full' })}
              </span>
              <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center border-[2px] border-ink bg-credit px-1 text-[11px] font-bold tabular-nums text-ink">
                {held}
              </span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-bold leading-snug">{food.name}</p>
              <p className="text-sm leading-snug opacity-70">+{food.happiness} happiness</p>
            </div>
            {/* Fixed width so swapping the label to "Eating…" can't reflow the row. */}
            <Button
              className="w-[112px] shrink-0 px-3 py-2.5 text-sm"
              disabled={flight !== null}
              onClick={startFeed}
            >
              {flight ? 'Eating…' : 'Feed'}
            </Button>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1.5 border-[3px] border-ink bg-card p-4 shadow-[3px_3px_0_var(--ink)]">
              <div className="flex items-center justify-between text-sm font-bold">
                <span>Happiness</span>
                <span className="opacity-60 tabular-nums">{happiness} / 500</span>
              </div>
              <ProgressBar value={happiness} max={500} />
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
          </>
        )}
      </div>

      {/* ═══ Food in flight — hops to the pet, bitten away a third at a time ═══ */}
      {flight && FlyingIcon && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute z-[25]"
          style={{
            left: flight.from.x,
            top: flight.from.y,
            width: flight.size,
            height: flight.size,
          }}
          initial={{ x: 0, y: 0 }}
          animate={{
            x: (flight.to.x - flight.from.x) * progress,
            // Small arc so it hops rather than slides.
            y:
              (flight.to.y - flight.from.y) * progress -
              (reduced ? 0 : Math.sin(progress * Math.PI) * 24),
          }}
          transition={reduced ? { duration: 0 } : { duration: 0.34, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div
            className="h-full w-full"
            style={{
              clipPath: `inset(${progress * 100}% 0 0 0)`,
              transition: reduced ? 'none' : 'clip-path 140ms steps(2) 300ms',
            }}
          >
            <FlyingIcon className="h-full w-full" />
          </div>
        </motion.div>
      )}

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
