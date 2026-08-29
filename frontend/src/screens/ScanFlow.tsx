import { useState } from 'react'
import { IconAlert, IconPackageCheck, IconScan } from '../components/icons'
import type { IdentifyResult } from 'shared/types'
import { mockIdentify } from '../features/scan/mockIdentify'
import { useProgressStore } from '../store/useProgressStore'
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
  const [result, setResult] = useState<IdentifyResult | null>(null)
  const [rinseConfirmed, setRinseConfirmed] = useState(false)
  const [binConfirmed, setBinConfirmed] = useState(false)
  const awardScan = useProgressStore((s) => s.awardScan)

  async function runMock(force?: 'lowConfidence' | 'error') {
    setState('identifying')
    try {
      const r = await mockIdentify({ force })
      setResult(r)
      setState('result')
    } catch {
      setState('error')
    }
  }

  function confirmAndAward() {
    if (!result) return
    awardScan({ result, rinseConfirmed, binConfirmed })
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
          <Card className="flex flex-col items-center gap-3 py-10 text-center">
            <span className="flex h-16 w-16 items-center justify-center border-[3px] border-ink bg-info/20 text-ink">
              <IconScan size={28} />
            </span>
            <p className="font-bold">Real capture opens the camera here</p>
            <p className="text-sm opacity-70">
              features/scan/capture.ts exists — this wireframe drives mockIdentify so every
              outcome is testable before the camera UI ships.
            </p>
          </Card>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-bold uppercase tracking-wide opacity-50">
              Dev: mock outcomes
            </p>
            <Button onClick={() => runMock()}>Confident scan</Button>
            <Button variant="secondary" onClick={() => runMock('lowConfidence')}>
              Low-confidence scan
            </Button>
            <Button variant="secondary" onClick={() => runMock('error')}>
              Failed scan
            </Button>
          </div>
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

      {state === 'result' && result && (
        <Card className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-bold">{result.itemType}</p>
              <p className="text-sm capitalize opacity-70">{result.material.replace('_', ' ')}</p>
            </div>
            <Chip tone={result.recyclable ? 'good' : 'bad'} className="shrink-0">
              {result.recyclable ? 'Recyclable' : 'Not recyclable'}
            </Chip>
          </div>
          <p className="text-sm opacity-70">Confidence: {Math.round(result.confidence * 100)}%</p>
          <Button onClick={() => setState('guidance')}>Next</Button>
        </Card>
      )}

      {state === 'guidance' && result && (
        <SortingGuide
          material={result.material}
          rinseConfirmed={rinseConfirmed}
          binConfirmed={binConfirmed}
          onToggleRinse={() => setRinseConfirmed((v) => !v)}
          onToggleBin={() => setBinConfirmed((v) => !v)}
          onConfirm={confirmAndAward}
        />
      )}

      {state === 'reward' && (
        <Card className="flex flex-col items-center gap-3 py-10 text-center">
          <span className="flex h-16 w-16 items-center justify-center border-[3px] border-ink bg-credit">
            <IconPackageCheck size={28} />
          </span>
          <p className="font-bold">Nice! Credits awarded.</p>
          <Button onClick={onDone}>Back to home</Button>
        </Card>
      )}
    </div>
  )
}
