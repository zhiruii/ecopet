import { clsx } from 'clsx'
import type { ReactNode } from 'react'
import type { FoodId } from 'shared/types'
import { IconCoins } from '../components/icons'
import { FOODS, ACCESSORIES, SLOT_LABEL } from '../data/shopItems'
import type { AccessoryItem, FoodItem } from '../data/shopItems'
import { FOOD_ICONS, ACCESSORY_ICONS } from '../data/shopIcons'
import { Pet } from '../pet/Pet'
import { usePetReaction } from '../pet/animations/usePetReaction'
import { useProgressStore } from '../store/useProgressStore'
import { usePetStore } from '../store/usePetStore'

interface ShopProps {
  /** Arms a held food and sends the player home to feed it to the pet. */
  onFeed: (id: FoodId) => void
}

export function Shop({ onFeed }: ShopProps) {
  const credits = useProgressStore((s) => s.credits)
  const spend = useProgressStore((s) => s.spend)
  const species = usePetStore((s) => s.species)
  const mood = usePetStore((s) => s.mood)
  const buyFood = usePetStore((s) => s.buyFood)
  const inventory = usePetStore((s) => s.inventory)
  const own = usePetStore((s) => s.own)
  const wear = usePetStore((s) => s.wear)
  const unwear = usePetStore((s) => s.unwear)
  const owned = usePetStore((s) => s.owned)
  const worn = usePetStore((s) => s.worn)
  const { reaction, triggerReaction } = usePetReaction()

  return (
    <div className="flex flex-col gap-6 p-5 pb-28">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-black uppercase tracking-wide">Shop</h1>
        <div className="flex items-center gap-2 border-[3px] border-ink bg-card px-4 py-2 font-bold text-[var(--accent-blue)] shadow-[3px_3px_0_var(--ink)]">
          <IconCoins size={20} className="text-[var(--accent-blue)]" /> {credits}
        </div>
      </header>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-black uppercase tracking-wide">Consumables</h2>
        <div className="flex flex-col gap-2.5">
          {FOODS.map((food) => (
            <FoodRow
              key={food.id}
              food={food}
              icon={FOOD_ICONS[food.id]?.({ className: 'w-full h-full' })}
              credits={credits}
              held={inventory[food.id]}
              onBuy={() => spend(food.price) && buyFood(food.id)}
              onFeed={() => onFeed(food.id)}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2 mt-2">
        <h2 className="text-lg font-black uppercase tracking-wide">Wardrobe</h2>
        

        {species && (
          <div className="pixel-notch flex items-center gap-4 border-[3px] border-ink bg-card p-3 shadow-[3px_3px_0_var(--ink)]">
            <button
              type="button"
              aria-label="Give your pet a poke"
              className="pixel-notch-sm shrink-0 border-[2px] border-ink bg-paper p-1 focus-visible:outline focus-visible:outline-[2px] focus-visible:[outline-offset:-6px] focus-visible:outline-accent"
              onClick={() => triggerReaction('wobble')}
            >
              <Pet
                species={species}
                mood={mood}
                reaction={reaction}
                accessories={worn}
                className="h-24 w-24"
              />
            </button>
            <div className="flex min-w-0 flex-col gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-[0.12em] text-[var(--text-muted)]">
                Wearing now
              </span>
              {worn.length === 0 ? (
                <p className="text-sm font-bold leading-snug">
                  Nothing yet — buy a piece below and equip it.
                </p>
              ) : (
                <ul className="flex flex-wrap gap-1.5">
                  {ACCESSORIES.filter((a) => worn.includes(a.id)).map((a) => (
                    <li
                      key={a.id}
                      className="border-[2px] border-ink bg-good px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-ink"
                    >
                      {a.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2.5">
          {ACCESSORIES.map((item) => (
            <AccessoryTile
              key={item.id}
              item={item}
              icon={ACCESSORY_ICONS[item.id]?.({ className: 'w-full h-full' })}
              credits={credits}
              owned={owned.includes(item.id)}
              worn={worn.includes(item.id)}
              onBuy={() => spend(item.price) && own(item.id)}
              onWear={() => wear(item.id)}
              onUnwear={() => unwear(item.id)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

/** Shared chunky action button used by both catalogue rows. */
const TILE_BUTTON =
  'pixel-notch-sm w-full whitespace-nowrap border-[2px] border-ink px-2 py-1.5 text-[11px] font-black uppercase tracking-wide transition-all duration-150 focus-visible:outline focus-visible:outline-[2px] focus-visible:[outline-offset:-6px] focus-visible:outline-ink'
const TILE_BUTTON_LIVE =
  'shadow-[2px_2px_0_var(--ink)] hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--ink)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
const TILE_BUTTON_DEAD = 'cursor-not-allowed bg-paper text-[var(--text-muted)]'

interface FoodRowProps {
  food: FoodItem
  icon: ReactNode
  credits: number
  held: number
  onBuy: () => void
  onFeed: () => void
}

function FoodRow({ food, icon, credits, held, onBuy, onFeed }: FoodRowProps) {
  const shortfall = food.price - credits
  const affordable = shortfall <= 0
  const hasStock = held > 0

  return (
    <div className="pixel-notch flex items-center gap-3 border-[3px] border-ink bg-card p-3 shadow-[3px_3px_0_var(--ink)]">
      <span className="relative flex h-16 w-16 shrink-0 items-center justify-center border-[2px] border-ink bg-paper p-1.5">
        {icon}
        {hasStock && (
          <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center border-[2px] border-ink bg-credit px-1 text-[11px] font-black tabular-nums text-ink">
            {held}
          </span>
        )}
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-[13px] font-bold uppercase leading-tight">{food.name}</span>
        <span className="text-[10px] font-bold uppercase tracking-wide text-[var(--text-muted)]">
          +{food.happiness} happiness
        </span>
        {!affordable && (
          <span className="text-[10px] font-bold uppercase tracking-wide text-warn">
            {shortfall} more credits
          </span>
        )}
      </div>

      <div className="flex w-[124px] shrink-0 flex-col gap-1.5">
        <button
          type="button"
          disabled={!affordable}
          onClick={onBuy}
          className={clsx(
            TILE_BUTTON,
            affordable ? clsx(TILE_BUTTON_LIVE, 'bg-accent text-white') : TILE_BUTTON_DEAD,
          )}
        >
          Buy {food.price}c
        </button>
        <button
          type="button"
          disabled={!hasStock}
          onClick={onFeed}
          className={clsx(
            TILE_BUTTON,
            hasStock ? clsx(TILE_BUTTON_LIVE, 'bg-good text-ink') : TILE_BUTTON_DEAD,
          )}
        >
          Feed (Qty: {held})
        </button>
      </div>
    </div>
  )
}

interface AccessoryTileProps {
  item: AccessoryItem
  icon: ReactNode
  credits: number
  owned: boolean
  worn: boolean
  onBuy: () => void
  onWear: () => void
  onUnwear: () => void
}

function AccessoryTile({
  item,
  icon,
  credits,
  owned,
  worn,
  onBuy,
  onWear,
  onUnwear,
}: AccessoryTileProps) {
  const shortfall = item.price - credits
  const affordable = shortfall <= 0

  const action = worn
    ? { label: 'Unequip', onClick: onUnwear, disabled: false }
    : owned
      ? { label: 'Equip', onClick: onWear, disabled: false }
      : { label: `Buy ${item.price}c`, onClick: onBuy, disabled: !affordable }

  const caption =
    owned || affordable ? `${SLOT_LABEL[item.slot]} slot` : `${shortfall} more credits`

  return (
    <div
      className={clsx(
        'pixel-notch flex flex-col gap-2.5 border-[3px] border-ink p-2.5 shadow-[3px_3px_0_var(--ink)] transition-colors duration-150',
        worn ? 'bg-good' : 'bg-card',
      )}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={clsx(
            'flex h-12 w-12 shrink-0 items-center justify-center border-[2px] border-ink p-1.5',
            worn ? 'bg-card' : 'bg-paper',
          )}
        >
          {icon}
        </span>
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="text-[11px] font-bold uppercase leading-tight">{item.name}</span>
          <span
            className={clsx(
              'text-[9px] font-bold uppercase tracking-wide',
              owned || affordable ? 'text-[var(--text-muted)]' : 'text-warn',
            )}
          >
            {caption}
          </span>
        </span>
      </div>

      <button
        type="button"
        disabled={action.disabled}
        aria-pressed={owned ? worn : undefined}
        onClick={action.onClick}
        className={clsx(
          TILE_BUTTON,
          action.disabled
            ? TILE_BUTTON_DEAD
            : clsx(TILE_BUTTON_LIVE, worn ? 'bg-card text-ink' : 'bg-accent text-white'),
        )}
      >
        {action.label}
      </button>
    </div>
  )
}
