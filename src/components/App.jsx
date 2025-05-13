import NavBar from "./NavBar";
import GeneSelection from "./GeneSelection";
import Chart from "./Chart";
import Papa from "papaparse";
import { useEffect, useRef, useState } from "react";

export default function App() {

    const [data, setData] = useState(null);
    // const [gene, setGene] = useState("");
    const gene = useRef("");
    const inputRef = useRef(null);
    
    // Parse CSV data from public folder once on first render with useEffect hook
    useEffect(function() {
        Papa.parse("/protein_coding_expression_VST_counts.csv", {
            skipEmptyLines: true,
            dynamicTyping: true,
            header: true,
            download: true,
            complete: function(results) {
                // Update data state
                setData(results.data);
            }
        });
    }, []);

    // Update state each time a new gene is selected
    function handleGene(e) {
        // setGene(e.target.value);
        gene.current = e.target.value;
    };

    // Clear input field
    function handleClearInput() {
        // setGene("");
        gene.current = "";
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    }

    // Plot chart
    function handlePlotExpression(e) {
        e.preventDefault();
        console.log(gene);
    }
  
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", height: "100vh" }}>
            <NavBar />
            {/* Gene Selection */}
            {data &&
                <GeneSelection data={data}>
                    <input 
                        ref={inputRef}
                        defaultValue=""
                        onInput={handleGene}
                        type="text" list="gene-list" 
                        placeholder="Search up to 23,223 genes" 
                        autoComplete="off" 
                    />
                    <input type="reset" value="Clear" onClick={handleClearInput} />
                    <input 
                        type="submit"
                        value="Plot Expression"
                        onClick={handlePlotExpression}
                    />
                </GeneSelection>
            }
            {/* Chart */}
            {data && <Chart data={data} gene={gene} />}
        </div>
    );
}