// import { useRef } from "react";
// import Datalist from "./Datalist";

export default function GeneSelection({ mainIDs, secondaryIDs, children }) {
    
    // const [gene, setGene] = useState("");
    // const gene = useRef("");
    // const inputRef = useRef(null);
    
    // Extract gene IDs and scaffold from data
    // const mainIDs = useRef(data.map( arr => arr.Gene_ID ));
    // const secondaryIDs = useRef(data.map( arr => arr.Contig_ID ));
    
    // console.log("RENDER")

    return(
        <div className="geneselection__container">
            
            <h4 className="geneselection__title">Enter Gene ID</h4>

            <form action="/search" className="geneselection__form">
                {children}
            </form>

            <datalist id="gene-list">
                {
                // Map each gene name and scaffold name to option tags
                // E.g. <option value="mainIDs">secondaryIDs</option>
                mainIDs.map((id, index) => (
                    <option key={id} value={id}>{secondaryIDs[index]}</option>
                ))}
            </datalist>

        </div>
    );
}