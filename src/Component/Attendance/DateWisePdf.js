import FileSaver from "file-saver";
import { BiDownload } from 'react-icons/bi';
const DayWisePdf = ({date}) => {

    const downloadPdf = () => {
        const header = "Bearer " + sessionStorage.getItem("accessToken");
        const locationId=sessionStorage.getItem("userLocationId")

        fetch(`http://localhost:8081/api/pdf/booking/day/${date}/location/${locationId}`, {
          headers: {
            "Content-type": "application/json",
            Authorization: header,
          }
        }).then((response) => {
          return response.blob();
        }).then((blob) => {
          FileSaver.saveAs(blob, "dailydate.pdf");
        }).catch((error) => {
          console.error("Error downloading PDF:", error);
        });
      }
      
    return (
      <div >  
      <button className="button-group" onClick={downloadPdf} style={{marginTop:"1px"}}><BiDownload /></button>
    </div>
      );
    };
    export default DayWisePdf;