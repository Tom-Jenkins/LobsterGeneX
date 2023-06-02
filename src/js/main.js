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

// Gene expression file URL
const file = "https://raw.githubusercontent.com/Tom-Jenkins/LobsterGeneX/main/src/data/count_data_filtered_with_gene_names.csv";

// 1. Render gene selection text box
importData(file, renderGeneSelector);

// Deactivate DNA loading spinner when gene selection content has rendered
document.getElementById("dna-spinner").classList.add("hidden");

// Activate navbar brand content when loading is complete
document.getElementById("navbar-content").classList.remove("invisible");

// Activate gene selection component when loading is complete
document.getElementById("gene-selection-container").classList.remove("hidden");

// 2. Render boxplot when user selects a gene and clicks plot button
document.getElementById("plot-bttn").addEventListener("click", (e) => {
    e.preventDefault();
    importData(file, renderPlot);
});
