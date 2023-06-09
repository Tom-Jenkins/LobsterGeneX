// =============================== //
//
// Render Gene Selector
//
// =============================== //

// Function to create a datalist object
export function renderGeneSelector (data) {

    // Extract gene names from data
    const geneNames = data.map( arr => arr.Gene );
    // console.log(geneNames);

    // Select elements from DOM
    const datalist = document.getElementById("gene-list");

    for (let i = 0; i < geneNames.length; i++) {

        // Create a new option element each iteration 
        const option = document.createElement("option");
        
        // Add value
        const value = geneNames[i];
    
        // Example of appended element: <option>value</option>
        option.value = value;
        datalist.appendChild(option);
    };
};
