<script lang="ts">
  import { cn } from "../../internal/class.js";
  import type { ChartProps, ChartSeries, ChartDataPoint } from "./chart.types.js";

  let {
    kind = "bar",
    series = [],
    data = [],
    labels = [],
    height = 240,
    showLegend = true,
    showValues = false,
    yAxisLabel,
    xAxisLabel,
    "aria-label": ariaLabel = "Chart",
    colors = [
      "var(--pui-color-primary, #5b8def)",
      "var(--pui-color-success, #5cb88f)",
      "var(--pui-color-warning, #e8b94a)",
      "var(--pui-color-error, #e36464)",
      "var(--pui-text-secondary, #888)",
    ],
    onPointClick,
    class: className,
    style,
    id,
    "data-testid": dataTestId,
  }: ChartProps = $props();

  let _autoId = $props.id();
  const chartId = $derived(id ?? _autoId);

  // Effective datasets
  const datasets = $derived.by((): ChartSeries[] => {
    if (series.length > 0) return series;
    if (data.length > 0) return [{ name: "Value", data: data.map((d) => d.value) }];
    return [];
  });

  const effectiveLabels = $derived.by((): string[] => {
    if (labels.length > 0) return labels;
    if (data.length > 0) return data.map((d) => d.label);
    return datasets[0]?.data.map((_, i) => String(i + 1)) ?? [];
  });

  // ── Bar chart layout ──
  const PADDING = { top: 16, right: 16, bottom: 32, left: 40 };
  const VIEW_W = 600;
  const viewH = $derived(height);

  const allValues = $derived(datasets.flatMap((s) => s.data));
  const maxValue = $derived(Math.max(1, ...allValues));
  const yTicks = $derived.by(() => {
    const ticks: number[] = [];
    const step = maxValue / 4;
    for (let i = 0; i <= 4; i++) ticks.push(Math.round(step * i));
    return ticks;
  });

  const innerW = $derived(VIEW_W - PADDING.left - PADDING.right);
  const innerH = $derived(viewH - PADDING.top - PADDING.bottom);

  function bandWidth(): number {
    const n = effectiveLabels.length;
    if (n === 0) return 0;
    const groupW = innerW / n;
    return datasets.length > 0 ? groupW * 0.7 : groupW * 0.6;
  }

  function barX(groupIdx: number, seriesIdx: number): number {
    const n = effectiveLabels.length;
    if (n === 0) return PADDING.left;
    const groupW = innerW / n;
    const groupStart = PADDING.left + groupIdx * groupW;
    const w = bandWidth();
    const totalW = w * datasets.length + 4 * (datasets.length - 1);
    return groupStart + (groupW - totalW) / 2 + seriesIdx * (w + 4);
  }

  function barY(v: number): number {
    return PADDING.top + innerH - (v / maxValue) * innerH;
  }

  function barH(v: number): number {
    return (v / maxValue) * innerH;
  }

  // ── Line chart layout ──
  function lineX(i: number): number {
    const n = effectiveLabels.length;
    if (n <= 1) return PADDING.left;
    return PADDING.left + (i / (n - 1)) * innerW;
  }
  function lineY(v: number): number {
    return PADDING.top + innerH - (v / maxValue) * innerH;
  }

  // ── Pie chart layout ──
  const pieTotal = $derived(data.reduce((sum, d) => sum + d.value, 0));
  const pieRadius = $derived(Math.min(VIEW_W, viewH) / 2 - 24);
  const pieCx = $derived(VIEW_W / 2);
  const pieCy = $derived(viewH / 2);

  function pieSlice(i: number): { path: string; midAngle: number; labelX: number; labelY: number } {
    if (pieTotal === 0) return { path: "", midAngle: 0, labelX: 0, labelY: 0 };
    const start = data.slice(0, i).reduce((s, d) => s + d.value, 0);
    const end = start + data[i].value;
    const startAngle = (start / pieTotal) * Math.PI * 2 - Math.PI / 2;
    const endAngle = (end / pieTotal) * Math.PI * 2 - Math.PI / 2;
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    const x1 = pieCx + pieRadius * Math.cos(startAngle);
    const y1 = pieCy + pieRadius * Math.sin(startAngle);
    const x2 = pieCx + pieRadius * Math.cos(endAngle);
    const y2 = pieCy + pieRadius * Math.sin(endAngle);
    const path = `M ${pieCx} ${pieCy} L ${x1} ${y1} A ${pieRadius} ${pieRadius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    const midAngle = (startAngle + endAngle) / 2;
    const labelR = pieRadius * 0.65;
    const labelX = pieCx + labelR * Math.cos(midAngle);
    const labelY = pieCy + labelR * Math.sin(midAngle);
    return { path, midAngle, labelX, labelY };
  }

  function colorFor(i: number): string {
    return colors[i % colors.length];
  }
</script>

<div
  {id}
  class={cn("pui-chart flex flex-col gap-3", className)}
  {style}
  data-testid={dataTestId}
  role="img"
  aria-label={ariaLabel}
>
  <svg
    viewBox="0 0 {VIEW_W} {viewH}"
    preserveAspectRatio="xMidYMid meet"
    class="w-full h-auto"
  >
    {#if kind === "bar"}
      <!-- Y-axis grid + ticks -->
      {#each yTicks as t}
        <line
          x1={PADDING.left}
          x2={VIEW_W - PADDING.right}
          y1={PADDING.top + innerH - (t / maxValue) * innerH}
          y2={PADDING.top + innerH - (t / maxValue) * innerH}
          stroke="var(--pui-outline-subtle, #eee)"
          stroke-dasharray="2 4"
        />
        <text
          x={PADDING.left - 8}
          y={PADDING.top + innerH - (t / maxValue) * innerH + 4}
          text-anchor="end"
          font-size="10"
          fill="var(--pui-text-disabled, #999)"
        >{t}</text>
      {/each}
      <!-- Bars -->
      {#each datasets as ds, si}
        {#each ds.data as v, i}
          {@const bx = barX(i, si)}
          {@const by = barY(v)}
          {@const bh = barH(v)}
          <rect
            x={bx}
            y={by}
            width={bandWidth()}
            height={bh}
            rx="3"
            fill={ds.color ?? colorFor(si)}
            class="cursor-pointer transition-opacity hover:opacity-80"
            onclick={() => onPointClick?.(i, si)}
            onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPointClick?.(i, si); } }}
            role="button"
            tabindex={onPointClick ? 0 : -1}
            aria-label={`${ds.name} ${effectiveLabels[i]}: ${v}`}
          >
            <title>{ds.name} · {effectiveLabels[i]} · {v}</title>
          </rect>
          {#if showValues}
            <text
              x={bx + bandWidth() / 2}
              y={by - 4}
              text-anchor="middle"
              font-size="10"
              fill="var(--pui-text-secondary, #666)"
            >{v}</text>
          {/if}
        {/each}
      {/each}
      <!-- X-axis labels -->
      {#each effectiveLabels as l, i}
        {@const groupW = innerW / Math.max(1, effectiveLabels.length)}
        <text
          x={PADDING.left + i * groupW + groupW / 2}
          y={viewH - 8}
          text-anchor="middle"
          font-size="10"
          fill="var(--pui-text-disabled, #999)"
        >{l}</text>
      {/each}
      {#if xAxisLabel}
        <text x={VIEW_W / 2} y={viewH - 2} text-anchor="middle" font-size="10" fill="var(--pui-text-secondary, #666)">{xAxisLabel}</text>
      {/if}
      {#if yAxisLabel}
        <text
          x={-viewH / 2}
          y={12}
          transform="rotate(-90)"
          text-anchor="middle"
          font-size="10"
          fill="var(--pui-text-secondary, #666)"
        >{yAxisLabel}</text>
      {/if}
    {:else if kind === "line"}
      <!-- Grid -->
      {#each yTicks as t}
        <line
          x1={PADDING.left}
          x2={VIEW_W - PADDING.right}
          y1={PADDING.top + innerH - (t / maxValue) * innerH}
          y2={PADDING.top + innerH - (t / maxValue) * innerH}
          stroke="var(--pui-outline-subtle, #eee)"
          stroke-dasharray="2 4"
        />
      {/each}
      <!-- Lines -->
      {#each datasets as ds, si}
        <polyline
          points={ds.data.map((v, i) => `${lineX(i)},${lineY(v)}`).join(' ')}
          fill="none"
          stroke={ds.color ?? colorFor(si)}
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        {#each ds.data as v, i}
          <circle
            cx={lineX(i)}
            cy={lineY(v)}
            r="4"
            fill={ds.color ?? colorFor(si)}
            class="cursor-pointer transition-opacity hover:opacity-80"
            onclick={() => onPointClick?.(i, si)}
            onkeydown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onPointClick?.(i, si); } }}
            role="button"
            tabindex={onPointClick ? 0 : -1}
            aria-label={`${ds.name} ${effectiveLabels[i]}: ${v}`}
          >
            <title>{ds.name} · {effectiveLabels[i]} · {v}</title>
          </circle>
        {/each}
      {/each}
      {#each effectiveLabels as l, i}
        {@const groupW = innerW / Math.max(1, effectiveLabels.length)}
        <text
          x={PADDING.left + i * groupW + groupW / 2}
          y={viewH - 8}
          text-anchor="middle"
          font-size="10"
          fill="var(--pui-text-disabled, #999)"
        >{l}</text>
      {/each}
    {:else if kind === "pie"}
      {#each data as slice, i}
        {@const s = pieSlice(i)}
        <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
        <path
          d={s.path}
          fill={colorFor(i)}
          class="cursor-pointer transition-opacity hover:opacity-80"
          onclick={() => onPointClick?.(i, 0)}
          role="button"
          tabindex="0"
          aria-label={`${slice.label}: ${slice.value}`}
        >
          <title>{slice.label}: {slice.value}</title>
        </path>
        {#if showValues && pieTotal > 0}
          <text
            x={s.labelX}
            y={s.labelY}
            text-anchor="middle"
            font-size="11"
            font-weight="600"
            fill="white"
          >{Math.round((slice.value / pieTotal) * 100)}%</text>
        {/if}
      {/each}
    {/if}
  </svg>

  {#if showLegend}
    {#if kind === "pie"}
      <ul class="flex flex-wrap items-center gap-3 text-xs" role="list">
        {#each data as slice, i}
          <li class="flex items-center gap-1.5">
            <span
              class="inline-block w-3 h-3 rounded-sm shrink-0"
              style="background-color: {colorFor(i)}"
              aria-hidden="true"
            ></span>
            <span class="text-(--pui-text-secondary)">{slice.label}</span>
            <span class="text-(--pui-text-disabled)">({slice.value})</span>
          </li>
        {/each}
      </ul>
    {:else if datasets.length > 0}
      <ul class="flex flex-wrap items-center gap-3 text-xs" role="list">
        {#each datasets as ds, i}
          <li class="flex items-center gap-1.5">
            <span
              class="inline-block w-3 h-3 rounded-sm shrink-0"
              style="background-color: {ds.color ?? colorFor(i)}"
              aria-hidden="true"
            ></span>
            <span class="text-(--pui-text-secondary)">{ds.name}</span>
          </li>
        {/each}
      </ul>
    {/if}
  {/if}
</div>
