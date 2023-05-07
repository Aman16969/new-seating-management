import "./admin.css";
import AdminStats from "./AdminStats";
import AllUsers from "./AllUsers";
import Request from "./Request";
import CurrentDayBooking from "./CurrentDayBooking";
import AllBookingDaily from "./PDF/AllBookingDaily";
import AllRequest from "./PDF/AllRequestByLocation";
import AllUsersByLocation from "./PDF/AllUsersByLocation";
import BookingRoom from "./BoardRoom";
import RoomBookings from "./RoomBookings";
import AllBookingWeekly from "./PDF/AllBookingWeekly";
const Admin = () => {
  
  return (
    <>
      <div className="container">
        <div className="admin-container">
          <div className="admin-content">
            <div className="admin-content-row">
              <div className="content-row-header">
                <div>
                  <h2>Today's Booking</h2>
                </div>
                <div>
                  <AllBookingDaily />
                </div>
              </div>
              <table className="table-header">
                <thead>
                  <tr className="user-row">
                    <th>Seat</th>
                    <th>Timing</th>
                    <th>Cancel</th>
                  </tr>
                </thead>
              </table>
              <div className="table-scroll">
                <table className="table-header">
                  <CurrentDayBooking />
                </table>
              </div>
            </div>
            <div className="admin-content-row">
              <div className="content-row-header">
                
                <div>
                <h2>Statistics</h2>
                </div>
                <div>
                <select id="frequency" class="dropdown-stats">
  <option value="" onClick={<AllBookingWeekly/>}>Select Frequency</option>
  <option value="weekly">Weekly</option>
  <option value="monthly">Monthly</option>
  <option value="daily">Daily</option>
</select>
                </div>
              </div>
              <div className="table-scroll">
                <table>
                  <AdminStats />
                </table>
              </div>
            </div>
            <div className="admin-content-row">
              <div className="content-row-header">
                <div>
                  <h2>Requests</h2>
                </div>
                <div>
                  <AllRequest />
                </div>
              </div>
              <div className="admin-requests">
                <div className="admin-request-room-booking">
                  <div>
                    <table className="table-header">
                      <thead>
                        <tr className="user-row">
                          <th style={{width:'80%'}}>Email</th>
                          <th>View</th>
                        </tr>
                      </thead>
                    </table>
                    <div className="table-scroll" style={{ height: "220px" }}>
                      <table>
                        <Request />
                      </table>
                    </div>
                    <div className="content-row-header">
                      <h2>Room Bookings</h2>
                    </div>
                    <table className="table-header">
                      <thead>
                        <tr className="user-row">
                          <th >Accolite Id</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Type</th>
                          <th>Room</th>
                        </tr>
                      </thead>
                    </table>
                    <div className="table-scroll" style={{ height: "150px" }}>
                      <table>
                      
                        <RoomBookings />
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="admin-content-row">
              <div className="content-row-header">
                <div>
                  <h2>Users</h2>
                </div>
                <div>
                  <AllUsersByLocation style={{ width: "40px" }} />
                </div>
              </div>

              <table className="table-header">
                <thead>
                  <tr className="user-row">
                    <th style={{width:'75%'}}>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
              </table>

              <div className="table-scroll">
                <table className="table">
                  <tbody>
                    <AllUsers />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
