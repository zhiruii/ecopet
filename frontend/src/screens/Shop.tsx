import { clsx } from 'clsx'
import type { ReactNode } from 'react'
import { IconCoins, IconCheck } from '../components/icons'
import { FOODS, ACCESSORIES } from '../data/shopItems'
import { FOOD_ICONS, ACCESSORY_ICONS } from '../data/shopIcons'
import { useProgressStore } from '../store/useProgressStore'
import { usePetStore } from '../store/usePetStore'

export function Shop() {
  const credits = useProgressStore((s) => s.credits)
  const spend = useProgressStore((s) => s.spend)
  const feed = usePetStore((s) => s.feed)
  const own = usePetStore((s) => s.own)
  const owned = usePetStore((s) => s.owned)

  return (
    <div className="flex flex-col gap-6 p-5 pb-28">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-black uppercase tracking-wide">Shop</h1>
        <div className="flex items-center gap-2 border-[3px] border-ink bg-card px-4 py-2 font-bold text-[var(--accent-blue)] shadow-[3px_3px_0_var(--ink)]">
          <IconCoins size={20} className="text-[var(--accent-blue)]" /> {credits}
        </div>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-black uppercase tracking-wide">Consumables</h2>
        <div className="grid grid-cols-3 gap-3">
          {FOODS.map((food) => (
            <ShopTile
              key={food.id}
              icon={FOOD_ICONS[food.id]?.({ className: 'w-full h-full' })}
              label={food.name}
              price={food.price}
              disabled={credits < food.price}
              iconBoxClassName="h-16 w-16"
              onBuy={() => spend(food.price) && feed(food.restores)}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-black uppercase tracking-wide">Accessories</h2>
        <div className="grid grid-cols-4 gap-2.5">
          {ACCESSORIES.map((item) => (
            <ShopTile
              key={item.id}
              icon={ACCESSORY_ICONS[item.id]?.({ className: 'w-full h-full' })}
              label={item.name}
              price={item.price}
              owned={owned.includes(item.id)}
              disabled={credits < item.price}
              iconBoxClassName="h-12 w-12"
              onBuy={() => spend(item.price) && own(item.id)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

interface ShopTileProps {
  icon: ReactNode
  label: string
  price: number
  disabled?: boolean
  owned?: boolean
  iconBoxClassName?: string
  onBuy: () => void
}

function ShopTile({ icon, label, price, disabled, owned, iconBoxClassName, onBuy }: ShopTileProps) {
  const locked = disabled || owned
  return (
    <button
      type="button"
      disabled={locked}
      onClick={onBuy}
      className={clsx(
        'pixel-notch flex flex-col items-center gap-1.5 border-[3px] border-ink bg-card p-2 pt-3 shadow-[3px_3px_0_var(--ink)] transition-all duration-150',
        !locked &&
          'hover:-translate-y-0.5 hover:shadow-[5px_5px_0_var(--ink)] active:translate-y-0 active:shadow-[1px_1px_0_var(--ink)]',
        locked && 'opacity-50',
      )}
    >
      <span
        className={clsx(
          'flex items-center justify-center border-[2px] border-ink bg-paper p-1.5',
          iconBoxClassName,
        )}
      >
        {icon}
      </span>
      <span className="text-center text-[11px] font-bold uppercase leading-tight">{label}</span>
      <span
        className={clsx(
          'flex items-center gap-1 rounded-full border-[2px] border-ink px-2 py-0.5 text-xs font-bold',
          owned ? 'bg-good text-ink' : 'bg-credit text-ink',
        )}
      >
        {owned ? (
          <>
            <IconCheck size={10} /> Owned
          </>
        ) : (
          `${price}c`
        )}
      </span>
    </button>
  )
}
