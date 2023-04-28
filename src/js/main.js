// Importing JS from libraries
import * as bootstrap from "bootstrap";
// import * as echarts from "echarts";
// import SlimSelect from "slim-select";
import Papa from "papaparse";


// Import CSV file from GitHub
let data;
Papa.parse("https://raw.githubusercontent.com/Tom-Jenkins/LobsterGeneX/main/src/data/count_data_filtered_with_gene_names.csv", {
    header: true,
    download: true,
    skipEmptyLines: true,
	complete: function(results) {
		// console.log("Finished:", results);
        data = results;
        console.log(data);
	}
});



// Select elements from DOM
const datalist = document.getElementById("gene-list");

// Create datalist object
for (let i = 0; i < 16000; i++) {

    // Create a new option element each iteration 
    const option = document.createElement("option");
    
    // Add value
    const value = `Gene${i}`

    // Example of appended element: <option>value</option>
    option.value = value;
    datalist.appendChild(option);
};







