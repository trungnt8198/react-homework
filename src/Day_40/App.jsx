import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(25);
  const [totalPage, setTotalPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState([1]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const maxVisiblePages = 5;

  const updateVisiblePages = (currentPage) => {
    let startPage = Math.max(1, currentPage);
    const endPage = Math.min(totalPage, currentPage + maxVisiblePages);
    const newVisiblePages = [];
    while(startPage <= endPage) {
        newVisiblePages.push(startPage++);
    }
    setVisiblePages(newVisiblePages);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${limit * (currentPage - 1)}`)
      .then(res => res.json())
      .then(res => {
        setPosts(res.posts);
        setTotalPage(Math.ceil(res.total / limit)); 
        
        updateVisiblePages(currentPage); 
        
        setLoading(false);
      });
  }, [limit, currentPage]); 

  return (
    <div className="app">
      <h1>Danh sách bài viết</h1>

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Tìm kiếm bài viết..."
        />
      </div>

      {/* Loading Overlay */}
      {loading && <div className="loading-overlay">
        <div className="loading-spinner"></div>
        <p>Đang tải dữ liệu...</p>
      </div>}

      {/* No Results Message */}
      {!loading && posts.length === 0 && <p className="no-results">Không tìm thấy bài viết nào.</p>}

      {/* List of Posts */}
      <ul className="post-list">
        {posts.length > 0 && posts.map(post =>
          <li className="post-item" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>

            <div className="post-meta">
              <span className="views">👀 {post.views} lượt xem</span>
              <span className="likes">👍 {post.reactions.likes}</span>
              <span className="dislikes">👎 {post.reactions.dislikes}</span>
            </div>

            <div className="tags">
              {post.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
            </div>
          </li>
        )}
      </ul>

      {/* Pagination */}
      <div className="pagination-container">
        <div className="records-per-page">
          <label htmlFor="records">Hiển thị:</label>
          <select id="records" className="records-select" onChange={(e) => setLimit(Number(e.target.value))}>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
          </select>
        </div>
        <div className="pagination">
          <button className="page-btn prev"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            « Trước
          </button>

          {visiblePages.map(page => {
            const isActive = currentPage === page;
            return <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`page-btn ${isActive ? "active" : ""}`}
            >
              {page}
            </button>
          })}
          
          <button className="page-btn next" 
            disabled={currentPage === totalPage} 
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Sau »
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
