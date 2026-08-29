import { useState } from 'react'
import type { PetSpeciesId } from 'shared/types'
import { usePetStore } from '../store/usePetStore'
import { useProgressStore } from '../store/useProgressStore'
import { BackButton } from '../components/BackButton'
import { Button } from '../components/Button'
import { Card } from '../components/Card'

const SPECIES_IDS: PetSpeciesId[] = ['sprout', 'bloop', 'pebble', 'nimbus', 'fern', 'coco']

interface OnboardingProps {
  onDone: () => void
}

type Step = 'species' | 'name' | 'baseline'

const STEPS: Step[] = ['species', 'name', 'baseline']

export function Onboarding({ onDone }: OnboardingProps) {
  const [step, setStep] = useState<Step>('species')
  const species = usePetStore((s) => s.species)
  const setSpecies = usePetStore((s) => s.setSpecies)
  const name = usePetStore((s) => s.name)
  const setName = usePetStore((s) => s.setName)
  const setBaseline = useProgressStore((s) => s.setBaseline)
  const [baselineInput, setBaselineInput] = useState('5')

  function stepBack() {
    const index = STEPS.indexOf(step)
    if (index > 0) setStep(STEPS[index - 1])
  }

  return (
    <div className="flex min-h-dvh flex-col justify-center gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {step !== 'species' && <BackButton onClick={stepBack} label="Previous step" />}
          <h1 className="text-2xl font-black">Welcome</h1>
        </div>
        <div className="flex gap-1.5">
          {STEPS.map((s) => (
            <span
              key={s}
              className={
                s === step
                  ? 'h-2.5 w-6 rounded-full bg-accent'
                  : 'h-2.5 w-2.5 rounded-full bg-ink/15'
              }
            />
          ))}
        </div>
      </div>

      {step === 'species' && (
        <Card className="flex flex-col gap-4">
          <p className="font-bold">Pick a pet (placeholder grid — pet/PetPicker.tsx replaces this)</p>
          <div className="grid grid-cols-3 gap-2">
            {SPECIES_IDS.map((id) => (
              <Button
                key={id}
                variant={species === id ? 'primary' : 'secondary'}
                onClick={() => setSpecies(id)}
              >
                {id}
              </Button>
            ))}
          </div>
          <Button disabled={!species} onClick={() => setStep('name')}>
            Next
          </Button>
        </Card>
      )}

      {step === 'name' && (
        <Card className="flex flex-col gap-4">
          <p className="font-bold">Name your pet (12 char cap)</p>
          <input
            className="rounded-xl border-[3px] border-ink px-3 py-2"
            value={name}
            maxLength={12}
            onChange={(e) => setName(e.target.value)}
          />
          <Button disabled={!name} onClick={() => setStep('baseline')}>
            Next
          </Button>
        </Card>
      )}

      {step === 'baseline' && (
        <Card className="flex flex-col gap-4">
          <p className="font-bold">In a typical week, how many items do you recycle?</p>
          <input
            className="rounded-xl border-[3px] border-ink px-3 py-2"
            type="number"
            min={0}
            value={baselineInput}
            onChange={(e) => setBaselineInput(e.target.value)}
          />
          <Button
            onClick={() => {
              setBaseline(Number(baselineInput) || 0)
              onDone()
            }}
          >
            Start
          </Button>
        </Card>
      )}
    </div>
  )
}
