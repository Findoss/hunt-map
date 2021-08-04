import './style.css';

export const Map = () => {
  return (
    <div className="map">
      <img src={process.env.PUBLIC_URL + '/images/maps/LD.jpg'} alt="map" />
    </div>
  );
};
