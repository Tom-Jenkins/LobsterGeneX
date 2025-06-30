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
  useEffect(function () {
    Papa.parse("/protein_coding_expression_normalised_counts.csv", {
      skipEmptyLines: true,
      dynamicTyping: true,
      header: true,
      download: true,
      complete: function (results) {
        // Set gene ID and scaffold ID props
        mainIDs = results.data.map((arr) => arr.Gene_ID);
        secondaryIDs = results.data.map((arr) => arr.Contig_ID);

        // Update data
        setData(results.data);
        setLoading(false);
      },
    });
  }, []);

  // Update state each time a new gene is selected
  function handleGene(e) {
    gene.current = e.target.value;
  }

  // Clear input field
  function handleClearInput() {
    gene.current = "";
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  // Set Echarts data for selected gene and render on click
  function handlePlotExpression(e) {
    e.preventDefault();
    if (gene.current !== "") {
      const geneIdx = data.map((i) => i.Gene_ID).indexOf(gene.current);
      const geneData = data[geneIdx];
      setgeneData(geneData);
    }
  }

  // Set Echarts data for random gene and render on click
  function handlePlotRandom(e) {
    e.preventDefault();
    const randomData = data[Math.floor(Math.random() * data.length)];
    setgeneData(randomData);
  }

  // Only show spinner during loading
  if (loading) return <Spinner />;

  return (
    <div className="flex h-dvh flex-col gap-4 font-default">
      <NavBar />

      {/* Gene Selection */}
      {data && (
        <GeneSelection mainIDs={mainIDs} secondaryIDs={secondaryIDs}>
          {/* Children */}
          <input
            ref={inputRef}
            defaultValue=""
            onInput={handleGene}
            type="text"
            list="gene-list"
            placeholder="Search up to 23,223 genes"
            autoComplete="off"
            className="text-md w-55 border-1 border-black bg-gray-50 p-1"
          />
          <input
            type="reset"
            value="Clear"
            onClick={handleClearInput}
            className="cursor-pointer border-1 border-black bg-gray-100 px-1.5 py-1 hover:bg-gray-200 active:bg-gray-50"
          />
          <input
            type="submit"
            value="Plot Expression"
            onClick={handlePlotExpression}
            className="cursor-pointer border-1 border-black bg-gray-100 px-1.5 py-1 hover:bg-gray-200 active:bg-gray-50"
          />
          <input
            type="submit"
            value="Plot Random"
            onClick={handlePlotRandom}
            className="cursor-pointer border-1 border-black bg-gray-100 px-1.5 py-1 hover:bg-gray-200 active:bg-gray-50"
          />
        </GeneSelection>
      )}

      {/* ECharts */}
      {geneData && <ECharts geneData={geneData} />}
    </div>
  );
}
