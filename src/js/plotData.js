// =============================== //
//
// Plot Gene Expression Data
//
// =============================== //

// Import JS from ECharts
import * as echarts from "echarts";

// Iissue order and colours
const tissues = ["Eye", "Gill", "Nerve", "Muscle", "Heart", "Hepatopancreas", "Gut", "Ovary", "Testes", "Juvenile"];
const customCols = ["#F5EC88","#E4CC75","#F6C578","#DDA643","#C98B4D","#C1D49A","#7F8C63","#2B5B77","#96BED0","#5A5A56"];

// Function to add "none detectable" to values of 4.537 (zero transcript counts, i.e. no detectable change in expression)
const addNoneDetectable = value => value === "4.54" ? `${value} (zero transcripts)` : value;

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
        let selectedGeneIndex = data.map( i => i.Gene_ID ).indexOf(geneSelected); 
        let selectedGeneData = data[selectedGeneIndex];
        // console.log(selectedGeneData);

        // Extract minimum and maximum values
        let allValues = Object.values(selectedGeneData); // extract all expression values from object
        allValues.splice(0, 3); // remove first three elements in array
        let minValue = (Math.min(...allValues)).toFixed(0);
        let maxValue = (Math.max(...allValues)).toFixed(0);
        // console.log(minValue, maxValue);

        // Check if echartsPlot is already initialized
        if (!echartsPlot) {
            // Initiate echarts instance
            echartsPlot = echarts.init(plotElement);
        };

        // Specify the configuration items and data for the chart
        const option = {

            // DATA
            dataset: [
                {
                    datasetId: "raw",
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
                },
                {
                    transform: {
                        type: "boxplot",
                        config: { 
                            itemNameFormatter: function (params) {
                                return tissues[params.value];
                            },
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
                },
                {
                    name: "Raw Data",
                    type: "scatter",
                    data: [
                        [tissues[0], selectedGeneData.eye_1], [tissues[0], selectedGeneData.eye_2], [tissues[0], selectedGeneData.eye_3], [tissues[0], selectedGeneData.eye_4],
                        [tissues[1], selectedGeneData.gill_1], [tissues[1], selectedGeneData.gill_2], [tissues[1], selectedGeneData.gill_3], [tissues[1], selectedGeneData.gill_4],
                        [tissues[2], selectedGeneData.nerve_1], [tissues[2], selectedGeneData.nerve_2], [tissues[2], selectedGeneData.nerve_3], [tissues[2], selectedGeneData.nerve_4],
                        [tissues[3], selectedGeneData.muscle_1], [tissues[3], selectedGeneData.muscle_2], [tissues[3], selectedGeneData.muscle_3], [tissues[3], selectedGeneData.muscle_4],
                        [tissues[4], selectedGeneData.heart_1], [tissues[4], selectedGeneData.heart_2], [tissues[4], selectedGeneData.heart_3], [tissues[4], selectedGeneData.heart_4],
                        [tissues[5], selectedGeneData.hepato_1], [tissues[5], selectedGeneData.hepato_2], [tissues[5], selectedGeneData.hepato_3], [tissues[5], selectedGeneData.hepato_4],
                        [tissues[6], selectedGeneData.gut_1], [tissues[6], selectedGeneData.gut_2], [tissues[6], selectedGeneData.gut_3], [tissues[6], selectedGeneData.gut_4],
                        [tissues[7], selectedGeneData.ovary_1], [tissues[7], selectedGeneData.ovary_2], [tissues[7], selectedGeneData.ovary_3], [tissues[7], selectedGeneData.ovary_4],
                        [tissues[8], selectedGeneData.gonad_1], [tissues[8], selectedGeneData.gonad_2], [tissues[8], selectedGeneData.gonad_3], [tissues[8], selectedGeneData.gonad_4],
                        [tissues[9], selectedGeneData.juv_1], [tissues[9], selectedGeneData.juv_2], [tissues[9], selectedGeneData.juv_3], [tissues[9], selectedGeneData.juv_4],
                    ],
                    colorBy: "data",
                }
            ],

            // TOOLTIP
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "none",
                },
                formatter: function(params) {

                    // Log to console (developer)
                    // console.log(addNoneDetectable(params[1].value[1]))

                    // HTML content for tooltip
                    let tooltipContent = ``;

                    // Add both boxplot and scatter tooltips when both are selected in legend
                    if (params.length === 5) {
                        tooltipContent += `
                            <span class="legend-text" style="background-color:${params[0].color}"></span>
                            <span class="fw-bold fs-6">${params[0].name}</span>
                            </br>
                            <span>Replicate 1: <strong class="px-2">${addNoneDetectable(params[1].value[1].toFixed(0))}</strong></span>
                            </br>
                            <span>Replicate 2: <strong class="px-2">${addNoneDetectable(params[2].value[1].toFixed(0))}</strong></span>
                            </br>
                            <span>Replicate 3: <strong class="px-2">${addNoneDetectable(params[3].value[1].toFixed(0))}</strong></span>
                            </br>
                            <span>Replicate 4: <strong class="px-2">${addNoneDetectable(params[4].value[1].toFixed(0))}</strong></span>
                        `;
                    };

                    // Add only scatter tooltip when boxplot is deselected in legend
                    if (params.length === 4) {
                        tooltipContent += `
                            <span class="legend-text" style="background-color:${params[0].color}"></span>
                            <span class="fw-bold fs-6">${params[0].name}</span>
                            </br>
                            <span>Replicate 1: <strong class="px-2">${addNoneDetectable(params[0].value[1].toFixed(0))}</strong></span>
                            </br>
                            <span>Replicate 2: <strong class="px-2">${addNoneDetectable(params[1].value[1].toFixed(0))}</strong></span>
                            </br>
                            <span>Replicate 3: <strong class="px-2">${addNoneDetectable(params[2].value[1].toFixed(0))}</strong></span>
                            </br>
                            <span>Replicate 4: <strong class="px-2">${addNoneDetectable(params[1].value[1].toFixed(0))}</strong></span>
                        `;
                    };

                    // Add only boxplot tooltip when scatter is deselected in legend
                    if (params.length === 1) {
                        tooltipContent += `
                            <span class="legend-text" style="background-color:${params[0].color}"></span>
                            <span class="fw-bold fs-6">${params[0].name}</span>
                        `;
                    };

                    return tooltipContent;
                }
            },

            axisPointer:{
                snap: false
            },

            // COLOURS
            color: customCols,

            // TITLE
            title: {
                text: `Gene: ${selectedGeneData.Gene_ID}`,
                link: `https://metazoa.ensembl.org/Homarus_gammarus_gca958450375v1/Gene/Summary?g=${selectedGeneData.Gene_ID}`,

                // Render gene description at the top-left of the chart
                subtext: `Number of transcripts: ${selectedGeneData.Num_Transcripts}\n\n${selectedGeneData.Contig_ID}`,
            },

            // LEGEND
            legend: {
                show: false,
                left: "right",
                formatter: "{name}",
                itemStyle: {
                    color: "#2c3e50",
                    opacity: "0.50",
                    borderColor: "transparent"
                },
                inactiveBorderColor: "transparent",
                selected: {
                    "Boxplot": true,
                    "Raw Data": true,
                }
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
                    rotate: 90,
                    margin: 5, // distance between axis labels and axis line
                    fontSize: 15,
                    // fontFamily: "arial",
                }
            },

            // YAXIS
            yAxis: {
                type: "value",
                name: "Expression (normalised counts)",
                // nameLocation: "start",
                // nameGap: 60,
                // splitArea: {
                //     show: true
                // },
                // min: "dataMin",
                // max: "dataMax",
                min: minValue,
                max: maxValue,
                axisLabel: {
                    fontSize: 15,
                    // fontFamily: "arial",
                },
                nameTextStyle: {
                    fontSize: 12,
                    align: "left",
                }
            },

            // GRID
            grid: {
                top: "22%", // padding between chart and subtitle
                bottom: "25%",
                left: "15%",
                // containLabel: true
            },

            // TOOLBOX FEATURES
            toolbox: {
                show: true,
                itemSize: 20,
                orient: "vertical",
                top: "10%",
                right: "1%",                
                feature: {
                    // dataZoom: {},
                    dataView: {
                        show: true,
                        readOnly: true,
                        buttonColor: "#00498f",
                        lang: ["Data View (copy and paste text into spreadsheet software for external use)", "Close"],
                        optionToContent: function (opt) {
                            const dataViewData = [
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
                            ]

                            // Header row
                            const header = "Tissue\tReplicate1\tReplicate2\tReplicate3\tReplicate4";

                            // Format the data for textarea
                            const formattedText = dataViewData
                                .map((row, index) => `${tissues[index]}\t${row.join("\t")}`)
                                .join("\n");
                            
                            // Combine header and data
                            const completeText = `${header}\n${formattedText}`;

                            // Create a textarea element with the formatted text
                            const textbox = `<textarea style="resize: none; width: 100%; height: 98.5%;">${completeText}</textarea>`;
                            return textbox;
                            
                        }
                    },
                    // restore: { title: "Reset" },
                    saveAsImage: {
                        type: "png",
                        name: `${geneSelected}_expression`,
                        title: "Save as PNG",
                        pixelRatio: 12
                    }
                }
            },

        };
        
        // Display the chart using the configuration options
        echartsPlot.setOption(option);
    };
};

