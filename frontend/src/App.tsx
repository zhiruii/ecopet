import { useState } from 'react'
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
  const [screen, setScreen] = useState<Screen>(() => initialScreen(species !== null))

  const showTabBar = (TAB_SCREENS as string[]).includes(screen)

  return (
    <>
      {screen === 'onboarding' && <Onboarding onDone={() => setScreen('home')} />}
      {screen === 'home' && <Home onNavigate={setScreen} />}
      {screen === 'scan' && <ScanFlow onDone={() => setScreen('home')} />}
      {screen === 'shop' && <Shop />}
      {screen === 'stats' && <Stats onBack={() => setScreen('home')} />}
      {showTabBar && <TabBar active={screen} onNavigate={setScreen} />}
    </>
  )
}
