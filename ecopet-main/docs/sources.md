# Sources

Every number in `frontend/src/data/emissionFactors.ts` and
`frontend/src/data/equivalences.ts` traces to a row here. Date accessed: **2026-08-29**.

## Emission factors — kg CO2e avoided per kg recycled vs. landfilled

All figures are EPA WARM (Waste Reduction Model) "Net Recycling Emissions," in
MTCO2E/short ton, converted to kg CO2e/kg via `× 1000 / 907.18474` (1 short ton
= 907.18474 kg; 1 MTCO2E = 1000 kg CO2e).

| Material | WARM category | MTCO2E/short ton | kg CO2e/kg | Exhibit | Source |
|---|---|---|---|---|---|
| `aluminium` | Aluminum Cans | −9.11 | 10.04 | Exhibit 7, Net Emissions for Metals | [Metals.pdf](https://archive.epa.gov/epawaste/conserve/tools/warm/pdfs/Metals.pdf) |
| `steel` | Steel Cans | −1.81 | 2.00 | Exhibit 7, Net Emissions for Metals | [Metals.pdf](https://archive.epa.gov/epawaste/conserve/tools/warm/pdfs/Metals.pdf) |
| `glass` | Glass (containers) | −0.28 | 0.31 | Exhibit 5, Net Emissions for Glass | [Glass.pdf](https://archive.epa.gov/epawaste/conserve/tools/warm/pdfs/Glass.pdf) |
| `pet_plastic` | PET | −1.13 | 1.25 | Exhibit 4, Net Emissions for Plastics | [Plastics.pdf](https://archive.epa.gov/epawaste/conserve/tools/warm/pdfs/Plastics.pdf) |
| `hdpe_plastic` | HDPE | −0.88 | 0.97 | Exhibit 4, Net Emissions for Plastics | [Plastics.pdf](https://archive.epa.gov/epawaste/conserve/tools/warm/pdfs/Plastics.pdf) |
| `paper_cardboard` | Corrugated Containers | −3.12 | 3.44 | Exhibit 8, Net Emissions for Paper Products | [Paper_Products.pdf](https://archive.epa.gov/epawaste/conserve/tools/warm/pdfs/Paper_Products.pdf) |
| `non_recyclable` | — | 0 | 0 | — | n/a — routed to general waste, no factor applies |

**Note on CLAUDE.md's placeholder table:** CLAUDE.md §8 gave rough placeholders (e.g.
"~9" for aluminium) explicitly marked "verify and cite every one." The figures above are
the verified replacements, pulled directly from the cited EPA WARM exhibits — not
hand-typed copies. `aluminium` came out at 10.04 rather than ~9 because the placeholder
was a round estimate; 10.04 is what the source document actually states.

Typical item masses (`typicalGrams` in `emissionFactors.ts`) are illustrative defaults for
a single can/bottle/box, not cited figures — the real per-scan mass comes from the AI's
`estimatedGrams`.

## Bin rules — Singapore

Singapore uses a single **commingled blue bin** for paper, plastic, metal and glass — no
on-site sorting by the resident; sorting happens later at a Materials Recovery Facility.
Items should be rinsed/dried until they no longer attract pests.

Source: [NEA National Recycling Programme](https://www.nea.gov.sg/our-services/waste-management/3r-programmes-and-resources/national-recycling-programme)
and the NEA recycling guide series (nea.gov.sg/docs/default-source/our-services/waste-management/).

## Equivalence tiers — `frontend/src/data/equivalences.ts`

| Tier | kg CO2e / unit | Source |
|---|---|---|
| Phone charge | 0.0124 | [EPA GHG Equivalencies Calculator](https://www.epa.gov/energy/greenhouse-gas-equivalencies-calculator-calculations-and-references) — 1.24×10⁻⁵ metric tons CO2/smartphone charged |
| km driven | 0.2443 | Same EPA calculator — 3.93×10⁻⁴ metric tons CO2e/mile ÷ 1.60934 km/mile |
| Tree-year of CO2 absorbed | 60 | Same EPA calculator — 0.060 metric tons CO2/urban tree seedling grown for 10 years, expressed as an annual rate |
| Short regional flight | 230 | DEFRA 2023 short-haul factor (0.156 kg CO2e/km) × ~1500 km regional flight distance — **lower-confidence estimate**, not a single EPA/DEFRA published per-flight figure; sanity-check before quoting to judges |

## Verification

Hand-checked figure for the demo: `computeCo2('aluminium', 15)` → `10.04 × 0.015 =
0.1506` kg CO2e for one 15 g aluminium can, against
[Metals.pdf](https://archive.epa.gov/epawaste/conserve/tools/warm/pdfs/Metals.pdf)
Exhibit 7 (Aluminum Cans, Net Recycling Emissions: −9.11 MTCO2E/short ton).
