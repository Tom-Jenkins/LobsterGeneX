import React from "react";
import ReactECharts from "echarts-for-react";
import option from "./EChartsOptions";

export default function ECharts({ geneData }) {
  // Guard clause if no data is parsed
  if (!geneData.Gene_ID) return null;

  // Condition height for mobiles and larger screens
  const chartHeight = window.innerWidth > 768 ? "100%" : "550px";

  return (
    <ReactECharts
      option={option(geneData)}
      style={{ height: chartHeight }}
      className="echarts-for-react w-full overflow-hidden px-6"
    />
  );
}
