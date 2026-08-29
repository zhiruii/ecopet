import { IconApple, IconShirt, IconCoins } from '../components/icons'
import { FOODS, ACCESSORIES } from '../data/shopItems'
import { useProgressStore } from '../store/useProgressStore'
import { usePetStore } from '../store/usePetStore'
import { BackButton } from '../components/BackButton'
import { Button } from '../components/Button'
import { Chip } from '../components/Chip'
import { ListItem } from '../components/ListItem'

interface ShopProps {
  onBack: () => void
}

export function Shop({ onBack }: ShopProps) {
  const credits = useProgressStore((s) => s.credits)
  const spend = useProgressStore((s) => s.spend)
  const feed = usePetStore((s) => s.feed)
  const own = usePetStore((s) => s.own)

  return (
    <div className="flex flex-col gap-5 p-5 pb-28">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BackButton onClick={onBack} label="Back to home" />
          <h1 className="text-xl font-black">Shop</h1>
        </div>
        <Chip tone="credit">
          <IconCoins size={14} />
          {credits}
        </Chip>
      </header>

      <section className="flex flex-col gap-2">
        <p className="text-xs font-bold uppercase tracking-wide opacity-50">Food</p>
        {FOODS.map((food) => (
          <ListItem
            key={food.id}
            icon={<IconApple size={20} />}
            title={food.name}
            subtitle={`Restores ${food.restores} hunger`}
            trailing={
              <Button
                className="px-4 py-2 text-sm"
                variant="secondary"
                onClick={() => spend(food.price) && feed(food.restores)}
              >
                {food.price}c
              </Button>
            }
          />
        ))}
      </section>

      <section className="flex flex-col gap-2">
        <p className="text-xs font-bold uppercase tracking-wide opacity-50">Accessories</p>
        {ACCESSORIES.map((item) => (
          <ListItem
            key={item.id}
            icon={<IconShirt size={20} />}
            title={item.name}
            trailing={
              <Button
                className="px-4 py-2 text-sm"
                variant="secondary"
                onClick={() => spend(item.price) && own(item.id)}
              >
                {item.price}c
              </Button>
            }
          />
        ))}
      </section>
    </div>
  )
}
