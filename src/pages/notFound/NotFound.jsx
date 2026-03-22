import { useNavigate, Link } from 'react-router-dom';
import './NotFound.scss';
const errorImg = '/images/404_error.png';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="text-area">
        <Link to="/" className="nav-link">GO HOME</Link>
        <Link to="/product" className="nav-link">CONTINUE SHOPPING</Link>
      </div>
      
      {/* 우클릭 금지*/}
      <img 
        src={errorImg} 
        alt="404 Page Not Found" 
        className="error-image" 
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
};

export default NotFound;
