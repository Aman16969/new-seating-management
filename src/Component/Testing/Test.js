import React, { useState } from "react";
import * as XLSX from "xlsx";

class ExcelToJson extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.fileInput = React.createRef();
    this.state = {
      file: null, // initialize file state as null
    };
  }
  handleClick(e) {
    this.fileInput.current.click();
  }
  filePathset(e) {
    e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
    console.log(file);
    this.setState({ file });

    console.log(this.state.file);
  }

  readFile() {
    var f = this.state.file;
    if (!f || !(f instanceof Blob)) {
      // check if file is valid Blob object
      console.error("Invalid file object:", f);
      return;
    }
    var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      /* Update state */
      console.log("Data>>>" + data); // shows that excel data is read
      console.log(this.convertToJson(data)); // shows data in json format
    };
    reader.readAsBinaryString(f);
  }

  convertToJson(csv) {
    var lines = csv.split("\n");

    var headers = lines[0].split(",");
    var result = [];

    for (var i = 0; i < headers.length; i++) {
      var column = {
        [headers[i]]: [],
      };
      result.push(column);
    }

    for (var i = 1; i < lines.length; i++) {
      var currentline = lines[i].split(",");
      for (var j = 0; j < headers.length; j++) {
        var column = result[j];
        column[headers[j]].push(currentline[j]);
      }
    }

    return result;
  }

  render() {
    return (
      <div className="container">
        <div className="container-content">
          <div className="row">
            <div className="row-card">
              <div className="row-card-title">Excel to json</div>
              <div className="card-body">
                <div className="form-container">
                  <div className="form-item">
                    <div>
                      <input
                        type="file"
                        id="file"
                        ref={this.fileInput}
                        name="file"
                        onChange={this.filePathset.bind(this)}
                      />
                      <button onClick={() => this.readFile()}>Read File</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExcelToJson;
