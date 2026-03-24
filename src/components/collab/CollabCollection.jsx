import React from "react";
import "./CollabCollection.scss";

const collectionData = [
  { id: 1, name: "IRON BLUE", img: "/images/collab/collab_collection_01.png" },
  { id: 2, name: "SAGE GREEN", img: "/images/collab/collab_collection_02.png" },
  { id: 3, name: "BLACK", img: "/images/collab/collab_collection_03.png" },
  {
    id: 4,
    name: "SILVER GREY",
    img: "/images/collab/collab_collection_04.png",
  },
  { id: 5, name: "NAVY", img: "/images/collab/collab_collection_05.png" },
];

const CollabCollection = () => {
  return (
    <section className="collab-collection">
      <h2 className="collection-title">
        PORTER <span className="highlight">X</span> COLLECTION
      </h2>

      <div className="collection-list inner">
        {collectionData.map((item) => (
          <div className="collection-item" key={item.id}>
            <div className="item-label">
              <span className="name">[{item.name}]</span>
              <span className="line"></span>
            </div>
            <div className="img-box">
              <img src={item.img} alt={item.name} draggable={false} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollabCollection;
