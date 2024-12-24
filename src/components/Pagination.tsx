function Pagination({totalPages,setCurrentPage}:{totalPages:number,setCurrentPage:(page:number)=>void}) {
  return (
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index + 1} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      );

}

export default Pagination