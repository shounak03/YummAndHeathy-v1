import type React from "react"

interface ChartProps {
  children: React.ReactNode
}

interface ChartPoint {
  date: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

interface ChartTooltipProps {
  children: (props: { point?: any }) => React.ReactNode;
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
    <div 
      className="chart-container" 
      data-x-axis-key={xAxisKey} 
      data-y-axis-key={yAxisKey} 
      data-chart-data={JSON.stringify(data)}
    >
      {children}
    </div>
  )
}

export const ChartGrid = () => {
  return <div className="chart-grid"></div>
}

export const ChartLine = ({ y, className, strokeWidth }: { y: number; className?: string; strokeWidth?: number }) => {
  return (
    <div 
      className={`chart-line ${className}`} 
      style={{ 
        top: `${y}%`,
        borderWidth: strokeWidth ? `${strokeWidth}px` : undefined 
      }}
    />
  )
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

export const ChartTooltip = ({ children }: ChartTooltipProps) => {
  // Create a dummy point object to prevent errors
  const dummyPoint = {
    data: {
      date: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    }
  };
  
  return (
    <div className="chart-tooltip">
      {children({ point: dummyPoint })}
    </div>
  );
}

export const ChartTooltipContent = ({ children }: ChartProps) => {
  return <div className="chart-tooltip-content">{children}</div>
}

export const ChartBar = () => {
  return <div className="chart-bar"></div>
}

