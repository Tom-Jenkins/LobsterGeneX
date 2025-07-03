// Tissue order and colours
const tissues = [
  "Eye",
  "Gill",
  "Nerve",
  "Muscle",
  "Heart",
  "Hepatopancreas",
  "Gut",
  "Ovary",
  "Testes",
  "Juvenile",
];
const customCols = [
  "#F5EC88",
  "#E4CC75",
  "#F6C578",
  "#DDA643",
  "#C98B4D",
  "#C1D49A",
  "#7F8C63",
  "#2B5B77",
  "#96BED0",
  "#5A5A56",
];

// Function to add "none detectable" to values of 4.537 (zero transcript counts, i.e. no detectable change in expression)
const addNoneDetectable = (value) =>
  value === "4.54" ? `${value} (zero transcripts)` : value;

// Chart options
export default function option(geneData) {
  // Extract minimum and maximum values
  const allValues = Object.values(geneData); // extract all expression values from object
  allValues.splice(0, 3); // remove first three elements in array
  const minValue = Math.min(...allValues).toFixed(0);
  const maxValue = Math.max(...allValues).toFixed(0);
  // console.log(geneData, allValues, minValue, maxValue);

  const echartsOption = {
    // DATA
    dataset: [
      {
        datasetId: "raw",
        source: [
          // Format is an array for each set of values
          // E.g. for one tissue: [eye1, eye2, eye3, eye4]
          [geneData.eye_1, geneData.eye_2, geneData.eye_3, geneData.eye_4],
          [geneData.gill_1, geneData.gill_2, geneData.gill_3, geneData.gill_4],
          [
            geneData.nerve_1,
            geneData.nerve_2,
            geneData.nerve_3,
            geneData.nerve_4,
          ],
          [
            geneData.muscle_1,
            geneData.muscle_2,
            geneData.muscle_3,
            geneData.muscle_4,
          ],
          [
            geneData.heart_1,
            geneData.heart_2,
            geneData.heart_3,
            geneData.heart_4,
          ],
          [
            geneData.hepato_1,
            geneData.hepato_2,
            geneData.hepato_3,
            geneData.hepato_4,
          ],
          [geneData.gut_1, geneData.gut_2, geneData.gut_3, geneData.gut_4],
          [
            geneData.ovary_1,
            geneData.ovary_2,
            geneData.ovary_3,
            geneData.ovary_4,
          ],
          [
            geneData.gonad_1,
            geneData.gonad_2,
            geneData.gonad_3,
            geneData.gonad_4,
          ],
          [geneData.juv_1, geneData.juv_2, geneData.juv_3, geneData.juv_4],
        ],
      },
      {
        transform: {
          type: "boxplot",
          config: {
            itemNameFormatter: function (params) {
              return tissues[params.value];
            },
          },
        },
      },
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
          [tissues[0], geneData.eye_1],
          [tissues[0], geneData.eye_2],
          [tissues[0], geneData.eye_3],
          [tissues[0], geneData.eye_4],
          [tissues[1], geneData.gill_1],
          [tissues[1], geneData.gill_2],
          [tissues[1], geneData.gill_3],
          [tissues[1], geneData.gill_4],
          [tissues[2], geneData.nerve_1],
          [tissues[2], geneData.nerve_2],
          [tissues[2], geneData.nerve_3],
          [tissues[2], geneData.nerve_4],
          [tissues[3], geneData.muscle_1],
          [tissues[3], geneData.muscle_2],
          [tissues[3], geneData.muscle_3],
          [tissues[3], geneData.muscle_4],
          [tissues[4], geneData.heart_1],
          [tissues[4], geneData.heart_2],
          [tissues[4], geneData.heart_3],
          [tissues[4], geneData.heart_4],
          [tissues[5], geneData.hepato_1],
          [tissues[5], geneData.hepato_2],
          [tissues[5], geneData.hepato_3],
          [tissues[5], geneData.hepato_4],
          [tissues[6], geneData.gut_1],
          [tissues[6], geneData.gut_2],
          [tissues[6], geneData.gut_3],
          [tissues[6], geneData.gut_4],
          [tissues[7], geneData.ovary_1],
          [tissues[7], geneData.ovary_2],
          [tissues[7], geneData.ovary_3],
          [tissues[7], geneData.ovary_4],
          [tissues[8], geneData.gonad_1],
          [tissues[8], geneData.gonad_2],
          [tissues[8], geneData.gonad_3],
          [tissues[8], geneData.gonad_4],
          [tissues[9], geneData.juv_1],
          [tissues[9], geneData.juv_2],
          [tissues[9], geneData.juv_3],
          [tissues[9], geneData.juv_4],
        ],
        colorBy: "data",
      },
    ],

    // TOOLTIP
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "none",
      },
      formatter: function (params) {
        // Log to console (developer)
        // console.log(addNoneDetectable(params[1].value[1]))

        // HTML content for tooltip
        let tooltipContent = ``;

        // Add both boxplot and scatter tooltips when both are selected in legend
        if (params.length === 5) {
          tooltipContent += `
                        <span class="legend-text" style="background-color:${
                          params[0].color
                        }"></span>
                        <span><strong>${params[0].name}</strong></span>
                        </br>
                        <span>Replicate 1: <strong>${addNoneDetectable(
                          params[1].value[1].toFixed(0)
                        )}</strong></span>
                        </br>
                        <span>Replicate 2: <strong>${addNoneDetectable(
                          params[2].value[1].toFixed(0)
                        )}</strong></span>
                        </br>
                        <span>Replicate 3: <strong>${addNoneDetectable(
                          params[3].value[1].toFixed(0)
                        )}</strong></span>
                        </br>
                        <span>Replicate 4: <strong>${addNoneDetectable(
                          params[4].value[1].toFixed(0)
                        )}</strong></span>
                    `;
        }

        // Add only scatter tooltip when boxplot is deselected in legend
        if (params.length === 4) {
          tooltipContent += `
                        <span class="legend-text" style="background-color:${
                          params[0].color
                        }"></span>
                        <span><strong>${params[0].name}</strong></span>
                        </br>
                        <span>Replicate 1: <strong>${addNoneDetectable(
                          params[0].value[1].toFixed(0)
                        )}</strong></span>
                        </br>
                        <span>Replicate 2: <strong>${addNoneDetectable(
                          params[1].value[1].toFixed(0)
                        )}</strong></span>
                        </br>
                        <span>Replicate 3: <strong>${addNoneDetectable(
                          params[2].value[1].toFixed(0)
                        )}</strong></span>
                        </br>
                        <span>Replicate 4: <strong>${addNoneDetectable(
                          params[1].value[1].toFixed(0)
                        )}</strong></span>
                    `;
        }

        // Add only boxplot tooltip when scatter is deselected in legend
        if (params.length === 1) {
          tooltipContent += `
                        <span class="legend-text" style="background-color:${params[0].color}"></span>
                        <span><strong>${params[0].name}</strong></span>
                    `;
        }

        return tooltipContent;
      },
    },

    axisPointer: {
      snap: false,
    },

    // COLOURS
    color: customCols,

    // TITLE
    title: {
      text: `Gene: ${geneData.Gene_ID}`,
      link: `https://metazoa.ensembl.org/Homarus_gammarus_gca958450375v1/Gene/Summary?g=${geneData.Gene_ID}`,
      // textStyle: {
      //     color: "#00498f",
      // },

      // Render gene description at the top-left of the chart
      subtext: `Number of transcripts: ${geneData.Num_Transcripts}\n\n${geneData.Contig_ID}`,
    },

    // LEGEND
    legend: {
      show: false,
      left: "right",
      formatter: "{name}",
      itemStyle: {
        color: "#2c3e50",
        opacity: "0.50",
        borderColor: "transparent",
      },
      inactiveBorderColor: "transparent",
      selected: {
        Boxplot: true,
        "Raw Data": true,
      },
    },

    // XAXIS
    xAxis: {
      type: "category",
      boundaryGap: true,
      splitArea: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        rotate: 90,
        margin: 5, // distance between axis labels and axis line
        fontSize: 15,
        // fontFamily: "arial",
      },
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
      },
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
          backgroundColor: "#f8f9fa",
          textareaColor: "#fff",
          buttonColor: "#00498f",
          lang: [
            "Data View (copy and paste text into spreadsheet software for external use)",
            "Close",
          ],

          optionToContent: function () {
            const dataViewData = [
              // Format is an array for each set of values
              // E.g. for one tissue: [eye1, eye2, eye3, eye4]
              [geneData.eye_1, geneData.eye_2, geneData.eye_3, geneData.eye_4],
              [
                geneData.gill_1,
                geneData.gill_2,
                geneData.gill_3,
                geneData.gill_4,
              ],
              [
                geneData.nerve_1,
                geneData.nerve_2,
                geneData.nerve_3,
                geneData.nerve_4,
              ],
              [
                geneData.muscle_1,
                geneData.muscle_2,
                geneData.muscle_3,
                geneData.muscle_4,
              ],
              [
                geneData.heart_1,
                geneData.heart_2,
                geneData.heart_3,
                geneData.heart_4,
              ],
              [
                geneData.hepato_1,
                geneData.hepato_2,
                geneData.hepato_3,
                geneData.hepato_4,
              ],
              [geneData.gut_1, geneData.gut_2, geneData.gut_3, geneData.gut_4],
              [
                geneData.ovary_1,
                geneData.ovary_2,
                geneData.ovary_3,
                geneData.ovary_4,
              ],
              [
                geneData.gonad_1,
                geneData.gonad_2,
                geneData.gonad_3,
                geneData.gonad_4,
              ],
              [geneData.juv_1, geneData.juv_2, geneData.juv_3, geneData.juv_4],
            ];

            // Header row
            const header =
              "Tissue\tReplicate1\tReplicate2\tReplicate3\tReplicate4";

            // Format the data for textarea
            const formattedText = dataViewData
              .map((row, index) => `${tissues[index]}\t${row.join("\t")}`)
              .join("\n");

            // Combine header and data
            const completeText = `${header}\n${formattedText}`;

            // Create a textarea element with the formatted text
            const textbox = `<textarea style="resize: none; width: 100%; height: 90%;">${completeText}</textarea>`;
            return textbox;
          },
        },
        // restore: { title: "Reset" },
        saveAsImage: {
          type: "png",
          name: `${geneData.Gene_ID}_expression`,
          title: "Save as PNG",
          pixelRatio: 12,
        },
      },
      iconStyle: {
        borderColor: "#0d47a1",
      },
      emphasis: {
        iconStyle: {
          textFill: "#0d47a1",
          borderColor: "#bbdefb",
        },
      },
    },
    textStyle: { fontFamily: "Trebuchet MS" },
  };
  return echartsOption;
}
