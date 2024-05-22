// =============================== //
//
// Render Gene Selector
//
// =============================== //

// Function to create a datalist object
export function renderGeneSelector (data) {

    // Extract gene IDs and contig/scaffold from data
    const mainIDs = data.map( arr => arr.Gene_ID );
    const secondaryIDs = data.map( arr => arr.Contig_ID );
    // console.log(secondaryIDs);

    // Select elements from DOM
    const datalist = document.getElementById("gene-list");

    // Build datalist
    for (let i = 0; i < mainIDs.length; i++) {

        // Create a new option element each iteration 
        const option = document.createElement("option");
        
        // Add HTML content with each option
        const content = mainIDs[i];
    
        // Example of appended element: <option value="mainIDs">secondaryIDs</option>
        option.value = content;
        option.textContent = secondaryIDs[i];
        datalist.appendChild(option);
    };
};
