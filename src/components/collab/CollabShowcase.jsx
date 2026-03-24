import React from "react";
import "./CollabShowcase.scss";

const CollabShowcase = () => {
  return (
    <section className="collab-showcase inner">
      <div className="showcase-item">
        <h2 className="title union">UNION</h2>
        <div className="img-box">
          <img
            src="/images/collab/collab_showcase_1.png"
            alt="Union Collaboration"
          />
        </div>
      </div>

      <div className="showcase-item reverse">
        <div className="img-box">
          <img
            src="/images/collab/collab_showcase_2.png"
            alt="Stone Island Collaboration"
          />
        </div>
        <h2 className="title stone">
          STONE
          <br />
          ISLAND
        </h2>
      </div>
    </section>
  );
};

export default CollabShowcase;
