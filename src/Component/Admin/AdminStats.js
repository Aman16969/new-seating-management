import AllUsers from "./PDF/AllUsers";
import AllAdmin from "./PDF/AllAdminByLocation";
import AllUsersByLocation from "./PDF/AllUsersByLocation";
import AllBookingDaily from "./PDF/AllBookingDaily";
import AllBookingWeekly from "./PDF/AllBookingWeekly";
import AllBookingMonthly from "./PDF/AllBookingMonthly";
import AllRequest from "./PDF/AllRequestByLocation";
import AllRoomByLocation from "./PDF/AllRoomByLocation";
import AllSeatByLocation from "./PDF/AllSeatsByLocation";

const AdminStats = () => {
  return (
    <>
      <tbody >
      <tr className="user-row" >
          <td>Users</td>
          <td >
           <AllUsers/>
          </td>
        </tr>
      <tr className="user-row" >
          <td>All Admin</td>
          <td >
            <AllAdmin/>
          </td>
        </tr>
        <tr className="user-row" >
          <td>All Users</td>
          <td >
           <AllUsersByLocation/>
          </td>
        </tr>
        <tr className="user-row" >
          <td>All Seats</td>
          <td >
           <AllSeatByLocation/>
          </td>
        </tr>
        <tr className="user-row" >
          <td>Daily Report</td>
          <td >
            <AllBookingDaily/>
          </td>
        </tr>
        <tr className="user-row" >
          <td>Last Week Report</td>
          <td >
            <AllBookingWeekly/>
          </td>
        </tr>
        <tr className="user-row" >
          <td>Last Month Report</td>
          <td >
            <AllBookingMonthly/>
          </td>
        </tr>
        
        <tr className="user-row" >
          <td>All Requests</td>
          <td >
            <AllRequest/>
          </td>
        </tr>
        <tr className="user-row" >
          <td>All Room Booking</td>
          <td >
            <AllRoomByLocation/>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default AdminStats;
