import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import "./CollabCollection.scss";

const collectionData = [
  { id: 1, name: "IRON BLUE", img: "/images/collab/collab_collection_01.png" },
  { id: 2, name: "SAGE GREEN", img: "/images/collab/collab_collection_02.png" },
  { id: 3, name: "BLACK", img: "/images/collab/collab_collection_03.png" },
  { id: 4, name: "SILVER GREY", img: "/images/collab/collab_collection_04.png" },
  { id: 5, name: "NAVY", img: "/images/collab/collab_collection_05.png" },
];

const CollabCollection = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    
    const handleWheel = (e) => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      
      // 가로 스크롤이 끝에 도달했는지 확인
      const isEnd = scrollLeft + clientWidth >= scrollWidth - 1;
      const isStart = scrollLeft <= 0;

      // 끝이 아니거나, 시작점이 아닌 상태에서 휠을 굴릴 때만 가로 스크롤 작동
      if (!(isEnd && e.deltaY > 0) && !(isStart && e.deltaY < 0)) {
        e.preventDefault();
        gsap.to(scrollContainer, {
          scrollLeft: scrollContainer.scrollLeft + e.deltaY * 3,
          duration: 0.8,
          ease: "power2.out"
        });
      }
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    return () => scrollContainer.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section className="collab-collection">
      <div className="collection-header">
        <h2 className="collection-title">
          PORTER <span className="highlight">X</span> COLLECTION
        </h2>
      </div>

      <div className="scroll-wrapper" ref={scrollRef}>
        <div className="collection-list">
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
      </div>
    </section>
  );
};

export default CollabCollection;