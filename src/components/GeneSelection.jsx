export default function GeneSelection() {

    return(
        <div className="geneselection__container">
            
            <h4 className="geneselection__title">Enter Gene ID</h4>

            <form action="/search" className="geneselection__form">
                <input type="text" list="gene-list" placeholder="Search up to 23,223 genes" autoComplete="off" />
                <input type="reset" value="Clear" />
                <input type="submit" value="Plot Expression" onClick={(e) => e.preventDefault()} />
            </form>

            <datalist id="gene-list">
                <option value="Value">Text</option>
            </datalist>

        </div>
    );
}