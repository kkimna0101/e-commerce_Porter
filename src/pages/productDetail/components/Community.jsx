import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SectionTitle } from './ProductInfo';
import { productsData } from '../../../assets/api/productData';
import './Community.scss';

const Community = () => {
    const { id } = useParams();
    const productId = id ? Number(id) : 138;
    const product = productsData.find(p => p.id === productId) || {};
    const productName = product.name ? product.name.toUpperCase() : 'TANKER SHORT HELMET BAG';

    const [activeTab, setActiveTab] = useState('review');

    return (
        <div className="community-section">
            <SectionTitle text="COMMUNITY" />

            <div className="community-section__body">
                <div className="community-section__tabs">
                    <button
                        className={`community-section__tab ${activeTab === 'inquiry' ? 'active' : ''}`}
                        onClick={() => setActiveTab('inquiry')}
                    >
                        문의
                    </button>
                    <button
                        className={`community-section__tab ${activeTab === 'review' ? 'active' : ''}`}
                        onClick={() => setActiveTab('review')}
                    >
                        리뷰
                    </button>
                </div>

                <div className="community-section__content">
                    {activeTab === 'inquiry' ? (
                        <div className="community-section__empty">
                            <button className="community-section__write-btn">문의 작성하기</button>
                            <p className="community-section__empty-main">"아직 남겨진 문의가 없습니다."</p>
                            <p className="community-section__empty-sub">후기는 구매 고객만 작성할 수 있습니다.</p>
                        </div>
                    ) : (
                        <div className="community-section__empty">
                            <button className="community-section__write-btn">리뷰 작성하기</button>
                            <div className="community-section__empty-main">
                                <p>"아직 남겨진 후기가 없습니다."</p>
                                <p>
                                    <span className="community-section__product-name">{productName}</span>
                                    {' '}를 구매하셨었나요?
                                </p>
                                <p>후기를 작성해주세요!</p>
                            </div>
                            <p className="community-section__empty-sub">후기는 구매 고객만 작성할 수 있습니다.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Community;