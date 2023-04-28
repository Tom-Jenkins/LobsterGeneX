// Import text file
Papa.parse("./src/data/count_data_filtered_with_gene_names.csv", {
    header: true,
    download: true,
	complete: function(results) {
		console.log("Finished:", results);
	}
});