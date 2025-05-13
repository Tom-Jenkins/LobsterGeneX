// import { EChart } from "echarts";

export default function Chart({ data, gene }) {

    // Guard clause if no data is parsed
    if (!data || !gene) return null;


    return(
        <div className="chart__container">
            <div id="plot"></div>
        </div>
    );
}