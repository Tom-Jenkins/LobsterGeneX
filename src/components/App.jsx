import NavBar from "./NavBar";
import GeneSelection from "./GeneSelection";
import ECharts from "./ECharts";
import Spinner from "./Spinner";
import Papa from "papaparse";
import { useEffect, useRef, useState } from "react";

// Variables to store gene IDs and scaffold IDs
let mainIDs, secondaryIDs;

export default function App() {

    const [data, setData] = useState(null);
    const [geneData, setgeneData] = useState({});
    const [loading, setLoading] = useState(true);
    const gene = useRef("");
    const inputRef = useRef(null);
    
    // Parse CSV data from public folder once on first render with useEffect hook
    useEffect(function() {
        Papa.parse("/protein_coding_expression_normalised_counts.csv", {
            skipEmptyLines: true,
            dynamicTyping: true,
            header: true,
            download: true,
            complete: function(results) {
                // Set gene ID and scaffold ID props
                mainIDs = results.data.map( arr => arr.Gene_ID );
                secondaryIDs = results.data.map( arr => arr.Contig_ID );

                // Update state
                setTimeout(() => {
                    setData(results.data);
                    setLoading(false);
                }, 2000)         
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

    // Set Echarts data for selected gene and render on click
    function handlePlotExpression(e) {
        e.preventDefault();
        if (gene.current !== "") {
            const geneIdx = data.map(i => i.Gene_ID).indexOf(gene.current);
            const geneData = data[geneIdx];
            setgeneData(geneData);
        }  
    }

    // Only show spinner during loading
    if (loading) return <Spinner />
  
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <NavBar />
            {/* Gene Selection */}
            {data &&
                <GeneSelection mainIDs={mainIDs} secondaryIDs={secondaryIDs}>
                    {/* Children */}
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
            {/* ECharts */}
            <div className="chart__container">
                {geneData && <ECharts geneData={geneData} />}
            </div>
            
        </div>
    );
}