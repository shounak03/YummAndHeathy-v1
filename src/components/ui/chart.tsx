import type React from "react"

interface ChartProps {
  children: React.ReactNode
}

export const Chart = ({ children }: ChartProps) => {
  return <div className="chart">{children}</div>
}

export const ChartContainer = ({
  data,
  xAxisKey,
  yAxisKey,
  children,
}: { data: any[]; xAxisKey: string; yAxisKey: string; children: React.ReactNode }) => {
  return (
    <div className="chart-container" data-x-axis-key={xAxisKey} data-y-axis-key={yAxisKey} data={JSON.stringify(data)}>
      {children}
    </div>
  )
}

export const ChartGrid = () => {
  return <div className="chart-grid"></div>
}

export const ChartLine = ({ y, className, strokeWidth }: { y: number; className?: string; strokeWidth?: number }) => {
  return <div className={`chart-line ${className}`} style={{ "--y": y, "--stroke-width": strokeWidth }}></div>
}

export const ChartLineLayer = ({
  dataKey,
  curve,
  className,
}: { dataKey: string; curve?: string; className?: string }) => {
  return <div className={`chart-line-layer ${className}`} data-key={dataKey} data-curve={curve}></div>
}

export const ChartBarLayer = ({ dataKey, className }: { dataKey: string; className?: string }) => {
  return <div className={`chart-bar-layer ${className}`} data-key={dataKey}></div>
}

export const ChartXAxis = () => {
  return <div className="chart-x-axis"></div>
}

export const ChartYAxis = () => {
  return <div className="chart-y-axis"></div>
}

export const ChartTooltip = ({ children }: ChartProps) => {
  return <div className="chart-tooltip">{children}</div>
}

export const ChartTooltipContent = ({ children }: ChartProps) => {
  return <div className="chart-tooltip-content">{children}</div>
}

export const ChartBar = () => {
  return <div className="chart-bar"></div>
}

