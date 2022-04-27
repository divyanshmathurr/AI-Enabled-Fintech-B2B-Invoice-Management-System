import "./App.css";
import Header from "./Components/Header";
import Grid from "./Components/Grid";

import { useState, useEffect } from "react";

function App() {
  const [details, setDetails] = useState([
    {
      id: "",
      business_code: "",
      cust_number: "",
      clear_date: "",
      buisness_year: "",
      doc_id: "",
      posting_date: "",
      due_in_date: "",
      invoice_currency: "",
      document_type: "",
      posting_id: "",
      total_open_amount: "",
      baseline_create_date: "",
      cust_payment_terms: "",
      invoice_id: "",
      aging_bucket: "",
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:8080/HighRadiusWork/Fetcher")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.length);
        setDetails(data);
      });
  }, []);

  
  const handleRefresh = () => {

    if(window.confirm('Your Data is updated!')){
      window.location.reload();  
  }
   
  };

  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  return (
    <div className="App">
      <Header
        selectedRows={selectedRows}
        setDetails={setDetails}
        handleRefresh={handleRefresh}
        details={details}
      />
      <Grid setSelectedRows={setSelectedRows} details={details} />
      <footer>
        <span>Privacy Policy </span> &nbsp;| &copy; 2022 Highradius Corporation.
        All rights reserved.
      </footer>
    </div>
  );
}

export default App;
