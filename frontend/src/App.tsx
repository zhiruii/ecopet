import { useCallback, useState, useEffect } from 'react'
import type { FoodId } from 'shared/types'
import { usePetStore } from './store/usePetStore'
import { Onboarding } from './screens/Onboarding'
import { Home } from './screens/Home'
import { ScanFlow } from './screens/ScanFlow'
import { Shop } from './screens/Shop'
import { Stats } from './screens/Stats'
import { TabBar } from './components/TabBar'

export type Screen = 'onboarding' | 'home' | 'scan' | 'shop' | 'stats'

const DEV_SCREENS: Screen[] = ['onboarding', 'home', 'scan', 'shop', 'stats']
const TAB_SCREENS: Screen[] = ['home', 'shop', 'stats']

function initialScreen(hasOnboarded: boolean): Screen {
  const dev = new URLSearchParams(window.location.search).get('dev')
  if (dev && (DEV_SCREENS as string[]).includes(dev)) return dev as Screen
  return hasOnboarded ? 'home' : 'onboarding'
}

export default function App() {
  const species = usePetStore((s) => s.species)
  const addHappiness = usePetStore((s) => s.addHappiness)
  


  const [screen, setScreen] = useState<Screen>(() => initialScreen(species !== null))
  // Which food the player picked in the Shop to go feed the pet with. Navigation
  // intent rather than saved state, so it lives here and not in the store.
  const [armedFood, setArmedFood] = useState<FoodId | null>(null)

  useEffect(() => {
    if (species === null || screen !== 'home') return
    const interval = setInterval(() => {
      addHappiness(-1)
    }, 10000)
    return () => clearInterval(interval)
  }, [addHappiness, species, screen])

  const showTabBar = (TAB_SCREENS as string[]).includes(screen)

  const armFood = useCallback((id: FoodId) => {
    setArmedFood(id)
    setScreen('home')
  }, [])
  const disarmFood = useCallback(() => setArmedFood(null), [])

  return (
    <>
      {screen === 'onboarding' && <Onboarding onDone={() => setScreen('home')} />}
      {screen === 'home' && (
        <Home onNavigate={setScreen} armedFood={armedFood} onFeedDone={disarmFood} />
      )}
      {screen === 'scan' && <ScanFlow onDone={() => setScreen('home')} />}
      {screen === 'shop' && <Shop onFeed={armFood} />}
      {screen === 'stats' && <Stats onBack={() => setScreen('home')} />}
      {showTabBar && <TabBar active={screen} onNavigate={setScreen} />}
    </>
  )
}
