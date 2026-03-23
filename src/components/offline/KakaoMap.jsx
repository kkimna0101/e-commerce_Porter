export default function KakaoMap({ mapUrl, imageUrl, alt = 'map' }) {
    return (
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="kakao-map"
      >
        <img src={imageUrl} alt={alt} className="kakao-map__image" />
      </a>
    );
  }