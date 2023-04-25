import UserList from "./pdf";

const AdminStats = () => {
  return (
    <>
      <tbody >
        <tr className="user-row" >
          <td>Daily Report</td>
          <td >
            <button className="button-group">Download</button>
          </td>
        </tr>
        <tr className="user-row" >
          <td>Weekly Report</td>
          <td >
            <button className="button-group">Download</button>
          </td>
        </tr>
        <tr className="user-row" >
          <td>Monthly Report</td>
          <td >
            <button className="button-group">Download</button>
          </td>
        </tr>
        <tr className="user-row" >
          <td>Yearly Report</td>
          <td >
            <button className="button-group">Download</button>
          </td>
        </tr>
        <tr className="user-row" >
          <td>All Users</td>
          <td >
           <UserList/>
          </td>
        </tr>
        <tr className="user-row" >
          <td>All Requests</td>
          <td >
            <button className="button-group">Download</button>
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default AdminStats;
