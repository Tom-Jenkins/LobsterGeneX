// =============================== //
//
// Import Gene Expression Data
//
// =============================== //

// Import JS from Papa Parse
import Papa from "papaparse";

// Function to import data
export function importData (file, callBack) {
    Papa.parse(file, {
        dynamicTyping: true,
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            callBack(results.data)
            // console.log(results.data);
        }
    });
};
