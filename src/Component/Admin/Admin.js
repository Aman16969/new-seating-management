import "./admin.css";
import AdminStats from "./AdminStats";
import AllUsers from "./AllUsers";
import Request from "./Request";
import CurrentDayBooking from "./CurrentDayBooking";
import AllBookingDaily from "./PDF/AllBookingDaily";
import AllRequest from "./PDF/AllRequestByLocation";
import AllUsersByLocation from "./PDF/AllUsersByLocation";
const Admin = () => {
  return (
    <>
      <div className="container">
        <div className="admin-container">
          <div className="admin-content">
            <div className="admin-content-row">
              <div className="content-row-header">
                <div><h2>Today's Booking</h2></div>
                <div><AllBookingDaily/></div>
                
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
              <div><h2>Requests</h2></div>
                <div><AllRequest/></div>
             
              </div>
              <div className="admin-requests">
                <table className="table-header">
                  <thead>
                    <tr className="user-row">
                      <th>Email</th>
                      <th>View</th>
                    </tr>
                  </thead>
                </table>
                <div className="table-scroll">
                  <table>
                    <Request/>
                  </table>
                </div>
              </div>
            </div>
            <div className="admin-content-row">
              <div className="content-row-header">
              <div><h2>Users</h2></div>
                <div ><AllUsersByLocation style={{width:'40px'}}/></div>
              

              </div>
              
              <table className="table-header">
                  <thead>
                    <tr className="user-row">
                      <th>Email</th>
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
