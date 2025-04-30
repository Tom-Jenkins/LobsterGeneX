import NavBar from "./NavBar";
import GeneSelection from "./GeneSelection";
import Chart from "./Chart";
import Papa from "papaparse";

export default function App() {

    // Read in CSV data via Papa Parse
    // Papa.parse("../../data/protein_coding_expression_VST_counts.csv", {
    //     skipEmptyLines: true,
    //     dynamicTyping: true,
    //     header: true,
    //     download: true,
    //     complete: function(results) {
    //         console.log(results);
    //     }
    // });
  
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", height: "100vh" }}>
            <NavBar />
            <GeneSelection />
            <Chart />
        </div>
    );
}