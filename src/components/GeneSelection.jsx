function GeneSelection({ mainIDs, secondaryIDs, children }) {
  // console.log("RENDER");

  // Guard clause if no data is parsed
  if (!mainIDs) return null;

  return (
    <div className="mb-4 px-6">
      <h4 className="mb-2 text-xl font-bold">Enter Gene ID</h4>

      <form action="/search" className="flex flex-wrap gap-2">
        {children}
      </form>

      <datalist id="gene-list">
        {
          // Map each gene name and scaffold name to option tags
          // E.g. <option value="mainIDs">secondaryIDs</option>
          mainIDs.map((id, index) => (
            <option key={id} value={id}>
              {secondaryIDs[index]}
            </option>
          ))
        }
      </datalist>
    </div>
  );
}

export default GeneSelection;
