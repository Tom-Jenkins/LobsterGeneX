import React from "react";
import ReactECharts from "echarts-for-react";
import option from "./EChartsOptions";
// import { EChart } from "./EChart";

// Import the EChartsOPtions module as a function and add arguments to allow
// echartsData and gene to be use in the JSx function below.

export default function ECharts({ geneData }) {

    // Guard clause if no data is parsed
    if (!geneData.Gene_ID) return null;

    return <ReactECharts 
        option={option(geneData)}
        style={{height: "100%", width: "100%"}}
        className="echarts-for-react"
    />

    // return <EChart 
    //     option={option}
    //     style={{height: "100%", width: "100%"}}
    // />
}