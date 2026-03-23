import React from 'react';
import './StoreCard.scss';
import { Link } from 'react-router-dom';
const StoreCard = ({store_name,store_image,store_id}) => {
    return (
        <Link to={`/offline/${store_id}`} className="store-card">
            <img src={store_image} alt={store_name} className="store-card__image" />
            <h4 className="store-card__title">{store_name}</h4>

        </Link>
    );

};

export default StoreCard;