import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { productDetailData } from '../../assets/api/productDetailData';
import './AccordionMenu.scss';

const AccordionMenu = ({ productId, isOpen }) => {
  /* 섹션: 데이터 매칭 */
  const templateId = (productId % 5) === 0 ? 5 : (productId % 5);
  const data = productDetailData.find(item => item.id === templateId) || productDetailData[0];

  /* 섹션: 상태 관리 */
  const [openItems, setOpenItems] = useState({});

  useEffect(() => {
    if (!isOpen) {
      setOpenItems({});
    }
  }, [isOpen]);

  const toggleItem = (key) => {
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  /* 섹션: 항목 리스트 */
  const detailList = [
    { title: "제품 코드", content: data.productCode, key: "productCode" },
    { title: "소재", content: data.material, key: "material" },
    { title: "색상", content: data.color, key: "color" },
    { title: "사이즈", content: data.size, key: "size" },
    { title: "제조국", content: data.origin, key: "origin" },
    { title: "취급 시 주의사항", content: data.caution, key: "caution" },
    { title: "A/S 책임자 및 전화번호", content: data.asInfo, key: "asInfo" },
    { title: "품질보증기준", content: data.warranty, key: "warranty" },
    { title: "수입자", content: data.importer, key: "importer" },
    { title: "제품 정보", content: data.productInfo, key: "productInfo" },
  ];

  const isAllOpen = detailList.every(item => openItems[item.key]);

  const toggleAll = (e) => {
    e.stopPropagation(); // prevent parent clicks if any
    if (isAllOpen) {
      setOpenItems({});
    } else {
      const allOpen = {};
      detailList.forEach(item => {
        allOpen[item.key] = true;
      });
      setOpenItems(allOpen);
    }
  };

  /* 섹션: 화면 렌더링 */
  return (
    <div className="accordion-menu-container">
      <div className="accordion-controls">
        <button className="toggle-all-btn" onClick={toggleAll}>
          {isAllOpen ? '모두 닫기' : '모두 열기'}
        </button>
      </div>
      {detailList.map((item, index) => (
        <div
          key={item.key}
          className={`menu-frame ${openItems[item.key] ? 'is-open' : ''} ${index === detailList.length - 1 ? 'is-last' : ''}`}
        >
          <div className="menu-header" onClick={() => toggleItem(item.key)}>
            <div className="icon-box">
              <Plus className="plus-icon" size={20} strokeWidth={2} />
            </div>
            <span className="menu-title">{item.title}</span>
          </div>

          <div className="menu-content">
            <div className="content-inner">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionMenu;