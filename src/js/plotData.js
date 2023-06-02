// =============================== //
//
// Plot Gene Expression Data
//
// =============================== //

// Import JS from ECharts
import * as echarts from "echarts";

// Initiate echarts variable
export let echartsPlot;

// Function to render echarts plot
export function renderPlot (data) { 

    // Select element from DOM
    const plotElement = document.getElementById("plot");
    const geneSelected = document.getElementById("gene-selector").value;

    // Proceed if gene selection box is not empty
    if (geneSelected != ""){

        // Extract data for selected gene
        let selectedGeneIndex = data.map( i => i.Gene).indexOf(geneSelected); 
        let selectedGeneData = data[selectedGeneIndex];
        console.log(selectedGeneData);

        // Initiate echarts instance
        echartsPlot = echarts.init(plotElement);

        // Specify the configuration items and data for the chart
        const option = {

            // DATA
            dataset: [
                {
                source: [
                     // Format is an array for each set of values
                     // E.g. for one tissue: [eye1, eye2, eye3, eye4]
                    [selectedGeneData.eye_1, selectedGeneData.eye_2, selectedGeneData.eye_3, selectedGeneData.eye_4],
                    [selectedGeneData.gill_1, selectedGeneData.gill_2, selectedGeneData.gill_3, selectedGeneData.gill_4],
                    [selectedGeneData.gonad_1, selectedGeneData.gonad_2, selectedGeneData.gonad_3, selectedGeneData.gonad_4],
                    [selectedGeneData.gut_1, selectedGeneData.gut_2, selectedGeneData.gut_3, selectedGeneData.gut_4],
                    [selectedGeneData.heart_1, selectedGeneData.heart_2, selectedGeneData.heart_3, selectedGeneData.heart_4],
                    [selectedGeneData.hepato_1, selectedGeneData.hepato_2, selectedGeneData.hepato_3, selectedGeneData.hepato_4],
                    [selectedGeneData.juv_1, selectedGeneData.juv_2, selectedGeneData.juv_3, selectedGeneData.juv_4],
                    [selectedGeneData.muscle_1, selectedGeneData.muscle_2, selectedGeneData.muscle_3, selectedGeneData.muscle_4],
                    [selectedGeneData.nerve_1, selectedGeneData.nerve_2, selectedGeneData.nerve_3, selectedGeneData.nerve_4],
                    [selectedGeneData.ovary_1, selectedGeneData.ovary_2, selectedGeneData.ovary_3, selectedGeneData.ovary_4],
                ],
            }, {
                transform: {
                    type: "boxplot",
                }
            }],

            // SERIES
            series: [
                {
                name: "boxplot",
                type: "boxplot",
                datasetIndex: 1,
                }
            ],

            // TITLE
            title: {
                text: `${geneSelected}: Gene Expression`
            },

            // TOOLTIP
            tooltip: {},

            // LEGEND
            legend: {
                // data : ["Eye", "Gill", "Gonad", "Gut", "Heart", "Juvenile", "Muscle", "Nerve", "Ovary"],
                left: "right",
            },

            // XAXIS
            xAxis: {
                type: "category",
                // data : ["Eye", "Gill", "Gonad", "Gut", "Heart", "Juvenile", "Muscle", "Nerve", "Ovary"],
                boundaryGap: true,
                namegap: 30,
                splitArea: {
                    show: false
                },
                splitLine: {
                    show: false
                },
            },

            // YAXIS
            yAxis: {
                type: "value",
                name: "Expression",
                splitArea: {
                    show: true
                }
            },

        };

        // Display the chart using the configuration options
        echartsPlot.setOption(option);
    };
};

