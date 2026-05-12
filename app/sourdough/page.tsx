"use client";

import { useState } from "react";

type Flour = {
  id: string;
  name: string;
  extraction: number;
  percentage: number;
};

type ValueMode = "percent" | "grams";

const fmt = (n: number, digits = 1) => {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  });
};

let flourIdCounter = 0;
const newFlourId = () => `f${++flourIdCounter}`;

const defaultFlours = (): Flour[] => [
  { id: newFlourId(), name: "Bread flour", extraction: 75, percentage: 80 },
  { id: newFlourId(), name: "Whole wheat", extraction: 100, percentage: 20 },
];

export default function SourdoughPage() {
  const [totalFlour, setTotalFlour] = useState<number>(1000);
  const [flours, setFlours] = useState<Flour[]>(defaultFlours);

  const [waterMode, setWaterMode] = useState<ValueMode>("percent");
  const [waterValue, setWaterValue] = useState<number>(75);

  const [saltMode, setSaltMode] = useState<ValueMode>("percent");
  const [saltValue, setSaltValue] = useState<number>(2);

  const [starterAmount, setStarterAmount] = useState<number>(200);
  const [starterHydration, setStarterHydration] = useState<number>(100);

  const flourPercentSum = flours.reduce(
    (s, f) => s + (Number.isFinite(f.percentage) ? f.percentage : 0),
    0,
  );

  const waterGrams =
    waterMode === "percent" ? (waterValue / 100) * totalFlour : waterValue;
  const waterPercent =
    waterMode === "percent"
      ? waterValue
      : totalFlour > 0
        ? (waterValue / totalFlour) * 100
        : 0;

  const saltGrams =
    saltMode === "percent" ? (saltValue / 100) * totalFlour : saltValue;
  const saltPercent =
    saltMode === "percent"
      ? saltValue
      : totalFlour > 0
        ? (saltValue / totalFlour) * 100
        : 0;

  const starterFlour =
    starterHydration >= 0 && starterAmount > 0
      ? starterAmount / (1 + starterHydration / 100)
      : 0;
  const starterWater = starterAmount - starterFlour;

  const flourRows = flours.map((f) => {
    const grams = (f.percentage / 100) * totalFlour;
    return { ...f, grams };
  });

  const totalDoughFlour = totalFlour + starterFlour;
  const totalDoughWater = waterGrams + starterWater;
  const totalDough = totalDoughFlour + totalDoughWater + saltGrams;

  const effectiveHydration =
    totalDoughFlour > 0 ? (totalDoughWater / totalDoughFlour) * 100 : 0;
  const effectiveSaltPercent =
    totalDoughFlour > 0 ? (saltGrams / totalDoughFlour) * 100 : 0;
  const prefermentedFlourPercent =
    totalFlour > 0 ? (starterFlour / totalFlour) * 100 : 0;

  const weightedExtraction =
    flourPercentSum > 0
      ? flours.reduce((s, f) => s + f.extraction * f.percentage, 0) /
        flourPercentSum
      : 0;

  const flourSumOff = Math.abs(flourPercentSum - 100) > 0.01;

  const updateFlour = (id: string, patch: Partial<Flour>) => {
    setFlours((rows) =>
      rows.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    );
  };

  const addFlour = () => {
    setFlours((rows) => [
      ...rows,
      { id: newFlourId(), name: "New flour", extraction: 75, percentage: 0 },
    ]);
  };

  const removeFlour = (id: string) => {
    setFlours((rows) => rows.filter((r) => r.id !== id));
  };

  const toggleWaterMode = () => {
    if (waterMode === "percent") {
      setWaterValue(Number(((waterValue / 100) * totalFlour).toFixed(1)));
      setWaterMode("grams");
    } else {
      setWaterValue(
        totalFlour > 0
          ? Number(((waterValue / totalFlour) * 100).toFixed(2))
          : 0,
      );
      setWaterMode("percent");
    }
  };

  const toggleSaltMode = () => {
    if (saltMode === "percent") {
      setSaltValue(Number(((saltValue / 100) * totalFlour).toFixed(1)));
      setSaltMode("grams");
    } else {
      setSaltValue(
        totalFlour > 0
          ? Number(((saltValue / totalFlour) * 100).toFixed(2))
          : 0,
      );
      setSaltMode("percent");
    }
  };

  const distributeRemainder = () => {
    if (flours.length === 0) return;
    const others = flours.slice(0, -1).reduce((s, f) => s + f.percentage, 0);
    const last = flours[flours.length - 1];
    updateFlour(last.id, { percentage: Math.max(0, 100 - others) });
  };

  const inputClass =
    "w-full rounded-md border border-fd-border bg-fd-black px-3 py-2 text-sm text-white placeholder:text-fd-gray/40 focus:outline-none focus:border-fd-orange/60 transition-colors";
  const labelClass = "text-xs font-medium uppercase tracking-wide text-fd-gray";
  const cardClass =
    "rounded-xl border border-fd-border bg-fd-surface p-5 sm:p-6";

  return (
    <main className="min-h-screen px-4 py-10 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-fd-orange">
            Baker&apos;s Workshop
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
            Sourdough Calculator
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-fd-gray">
            Build a recipe by baker&apos;s percentage. Mix multiple flours at
            different extraction levels, dial in hydration, salt, and a starter —
            the starter&apos;s flour and water are folded into the totals
            automatically.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-5">
          <section className="lg:col-span-3 space-y-6">
            <div className={cardClass}>
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-fd-gray-light">
                  Total flour
                </h2>
                <span className="text-xs text-fd-gray">
                  100% baseline for all percentages
                </span>
              </div>
              <div className="mt-3 flex items-end gap-3">
                <input
                  type="number"
                  min={0}
                  step={10}
                  value={totalFlour}
                  onChange={(e) => setTotalFlour(Number(e.target.value) || 0)}
                  className={`${inputClass} max-w-[160px] text-lg`}
                />
                <span className="pb-2 text-sm text-fd-gray">grams</span>
              </div>
            </div>

            <div className={cardClass}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-fd-gray-light">
                  Flours
                </h2>
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={
                      flourSumOff ? "text-fd-yellow" : "text-fd-green"
                    }
                  >
                    Sum: {fmt(flourPercentSum, 2)}%
                  </span>
                  {flourSumOff && (
                    <button
                      onClick={distributeRemainder}
                      className="rounded border border-fd-border px-2 py-1 text-fd-gray hover:border-fd-orange/50 hover:text-white"
                    >
                      Fix last to 100%
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="hidden grid-cols-12 gap-2 px-1 text-[10px] font-medium uppercase tracking-wider text-fd-gray sm:grid">
                  <div className="col-span-5">Flour</div>
                  <div className="col-span-2">Extraction</div>
                  <div className="col-span-2">% of flour</div>
                  <div className="col-span-2">Grams</div>
                  <div className="col-span-1"></div>
                </div>

                {flourRows.map((f) => (
                  <div
                    key={f.id}
                    className="grid grid-cols-2 gap-2 rounded-lg border border-fd-border bg-fd-black/40 p-3 sm:grid-cols-12 sm:items-center sm:border-0 sm:bg-transparent sm:p-0"
                  >
                    <label className="col-span-2 sm:col-span-5">
                      <span className="mb-1 block text-[10px] uppercase text-fd-gray sm:hidden">
                        Flour
                      </span>
                      <input
                        type="text"
                        value={f.name}
                        onChange={(e) =>
                          updateFlour(f.id, { name: e.target.value })
                        }
                        className={inputClass}
                      />
                    </label>
                    <label className="sm:col-span-2">
                      <span className="mb-1 block text-[10px] uppercase text-fd-gray sm:hidden">
                        Extraction %
                      </span>
                      <div className="relative">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          step={1}
                          value={f.extraction}
                          onChange={(e) =>
                            updateFlour(f.id, {
                              extraction: Number(e.target.value) || 0,
                            })
                          }
                          className={`${inputClass} pr-7`}
                        />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-fd-gray">
                          %
                        </span>
                      </div>
                    </label>
                    <label className="sm:col-span-2">
                      <span className="mb-1 block text-[10px] uppercase text-fd-gray sm:hidden">
                        % of total flour
                      </span>
                      <div className="relative">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          step={0.5}
                          value={f.percentage}
                          onChange={(e) =>
                            updateFlour(f.id, {
                              percentage: Number(e.target.value) || 0,
                            })
                          }
                          className={`${inputClass} pr-7`}
                        />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-fd-gray">
                          %
                        </span>
                      </div>
                    </label>
                    <div className="sm:col-span-2">
                      <span className="mb-1 block text-[10px] uppercase text-fd-gray sm:hidden">
                        Grams
                      </span>
                      <div className="text-sm text-white">
                        {fmt(f.grams)} g
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-end sm:col-span-1">
                      <button
                        onClick={() => removeFlour(f.id)}
                        disabled={flours.length === 1}
                        className="text-xs text-fd-gray hover:text-fd-red disabled:opacity-30"
                        aria-label={`Remove ${f.name}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addFlour}
                className="mt-4 rounded-md border border-fd-border bg-fd-black px-3 py-2 text-xs text-fd-gray-light hover:border-fd-orange/50 hover:text-white"
              >
                + Add flour
              </button>

              <p className="mt-3 text-xs text-fd-gray">
                Weighted extraction:{" "}
                <span className="text-fd-gray-light">
                  {fmt(weightedExtraction, 1)}%
                </span>
                . These flours are the static 100% baseline. The starter adds
                its own flour and water on top.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className={cardClass}>
                <div className="flex items-center justify-between">
                  <h2 className={labelClass}>Water</h2>
                  <button
                    onClick={toggleWaterMode}
                    className="rounded border border-fd-border bg-fd-black px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-fd-gray-light hover:border-fd-orange/50"
                  >
                    {waterMode === "percent" ? "Switch to grams" : "Switch to %"}
                  </button>
                </div>
                <div className="mt-3 flex items-end gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      step={waterMode === "percent" ? 0.5 : 5}
                      value={waterValue}
                      onChange={(e) =>
                        setWaterValue(Number(e.target.value) || 0)
                      }
                      className={`${inputClass} max-w-[140px] pr-9 text-lg`}
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-fd-gray">
                      {waterMode === "percent" ? "%" : "g"}
                    </span>
                  </div>
                </div>
                <dl className="mt-4 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-fd-gray">Water added</dt>
                    <dd className="text-white">{fmt(waterGrams)} g</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-fd-gray">Baker&apos;s %</dt>
                    <dd className="text-white">{fmt(waterPercent, 2)}%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-fd-gray">
                      Total water (incl. starter)
                    </dt>
                    <dd className="text-fd-gray-light">
                      {fmt(totalDoughWater)} g
                    </dd>
                  </div>
                </dl>
              </div>

              <div className={cardClass}>
                <div className="flex items-center justify-between">
                  <h2 className={labelClass}>Salt</h2>
                  <button
                    onClick={toggleSaltMode}
                    className="rounded border border-fd-border bg-fd-black px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-fd-gray-light hover:border-fd-orange/50"
                  >
                    {saltMode === "percent" ? "Switch to grams" : "Switch to %"}
                  </button>
                </div>
                <div className="mt-3 flex items-end gap-3">
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      step={saltMode === "percent" ? 0.1 : 1}
                      value={saltValue}
                      onChange={(e) =>
                        setSaltValue(Number(e.target.value) || 0)
                      }
                      className={`${inputClass} max-w-[140px] pr-9 text-lg`}
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-fd-gray">
                      {saltMode === "percent" ? "%" : "g"}
                    </span>
                  </div>
                </div>
                <dl className="mt-4 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-fd-gray">Total salt</dt>
                    <dd className="text-white">{fmt(saltGrams, 2)} g</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-fd-gray">As baker&apos;s %</dt>
                    <dd className="text-white">{fmt(saltPercent, 2)}%</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className={cardClass}>
              <h2 className={labelClass}>Starter (levain)</h2>
              <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label>
                  <span className="mb-1 block text-xs text-fd-gray">
                    Amount
                  </span>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      step={5}
                      value={starterAmount}
                      onChange={(e) =>
                        setStarterAmount(Number(e.target.value) || 0)
                      }
                      className={`${inputClass} pr-9 text-lg`}
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-fd-gray">
                      g
                    </span>
                  </div>
                </label>
                <label>
                  <span className="mb-1 block text-xs text-fd-gray">
                    Hydration
                  </span>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      step={5}
                      value={starterHydration}
                      onChange={(e) =>
                        setStarterHydration(Number(e.target.value) || 0)
                      }
                      className={`${inputClass} pr-9 text-lg`}
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-fd-gray">
                      %
                    </span>
                  </div>
                </label>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between rounded-md bg-fd-black/40 px-3 py-2">
                  <dt className="text-fd-gray">Starter flour</dt>
                  <dd className="text-white">{fmt(starterFlour)} g</dd>
                </div>
                <div className="flex justify-between rounded-md bg-fd-black/40 px-3 py-2">
                  <dt className="text-fd-gray">Starter water</dt>
                  <dd className="text-white">{fmt(starterWater)} g</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-fd-gray">
                Starter flour and water are added on top of the recipe — they
                bump total flour, total water, and the effective hydration of
                the final dough.
              </p>
            </div>
          </section>

          <aside className="lg:col-span-2">
            <div className="sticky top-6 space-y-4">
              <div
                className={`${cardClass} border-fd-orange/30 bg-gradient-to-b from-fd-orange/5 to-transparent`}
              >
                <h2 className="text-sm font-semibold uppercase tracking-wide text-fd-orange">
                  Recipe totals
                </h2>
                <p className="mt-1 text-xs text-fd-gray">
                  Base recipe → with starter folded in.
                </p>
                <dl className="mt-4 space-y-2 text-sm">
                  <Row
                    label="Flour"
                    value={`${fmt(totalFlour)} g`}
                    sub="100%"
                  />
                  <Row
                    label="Water"
                    value={`${fmt(waterGrams)} g`}
                    sub={`${fmt(waterPercent, 1)}%`}
                  />
                  <Row
                    label="Salt"
                    value={`${fmt(saltGrams, 2)} g`}
                    sub={`${fmt(saltPercent, 2)}%`}
                  />
                  <Row
                    label="Starter"
                    value={`${fmt(starterAmount)} g`}
                    sub={`${fmt(prefermentedFlourPercent, 1)}% pre-fermented flour`}
                  />
                  <div className="my-3 h-px bg-fd-border" />
                  <Row
                    label="Total flour"
                    value={`${fmt(totalDoughFlour)} g`}
                    sub="incl. starter flour"
                  />
                  <Row
                    label="Total water"
                    value={`${fmt(totalDoughWater)} g`}
                    sub={`${fmt(effectiveHydration, 1)}% effective hydration`}
                  />
                  <Row
                    label="Salt (effective)"
                    value={`${fmt(saltGrams, 2)} g`}
                    sub={`${fmt(effectiveSaltPercent, 2)}%`}
                  />
                  <div className="my-3 h-px bg-fd-border" />
                  <Row
                    label="Total dough"
                    value={`${fmt(totalDough)} g`}
                    emphasis
                  />
                </dl>
              </div>

              <div className={cardClass}>
                <h2 className={labelClass}>Mix sheet</h2>
                <p className="mt-1 text-xs text-fd-gray">
                  What you actually weigh out.
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {flourRows.map((f) => (
                    <li key={f.id} className="flex justify-between gap-2">
                      <span className="text-fd-gray-light">
                        {f.name || "Flour"}
                        <span className="ml-1 text-xs text-fd-gray">
                          ({fmt(f.extraction, 0)}% ext.)
                        </span>
                      </span>
                      <span className="text-white">{fmt(f.grams)} g</span>
                    </li>
                  ))}
                  <li className="flex justify-between gap-2">
                    <span className="text-fd-gray-light">Water</span>
                    <span className="text-white">{fmt(waterGrams)} g</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span className="text-fd-gray-light">Salt</span>
                    <span className="text-white">{fmt(saltGrams, 2)} g</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span className="text-fd-gray-light">Starter</span>
                    <span className="text-white">{fmt(starterAmount)} g</span>
                  </li>
                  <li className="mt-2 flex justify-between gap-2 border-t border-fd-border pt-2 text-xs">
                    <span className="text-fd-gray">Total</span>
                    <span className="text-fd-gray-light">
                      {fmt(totalDough)} g
                    </span>
                  </li>
                </ul>
              </div>

              {flourSumOff && (
                <div className="rounded-lg border border-fd-yellow/40 bg-fd-yellow/5 px-4 py-3 text-xs text-fd-yellow">
                  Flour percentages currently sum to {fmt(flourPercentSum, 2)}%.
                  They should add up to 100% of the entered total flour weight.
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Row({
  label,
  value,
  sub,
  emphasis,
}: {
  label: string;
  value: string;
  sub?: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className={emphasis ? "text-white" : "text-fd-gray"}>{label}</dt>
      <dd
        className={
          emphasis
            ? "text-lg font-semibold text-white"
            : "flex items-baseline gap-2 text-white"
        }
      >
        {!emphasis && sub && (
          <span className="text-xs text-fd-gray">{sub}</span>
        )}
        <span>{value}</span>
        {emphasis && sub && (
          <span className="ml-2 text-xs text-fd-gray">{sub}</span>
        )}
      </dd>
    </div>
  );
}
