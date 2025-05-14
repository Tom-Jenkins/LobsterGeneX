import React, { useMemo, useRef, useEffect } from 'react'
import { init, getInstanceByDom } from 'echarts'
import { debounce } from 'lodash'

export const EChart = ({
  option,
  chartSettings,
  optionSettings,
  style = { width: '100%', height: '350px' },
  events = {},
  ...props
}) => {
  const chartRef = useRef(null)

  // Debounce resize event so it only fires periodically instead of constantly
  const resizeChart = useMemo(
    () =>
      debounce(() => {
        if (chartRef.current) {
          const chart = getInstanceByDom(chartRef.current)
          chart.resize()
        }
      }, 50),
    []
  )

  useEffect(() => {
    // Initialize chart
    const chart = init(chartRef.current, null, chartSettings)

    // Set up event listeners
    for (const [key, handler] of Object.entries(events)) {
      chart.on(key, (param) => {
        handler(param)
      })
    }

    // Resize event listener
    const resizeObserver = new ResizeObserver(() => {
      resizeChart()
    })
    resizeObserver.observe(chartRef.current)

    // Return cleanup function
    return () => {
      chart?.dispose()

      if (chartRef.current) {
        resizeObserver.unobserve(chartRef.current)
      }
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    // Re-render chart when option changes
    const chart = getInstanceByDom(chartRef.current)

    chart.setOption(option, optionSettings)
  }, [option])

  return <div ref={chartRef} style={style} {...props} />
}