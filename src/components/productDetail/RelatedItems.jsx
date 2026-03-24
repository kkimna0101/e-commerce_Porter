import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productsData } from "../../assets/api/productData";
import "./RelatedItems.scss";

const RelatedItems = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = id ? Number(id) : 138;

  const currentProduct = productsData.find((p) => p.id === productId) || {};

  const relatedProducts = productsData
    .filter((p) => p.series === currentProduct.series && p.id !== productId)
    .slice(0, 5);

  return (
    <div className="related-items">
      <h2 className="section-title-plain">RELATED ITEMS</h2>


      <div className="related-items__grid">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="related-items__card"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="related-items__img-wrap">
              <img
                src={`/images/product/${product.thumbnail}`}
                alt={product.name}
                className="related-items__img"
              />
            </div>
            <div className="related-items__info">
              <p className="related-items__name">
                {product.name.toUpperCase()}
              </p>
              <p className="related-items__price">
                ₩ {product.price.toLocaleString()}
              </p>
            </div>
          </div>
        ))}

        {relatedProducts.length === 0 && (
          <p className="related-items__empty">관련 상품이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedItems;
