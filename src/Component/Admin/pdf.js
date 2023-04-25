import FileSaver from "file-saver";
const UserList = () => {

    const downloadPdf = () => {
        const header = "Bearer " + sessionStorage.getItem("accessToken");
        fetch("http://localhost:8081/api/pdf/users", {
          headers: {
            "Content-type": "application/json",
            Authorization: header,
          }
        }).then((response) => {
          return response.blob();
        }).then((blob) => {
          // Use FileSaver.js to save the blob as a file
          FileSaver.saveAs(blob, "users.pdf");
        }).catch((error) => {
          console.error("Error downloading PDF:", error);
        });
      }
      
    return (
        <div>
          <button className="button-group" onClick={downloadPdf}>Download</button>
        </div>
      );
    };
    export default UserList;