import LocationForm from "./LocationForm";
import LocationList from "./LocationList";

const Location = () => {
  return (
    <>
      <div className="container">
        <div className="container-content">
          <div className="row-location">
            <div>
              <LocationList/>
            </div>
            <div>
              <LocationForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
