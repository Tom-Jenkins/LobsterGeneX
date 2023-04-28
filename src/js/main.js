// Importing JS from libraries
import * as bootstrap from "bootstrap";
// import * as echarts from "echarts";
// import SlimSelect from "slim-select";
import Papa from "papaparse";


// Import text file
// Papa.parse("https://raw.githubusercontent.com/Tom-Jenkins/seafan_sdm/main/data/deadmansfingers_presence_pts.csv", {
//     header: true,
//     download: true,
// 	complete: function(results) {
// 		console.log("Finished:", results);
// 	}
// });
Papa.parse("src/data/count_data_filtered_with_gene_names.csv", {
    header: true,
    download: true,
	complete: function(results) {
		console.log("Finished:", results);
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







