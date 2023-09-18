// =============================== //
//
// Render Gene Selector
//
// =============================== //

// Function to create a datalist object
export function renderGeneSelector (data) {

    // Extract gene IDs and names from data
    const geneIDs = data.map( arr => arr.Gene_ID );
    const geneNames = data.map( arr => arr.Gene_name );
    // console.log(geneNames);

    // Select elements from DOM
    const datalist = document.getElementById("gene-list");

    // Build datalist
    for (let i = 0; i < geneIDs.length; i++) {

        // Create a new option element each iteration 
        const option = document.createElement("option");
        
        // Add HTML content with each option
        const content = geneNames[i];
    
        // Example of appended element: <option value="geneName">GeneID</option>
        option.value = content;
        option.textContent = geneIDs[i];
        datalist.appendChild(option);
    };
};
