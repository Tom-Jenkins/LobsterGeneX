// =============================== //
//
// Plot Gene Expression Data
//
// =============================== //

// Import JS from ECharts
import * as echarts from "echarts";

// Order of tissues
const tissues = ["Eye", "Gill", "Nerve", "Muscle", "Heart", "Hepatopancreas", "Gut", "Ovary", "Testes", "Juvenile"];

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

            // TODO: Create a raw points data set using help from echarts examples
            
            // DATA
            dataset: [
                {
                source: [
                     // Format is an array for each set of values
                     // E.g. for one tissue: [eye1, eye2, eye3, eye4]
                    [selectedGeneData.eye_1, selectedGeneData.eye_2, selectedGeneData.eye_3, selectedGeneData.eye_4],
                    [selectedGeneData.gill_1, selectedGeneData.gill_2, selectedGeneData.gill_3, selectedGeneData.gill_4],
                    [selectedGeneData.nerve_1, selectedGeneData.nerve_2, selectedGeneData.nerve_3, selectedGeneData.nerve_4],
                    [selectedGeneData.muscle_1, selectedGeneData.muscle_2, selectedGeneData.muscle_3, selectedGeneData.muscle_4],
                    [selectedGeneData.heart_1, selectedGeneData.heart_2, selectedGeneData.heart_3, selectedGeneData.heart_4],
                    [selectedGeneData.hepato_1, selectedGeneData.hepato_2, selectedGeneData.hepato_3, selectedGeneData.hepato_4],
                    [selectedGeneData.gut_1, selectedGeneData.gut_2, selectedGeneData.gut_3, selectedGeneData.gut_4],
                    [selectedGeneData.ovary_1, selectedGeneData.ovary_2, selectedGeneData.ovary_3, selectedGeneData.ovary_4],
                    [selectedGeneData.gonad_1, selectedGeneData.gonad_2, selectedGeneData.gonad_3, selectedGeneData.gonad_4],
                    [selectedGeneData.juv_1, selectedGeneData.juv_2, selectedGeneData.juv_3, selectedGeneData.juv_4],
                ],
                }, {
                    transform: {
                        type: "boxplot",
                        config: { 
                            itemNameFormatter: function (params) {
                                return tissues[params.value];
                            }
                        }
                    }
                }
            ],

            // SERIES
            series: [
                {
                name: "Boxplot",
                type: "boxplot",
                datasetIndex: 1,
                colorBy: "data",
                }
            ],

            // COLOURS
            color: ["#F5EC88","#E4CC75","#F6C578","#DDA643","#C98B4D","#C1D49A","#7F8C63","#2B5B77","#96BED0","#5A5A56"],

            // TITLE
            title: {
                text: `Gene: ${geneSelected}`
            },

            // TOOLTIP
            tooltip: {},

            // LEGEND
            legend: {
                show: true,
                left: "right",
                formatter: "Toggle {name}"
            },

            // XAXIS
            xAxis: {
                type: "category",
                boundaryGap: true,
                splitArea: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    rotate: 90
                }
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

