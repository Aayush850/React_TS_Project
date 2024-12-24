function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}: {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) {
  return (
    <div className="flex justify-center items-center my-4 gap-2 flex-wrap">
      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 ${
              page === currentPage
                ? "bg-gray-700 text-white font-bold"
                : "bg-gray-400 text-white"
            }`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}

export default Pagination;
