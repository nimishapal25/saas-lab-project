import { useEffect } from 'react'
import './App.css'
import { useState } from 'react'

const PER_PAGE = 5

function App() {
  const [list, setList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError('') //Reset Error message before calling API
      try {
        const res = await fetch('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json')
        if (!res.ok) {
          throw new Error("Failed to fetch data. Please try again later.");
        }
        const data = await res.json()
        setList(data)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Hide loader after data is fetched
      }
    } 
    fetchData()
  },[])

  const totalPages = Math.ceil(list.length / PER_PAGE);
  const paginatedList =  list.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  function handleNextPage () {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  function handlePreviousPage () {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };


  return (
    <div className="app-container">
  {loading ? (
        <div className="loader">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
    <>
      <div className="list-container">
        {paginatedList.map((item, index) => (
          <div key={index} className="list-item">
            <div className="item-number">S.No: {item["s.no"]}</div>
            <div className="item-funded">
              Percentage Funded: {item["percentage.funded"]}%
            </div>
            <div className="item-pledged">
              Amount Pledged: ${item["amt.pledged"]}
            </div>
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <button
          className="pagination-button"
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </>
  )}
</div>

  )
}

export default App
