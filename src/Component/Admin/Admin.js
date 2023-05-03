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
                <h2>Statistics</h2>
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
                          <th style={{width:'85%'}}>Email</th>
                          <th>View</th>
                        </tr>
                      </thead>
                    </table>
                    <div className="table-scroll-1" >
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
                          <th>Date</th>
                          <th>From</th>
                          <th>To</th>
                          <th>Type</th>
                          <th>Room</th>
                        </tr>
                      </thead>
                    </table>
                    <div className="table-scroll-2">
                      <table>
                                          <RoomBookings/>
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
                    <th style={{width:'70%'}}>Email</th>
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
