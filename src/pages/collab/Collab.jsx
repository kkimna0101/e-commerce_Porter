import React from "react";
import { Link } from "react-router-dom";
import CollabHero from "../../components/collab/CollabHero";
import CollabShowcase from "../../components/collab/CollabShowcase";
import CollabCollection from "../../components/collab/CollabCollection";
import "./Collab.scss";

const Collab = () => {
  return (
    <div className="collab-page">
      <CollabHero />
      <CollabShowcase />
      <CollabCollection />
      <section className="collab-banner">
        <Link to="/k-brand" className="kbrand-banner-link">
          <div className="banner-content">
            <h3>K-BRAND COLLECTION</h3>
            <p>포터코리아에서만 만나볼 수 있는 특별한 큐레이션</p>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default Collab;
