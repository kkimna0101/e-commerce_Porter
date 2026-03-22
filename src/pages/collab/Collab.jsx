import React from 'react';
import { Link } from 'react-router-dom';
import './Collab.scss';

const Collab = () => {
    return (
        <div className="collab-page inner">
            <h2 className="page-title">COLLABORATION</h2>
            <div className="collab-banner">
                <Link to="/k-brand" className="kbrand-banner-link">
                    <div className="banner-content">
                        <h3>K-Brand Collaboration</h3>
                        <p>새로운 K-Brand 콜라보레이션을 만나보세요.</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Collab;
