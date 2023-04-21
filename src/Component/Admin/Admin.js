import "./admin.css";
import AllUsers from "./AllUsers";
import CurrentDayBooking from "./CurrentDayBooking";
import Request from "./Request";
const Admin = () => {
  return (
    <>
      <div className="container">
      <div className="admin-container">
        <div className="admin-content">
          <div className="admin-content-row">
            <div className="content-row-header">
              <h2>Current day Booking</h2>
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
                <CurrentDayBooking/>
              </table>
            </div>
          </div>
          <div className="admin-content-row">
          <div className="content-row-header">
              <h2>Booking Stats</h2>
            </div>
            <div className="admin-stats-row">
              <div className="stats-admin">
                <div className="content-row-header">
                  <h2>Weekly Booking Stats</h2>
                </div>
                <div className="stats-content">
                  <table>
                    <tbody className="stats-body">
                      <tr>
                        <th>Total Bookings: </th>
                        <td> 200</td>
                      </tr>
                      <tr>
                        <th>Total Active users:</th>
                        <td>100</td>
                      </tr>
                      <tr>
                        <th>Average Booking per day:</th>
                        <td>60</td>
                      </tr>
                      <tr>
                        <th>Cancled Bookings</th>
                        <td>20</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="stats-admin">
                <div className="content-row-header">
                  <h2>Monthly Booking Stats</h2>
                </div>
                <div className="stats-content">
                  <table>
                    <tbod className="stats-body">
                      <tr>
                        <th>Total Bookings: </th>
                        <td> 200</td>
                      </tr>
                      <tr>
                        <th>Total Active users:</th>
                        <td>100</td>
                      </tr>
                      <tr>
                        <th>Average Booking per day:</th>
                        <td>60</td>
                      </tr>
                      <tr>
                        <th>Cancled Bookings</th>
                        <td>20</td>
                      </tr>
                    </tbod>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="admin-content-row">
            <div className="content-row-header">
              <h2>Requests</h2>
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
              <h2>Users</h2>
            </div>
            <div className="row-card-title">
                <table>
                  <tr className="user-row">
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </table>
              </div>
            <div className="table-scroll">
            <table className="table">
                  <tbody>
                      <AllUsers/>
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
