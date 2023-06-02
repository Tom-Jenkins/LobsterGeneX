// =============================== //
//
// Import JavaScript from libraries and modules
//
// =============================== //

// Import JS from bootstrap library
import * as bootstrap from "bootstrap";

// Import JS functions from modules
import {importData} from "./importData";
import {renderGeneSelector} from "./geneSelector";
import {renderPlot} from "./plotData";
import {echartsPlot} from "./plotData";



// ------------------- //
//
// Main App Function
//
// ------------------- //

// Gene expression file URL
const file = "https://raw.githubusercontent.com/Tom-Jenkins/LobsterGeneX/main/src/data/count_data_filtered_with_gene_names.csv";

// 1. Render gene selection text box
importData(file, renderGeneSelector);

// Delay code executation by two seconds so that DNA spinner does not instantly disappear in fast rendering / internet connections
setTimeout( () => {

    // Deactivate DNA loading spinner when gene selection content has rendered
    document.getElementById("dna-spinner").classList.add("hidden");

    // Activate gene selection component when loading is complete
    document.getElementById("gene-selection-container").classList.remove("hidden");

}, 0000);

// document.getElementById("dna-spinner").classList.add("hidden");
// document.getElementById("gene-selection-container").classList.remove("hidden");

// 2. Render boxplot when user selects a gene and clicks plot button
document.getElementById("plot-bttn").addEventListener("click", (e) => {
    e.preventDefault();
    importData(file, renderPlot);
});



// ------------------- //
//
// Additional Functions
//
// ------------------- //

// Resize ECharts plot when screen size changes
window.onresize = function() {
    echartsPlot.resize();
};
