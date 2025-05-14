import React from "react";
import ReactECharts from "echarts-for-react";
import option from "./EChartsOptions";

export default function ECharts({ geneData }) {

    // Guard clause if no data is parsed
    if (!geneData.Gene_ID) return null;

    return <ReactECharts 
        option={option(geneData)}
        style={{height: "550px", width: "100%"}}
        className="echarts-for-react"
    />
}