import React from 'react';
import { Link } from 'react-router-dom';
import { offlineStores } from '../../assets/api/offlineStores';
import './MainOfflineSection.scss';

const MainOfflineSection = () => {
    return (
        <section className="main-offline-section">
            <div className="section-inner">
                <div className="text-content">
                    <h2 className="title-en">PORTER SEOUL</h2>
                    <p className="title-ko">포터의 감각적인 오프라인 공간을 경험해보세요.</p>
                </div>
                
                <div className="store-grid">
                    {offlineStores.map((store) => (
                        <Link to={`/offline/${store.id}`} key={store.id} className="store-link-item">
                            <div className="store-image-wrap">
                                <img src={store.image} alt={store.name} />
                                <div className="overlay">
                                    <span className="view-details">VIEW DETAILS</span>
                                </div>
                            </div>
                            <div className="store-info">
                                <span className="s-name">{store.name}</span>
                                <span className="s-name-kr">{store.name_kr}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="view-all-wrap">
                    <Link to="/offline" className="btn-view-all">SEE ALL STORES</Link>
                </div>
            </div>
        </section>
    );
};

export default MainOfflineSection;
