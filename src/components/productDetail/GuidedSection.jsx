import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./GuidedSection.scss";

const EXCHANGE_CONTENT = [
  {
    title: "교환/환불 안내",
    text: `반품/교환은 미사용 제품에 한해 상품 수령일로부터 7일 이내에 가능하며, 임의 반품은 불가합니다.
구매 내역이 확인되지 않는 경우
온라인 스토어에서 구입한 상품은 오프라인 스토어에서 교환/환불이 불가
한국 소비자원 소비자 분쟁 해결 기준에 의거하여 고객에 의하여 사용이 된 상품
지갑류를 제외한 악세서리 상품은 변심에 따른 교환/환불 불가
고객에게 책임이 있는 사유로 상품 등이 멸실 또는 훼손 된 경우
반드시 수령 상태 그대로 반송된 미사용 상품에 한해서만 가능합니다. (ex. 상품 택, 폴리백 등 구성품 동봉)
온라인 구매 내역이 확인되지 않는 경우, 처리가 불가합니다
안내 사항 미숙지에 따른 불이익에 대해서 책임을 지지 않습니다
(ex. 사용의 흔적 및 이물질 오염, 더스트백 또는 라벨 제거 및 훼손)
본 상품의 패키지 및 분실 등으로 인한 상품 가치가 훼손 된 경우
이벤트 등으로 제공된 사은품을 사용하였거나 분실한 경우`,
  },
  {
    title: "주의사항",
    text: `상품 반송 시, 반드시 수령 상태 그대로 재포장 후 발송 바랍니다.
상품 및 포장 상태가 재판매 가능한 미사용 상품에 한해서만 가능합니다.
상품 택, 더스트, 폴리백 등의 제거 및 손상은 반품/교환 불가 대상입니다.
지갑류를 제외한 모든 악세서리 상품은 단순 변심에 따른 교환/환불이 불가합니다.
제조 공정상, 봉제선 주변의 원단이 부풀어 오르는 현상은 반품/교환 대상이 아닙니다.
오렌지 컬러 원사가 보이는 제품은 불량이 아닌 정상 상품입니다.
스냅버튼, 스트랩을 거는 D링, 집게고리 등의 부자재 사용 시 도색이 벗겨지거나 까질 수 있으며, 이는 반품/교환 대상이 아닙니다.
후크 등의 일부 부자재는 안쪽까지 도금하여 사용 시 자연스러운 뻑뻑함이 발생할 수 있으며, 이는 반품/교환 대상이 아닙니다.
패턴이 있는 상품들은 원단의 재단에 따라, 각 상품 별 패턴이 상이할 수 있습니다. 이에 따라 대표 이미지와 다를 수 있으며 해당 사유로 인한 반품/교환은 불가합니다.
주의 사항 미숙지에 따른 불이익에 대해서 책임을 지지 않습니다.`,
  },
  {
    title: "제품 교환/환불 과정",
    text: `포터 온라인스토어에서 구매한 제품을 반품하기 위해서는 아래의 과정을 통해 접수해 주시기 바랍니다.
1. 구매한 제품을 배송된 그대로의 형태로 포장합니다.
2. 상품 수령 후 교환/반품 가능 기간 내 "*마이페이지"에서 직접 접수 하신 뒤, 상품과 동봉된 반품 및 교환신청서를 작성해 주세요.
반품주소지 : 서울시 강남구 신사동 648-27번지 히든파크 1층 포터서울 압구정점 (지정된 반송처로 반송되지 않을 시, 교환/반품 절차가 지연됩니다)
* 출고 이후 환불요청 시 상품 회수 후 처리됩니다.`,
  },
  {
    title: "A/S안내",
    text: `국내 공식수입원 ㈜스타럭스를 통해 구매한 상품만 AS 가능합니다.
사용 후 발생한 수선 건에 대해서는 유상 수선이 원칙입니다.
모든 수선은 제조사인 일본에서의 진행이 원칙이며, 유상의 경우 배송비가 발생될 수 있으며, 경우에 따라 2-3개월 수선 기간이 소요 됩니다.
시즌 제품 및 컬렉션 종료로 인하여 일부 제품의 경우 부자재 재고가 없을 수 있으며, AS 가능여부에 따라 대체 가능한 부속품으로 제안을 드립니다.`,
  },
];

const CARE_CONTENT = [
  {
    title: "천연 가죽 관리",
    text: `물에 젖으면 색, 수축, 경화가 발생 할 수 있습니다.
비 오는 날에 사용을 주의 하십시오.
또는 젖은 경우 물을 제거하기 위해 마른 천으로 닦아 주신 뒤 자연광에 말려주십시오.
햇빛과 조명에 변색이 일어 날 수 있습니다.
표면은 긁힘에 취약합니다.
가죽 전용 오일을 사용하지 않으면 가죽 열화가 있을 수 있습니다.`,
  },
  {
    title: "스웨이드, 누벅 관리",
    text: `마찰이나 땀 비에 취약하니 주의 바랍니다.
표면에 먼지가 묻은 경우, 가벼운 얼룩은 칫솔질로 가볍게 털어 주시면 됩니다.
또한 전용 지우개 타입의 클리너로 얼룩제거가 가능합니다.`,
  },
  {
    title: "에나멜 관리",
    text: `고온장소(여름 차안이나 태양이 닿는 장소, 조명 근처) 장시간 두지 않도록 조심하십시오.
겉표면의 굴절이 생겨 수지 부분에 주름에 상처가 나는 경우가 있습니다.
다른 색 있는 상품이 이색 되는 경우가 있으니 주의 바랍니다.
표면에 수지가 발라져 있어 비교적 물에 강한 편이지만 상황에 따라 탈색 및 물 번짐이 생길 수 있습니다.
젖은 경우 천연 가죽과 같은 방식으로 관리 하십시오.`,
  },
  {
    title: "면, 마, 모, 실크 관리",
    text: `마찰이나 땀 비 등 물에 젖으면 탈색될 가능성이 있어 의류 등의 변색에 주의 바랍니다.
태양광이나 조명에 장기간 노출 되면 변색이 될 가능성이 있습니다.
마찰에 의해 보풀이 일어 날 수 있습니다.
보풀이 일어난 경우 손으로 당기는 것은 피하고 가위 등으로 조심스럽게 제거 하십시오.
화기에 취약 하오니 화기 근처에서 주의 바랍니다.
물이나 중성 세제를 부드러운 천에 묻혀 굳게 짠 후 두드리듯 닦아 주십시오.`,
  },
  {
    title: "나일론, 아크릴, 폴리에스테르 소재 관리",
    text: `아크릴과 레이온은 마찰이나 땀 비 등에 취약하여 탈색 및 변색될 가능성이 있습니다.
의류 등의 변색에 주의 하십시오.
먼지가 묻은 경우 브러쉬로 살짝 털어주십시오.
물이나 중성세제를 부드러운 천에 묻혀 굳게 짠 후 두드리듯 닦아주세요.`,
  },
];

const GUIDE_DATA = [
  { id: "exchange", title: "교환/환불 정책", rows: EXCHANGE_CONTENT },
  { id: "care", title: "관리방법", rows: CARE_CONTENT },
];

const GuidedSection = () => {
  const [openId, setOpenId] = useState(null);
  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="guide-section">
      <h2 className="section-title-plain">GUIDE</h2>


      <div className="guide-section__list">
        {GUIDE_DATA.map((item) => (
          <div key={item.id} className="guide-section__item">
            <button
              className={`guide-section__header ${openId === item.id ? "open" : ""}`}
              onClick={() => toggle(item.id)}
            >
              <span className="guide-section__title">{item.title}</span>
              <ChevronDown
                className={`guide-section__icon ${openId === item.id ? "rotate" : ""}`}
                size={20}
                strokeWidth={1.5}
              />
            </button>

            <div
              className={`guide-section__content ${openId === item.id ? "open" : ""}`}
            >
              <div className="guide-section__content-inner">
                <table className="guide-section__table">
                  <tbody>
                    {item.rows.map((row, idx) => (
                      <tr key={idx} className="guide-section__row">
                        <th className="guide-section__row-title">
                          {row.title}
                        </th>
                        <td className="guide-section__row-text">{row.text}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuidedSection;
