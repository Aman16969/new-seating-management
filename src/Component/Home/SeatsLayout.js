const SeatsLayout = ({ seats, seatAvailability }) => {
  return (
    <div>
      {seats && !seatAvailability && 
        seats.map((seat) => {
          return (
            <div
              style={{
                height: "20px",
                width: "50px",
                margin: "10px",
                padding: "5px",
                backgroundColor: "red",
              }}
              value={seat.id}
            >
              {seat.name}
            </div>
          );
        })}

{seats && seatAvailability && 
        seats.map((seat) => {
            if(seatAvailability.hasOwnProperty(seat.id).value===1) {
                return (
                    <div
                      style={{
                        height: "20px",
                        width: "50px",
                        margin: "10px",
                        padding: "5px",
                        backgroundColor: "red",
                      }}
                      value={seat.id}
                    >
                      {seat.name}
                    </div>
                  );
            }
            else{
                return (
                    <div
                      style={{
                        height: "20px",
                        width: "50px",
                        margin: "10px",
                        padding: "5px",
                        backgroundColor: "green",
                      }}
                      value={seat.id}
                    >
                      {seat.name}
                    </div>
                  );
            }
        })}
    </div>
  );
};

export default SeatsLayout;
