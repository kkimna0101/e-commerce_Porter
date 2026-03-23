import React from 'react';
import './offline.scss';
import StoreCard from '../../components/offline/StoreCard';
import { offlineStores } from '../../assets/api/offlineStores';
const Offline = () => {
    return (
        <div className="offline-page inner">
            <div className="offline-page__inner">
                <h2 className="offline-page__title">OFFLINE STORE</h2>
            </div>
            <div className="offline-page__content">
                {offlineStores.map((store) => (
                    <StoreCard key={store.id} store_name={store.name} store_image={store.image} store_id={store.id} />
                ))}
            </div>
        </div>
    );
};
export default Offline;
