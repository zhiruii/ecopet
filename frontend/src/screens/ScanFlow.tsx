import { useState } from 'react'
import { clsx } from 'clsx'
import { IconAlert, IconPackageCheck, IconScan } from '../components/icons'
import type { IdentifyResult } from 'shared/types'
import { captureAndCompress } from '../features/scan/capture'
import { identify } from '../features/scan/identify'
import { useRef } from 'react'
import { HAPPINESS_PER_SCAN } from '../features/economy/credits'
import { useProgressStore } from '../store/useProgressStore'
import type { ScanAward } from '../store/useProgressStore'
import { usePetStore } from '../store/usePetStore'
import { BackButton } from '../components/BackButton'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Chip } from '../components/Chip'
import { SortingGuide } from './SortingGuide'

interface ScanFlowProps {
  onDone: () => void
}

type State = 'idle' | 'identifying' | 'result' | 'guidance' | 'reward' | 'error'

export function ScanFlow({ onDone }: ScanFlowProps) {
  const [state, setState] = useState<State>('idle')
  const [results, setResults] = useState<IdentifyResult[]>([])
  const [confirmations, setConfirmations] = useState<{rinseConfirmed: boolean, binConfirmed: boolean}[]>([])
  const [awards, setAwards] = useState<ScanAward[]>([])
  const awardScan = useProgressStore((s) => s.awardScan)
  const addHappiness = usePetStore((s) => s.addHappiness)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleCapture(file: File) {
    setState('identifying')
    try {
      const blob = await captureAndCompress(file)
      const rs = await identify(blob)
      setResults(rs)
      setConfirmations(rs.map(() => ({ rinseConfirmed: false, binConfirmed: false })))
      setState('result')
    } catch (err) {
      console.error('Scan failed:', err)
      setState('error')
    }
  }

  function confirmAndAward() {
    if (results.length === 0 || results.length !== confirmations.length) return
    let totalHappiness = 0
    const scanAwards = results.map((result, i) => {
      const conf = confirmations[i] || { rinseConfirmed: false, binConfirmed: false }
      const scanAward = awardScan({ result, rinseConfirmed: conf.rinseConfirmed, binConfirmed: conf.binConfirmed })
      if (scanAward.record.recyclable) totalHappiness += HAPPINESS_PER_SCAN
      return scanAward
    })
    if (totalHappiness > 0) addHappiness(totalHappiness)
    setAwards(scanAwards)
    setState('reward')
  }

  return (
    <div className="flex min-h-dvh flex-col gap-5 p-5">
      <div className="flex items-center gap-3">
        <BackButton onClick={onDone} label="Back to home" />
        <h1 className="text-xl font-black">Scan</h1>
      </div>

      {state === 'idle' && (
        <>
          <Card className="flex flex-col items-center gap-5 py-10 text-center">
            <span className="flex h-16 w-16 items-center justify-center border-[3px] border-ink bg-info/20 text-ink">
              <IconScan size={28} />
            </span>
            <div>
              <p className="font-bold">Ready to recycle?</p>
              <p className="text-sm opacity-70">
                Snap a photo of the item you want to recycle.
              </p>
            </div>
            
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleCapture(file)
                // reset input so the same file can be picked again if needed
                if (e.target) e.target.value = ''
              }}
            />
            
            <Button onClick={() => fileInputRef.current?.click()}>
              Tap to scan
            </Button>
          </Card>
        </>
      )}

      {state === 'identifying' && (
        <Card className="flex flex-col items-center gap-3 py-10 text-center">
          <IconScan size={28} className="animate-pulse" />
          <p className="font-bold">Identifying…</p>
        </Card>
      )}

      {state === 'error' && (
        <Card className="flex flex-col items-center gap-3 py-10 text-center">
          <IconAlert size={28} className="text-bad" />
          <p className="font-bold">Couldn&apos;t identify that</p>
          <p className="text-sm opacity-70">
            Manual material picker goes here (B builds it).
          </p>
          <Button onClick={() => setState('idle')}>Try again</Button>
        </Card>
      )}

      {state === 'result' && results.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-black text-center mb-2">We found {results.length} {results.length === 1 ? 'item' : 'items'}:</h2>
          {results.map((res, i) => (
            <Card key={i} className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold">{res.itemType}</p>
                  <p className="text-sm capitalize opacity-70">{res.material.replace('_', ' ')}</p>
                </div>
                <Chip tone={res.recyclable ? 'good' : 'bad'} className="shrink-0">
                  {res.recyclable ? 'Recyclable' : 'Not recyclable'}
                </Chip>
              </div>
            </Card>
          ))}
          <Button onClick={() => setState('guidance')} className="mt-2">Next</Button>
        </div>
      )}

      {state === 'guidance' && results.length > 0 && (
        <div className="flex flex-col gap-5 pb-10">
          {results.map((res, i) => (
            <Card key={i} className="flex flex-col gap-4">
              <div className="border-b-[3px] border-ink pb-2">
                <h2 className="text-lg font-black">{res.itemType}</h2>
              </div>
              <SortingGuide
                material={res.material}
                recyclable={res.recyclable}
                rinseConfirmed={confirmations[i]?.rinseConfirmed ?? false}
                binConfirmed={confirmations[i]?.binConfirmed ?? false}
                onToggleRinse={() => {
                  const newConf = [...confirmations]
                  if (newConf[i]) {
                    newConf[i] = { ...newConf[i], rinseConfirmed: !newConf[i].rinseConfirmed }
                  }
                  setConfirmations(newConf)
                }}
                onToggleBin={() => {
                  const newConf = [...confirmations]
                  if (newConf[i]) {
                    newConf[i] = { ...newConf[i], binConfirmed: !newConf[i].binConfirmed }
                  }
                  setConfirmations(newConf)
                }}
              />
            </Card>
          ))}
          <Button onClick={confirmAndAward}>Confirm All Items</Button>
        </div>
      )}

      {state === 'reward' && awards.length > 0 && (
        <div className="flex flex-col gap-5 pb-10">
          {awards.map((aw, i) => (
            <RewardSummary key={i} award={aw} />
          ))}
          <Button onClick={onDone}>Back to home</Button>
        </div>
      )}
    </div>
  )
}

function RewardSummary({ award }: { award: ScanAward }) {
  const { record, breakdown } = award
  const happiness = record.recyclable ? HAPPINESS_PER_SCAN : 0

  return (
    <Card className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <span
          className={clsx(
            'flex h-16 w-16 items-center justify-center border-[3px] border-ink',
            record.recyclable ? 'bg-credit' : 'bg-paper',
          )}
        >
          {record.recyclable ? <IconPackageCheck size={28} /> : <IconAlert size={28} className="text-bad" />}
        </span>
        <p className="font-bold">{record.recyclable ? 'Sorted!' : 'Nothing earned this time'}</p>
        <p className="text-sm opacity-70">
          {record.recyclable
            ? record.itemType
            : `${record.itemType} can't be recycled — bin it as trash so it doesn't contaminate the stream.`}
        </p>
      </div>

      {record.recyclable && (
        <div className="flex flex-col gap-1.5 border-[3px] border-ink bg-paper p-3">
          <AwardLine label="Recycled item" value={breakdown.base} />
          <AwardLine
            label="Rinsed it"
            value={breakdown.rinseBonus}
            hint={breakdown.rinseBonus === 0 ? 'not confirmed' : undefined}
          />
          <AwardLine
            label="Right bin"
            value={breakdown.binBonus}
            hint={breakdown.binBonus === 0 ? 'not confirmed' : undefined}
          />
          <AwardLine
            label={`CO₂ saved ${record.co2SavedKg.toFixed(2)} kg`}
            value={breakdown.co2Bonus}
          />

          <div className="mt-1 border-t-[3px] border-dashed border-ink pt-2">
            <AwardLine label="Credits" value={breakdown.total} emphasis />
            <AwardLine label="Happiness" value={happiness} emphasis />
          </div>
        </div>
      )}

    </Card>
  )
}

function AwardLine({
  label,
  value,
  hint,
  emphasis,
}: {
  label: string
  value: number
  hint?: string
  emphasis?: boolean
}) {
  const earned = value > 0
  return (
    <div
      className={clsx(
        'flex items-baseline justify-between gap-3',
        emphasis ? 'text-sm font-bold' : 'text-xs font-bold',
        !earned && !emphasis && 'opacity-45',
      )}
    >
      <span className="min-w-0 truncate">
        {label}
        {hint && <span className="ml-1.5 font-normal normal-case opacity-80">({hint})</span>}
      </span>
      <span className="shrink-0 tabular-nums">
        +{value}
      </span>
    </div>
  )
}
