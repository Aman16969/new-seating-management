import FileSaver from "file-saver";
import { BiDownload } from 'react-icons/bi';
const AllRequest
 = () => {

    const downloadPdf = () => {
        const header = "Bearer " + sessionStorage.getItem("accessToken");
        const locationId=sessionStorage.getItem("userLocationId")
        fetch(`http://localhost:8081/api/pdf/request/location/${locationId}`, {
          headers: {
            "Content-type": "application/json",
            Authorization: header,
          }
        }).then((response) => {
          return response.blob();
        }).then((blob) => {
          // Use FileSaver.js to save the blob as a file
          FileSaver.saveAs(blob, "request.pdf");
        }).catch((error) => {
          console.error("Error downloading PDF:", error);
        });
      }
      
    return (
      <div >  
      <button className="button-group" onClick={downloadPdf} style={{marginTop:"10px"}}><BiDownload /></button>
    </div>
      );
    };
    export default AllRequest
    ;