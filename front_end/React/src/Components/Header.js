import React from "react";
import "./Header.css";
import { Modal, Box, TextField } from "@mui/material";
import moment from "moment";

import axios from "axios";

import { useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";



import name from "../media/name.png";
import logo from "../media/logo.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  height: "auto",
  p: 2,
  bgcolor: "#2a3e4c",

  boxShadow: 24,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",

  color: "white",
};

const addstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  height: "auto",
  p: 2,
  bgcolor: "#2a3e4c",

  boxShadow: 24,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",

  color: "white",
};

export default function Header({
  selectedRows,
  details,
  setDetails,
  handleRefresh,
}) {
  const { register, handleSubmit } = useForm();

  const convertDate = (date) => {
    return date ? moment(date).format("YYYY-MM-DD") : null;
  };

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      clear_date: convertDate(data.clear_date),
      posting_date: convertDate(data.posting_date),
      due_in_date: convertDate(data.due_in_date),
      document_create_date: convertDate(data.document_create_date),
      baseline_create_date: convertDate(data.baseline_create_date),
    };
    console.log(formData);

    fetch("http://localhost:8080/HighRadiusWork/AddDetail", {
      method: "POST",
      body: JSON.stringify({
        sl_no: 1,
        business_code: formData.business_code,
        cust_number: formData.cust_number,
        clear_date: formData.clear_date,
        buisness_year: formData.buisness_year,
        doc_id: formData.doc_id,
        posting_date: formData.posting_date,
        document_create_date: formData.document_create_date,

        due_in_date: formData.due_in_date,
        baseline_create_date: formData.baseline_create_date,
        cust_payment_terms: formData.cust_payment_terms,
        invoice_currency: formData.invoice_currency,
        document_type: formData.document_type,
        posting_id: formData.posting_id,
        invoice_id: formData.invoice_id,
        total_open_amount: formData.total_open_amount,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      handleRefresh();
    });

    setAdd(false);
  };

  const [ifAdvance, setAdvance] = React.useState(false);
  const openAdvance = () => setAdvance(true);
  const closeAdvance = () => setAdvance(false);

  const [ifAdd, setAdd] = React.useState(false);
  const openAddModel = () => setAdd(true);
  const closeAddModel = () => setAdd(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [ifDelete, setDelete] = React.useState(false);
  const openDeleteModel = () => setDelete(true);
  const closeDeleteModel = () => setDelete(false);

  const [docId, setDocId] = useState("");
  const [cpt, setCpt] = useState("");
  const [currency, setCurrency] = useState("");
  const [cnum, setCnum] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [byear, setByear] = useState("");

  /**HANDLE DELETE **/
  let handleDelete = async (e) => {
    e.preventDefault();

    // selectedRows is a prop which is an array of objects
    // having the details of the selected row

    console.log(selectedRows);

    let arr = [];
    // making an array of ids i.e sl_no selected

    for (let i = 0; i < selectedRows.length; i++) {
      arr.push(selectedRows[i].id);
    }

    console.log(arr);

    fetch("http://localhost:8080/HighRadiusWork/deleteservlet", {
      method: "POST",
      body: JSON.stringify({
        ids: arr,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      handleRefresh();
    });

    setDelete(false); //this is used to close Modal
  };

  /**HANDLE EDIT **/
  let handleEdit = async (e) => {
    e.preventDefault();

    //currency and cpt is a local state for getting input

    console.log(currency);

    

    axios
      .post("http://localhost:8080/HighRadiusWork/EditServlet", {
        invoice_currency: currency,
        cust_payment_terms: cpt,
        id: selectedRows[0].id,
      })
      .then((response) => {
        console.log(response);
        handleRefresh();
      });

    setOpen(false); // to close Modal
  };

  /*HANDLE SEARCH*/
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const key = event.target.value;

      // details = fetch api result array
if(key!="")
        {
      const arr = details.filter((item) => {
        //  console.log( typeof item.cust_number);

        const custNumber = item.cust_number;
        
         
        if ( custNumber && custNumber.includes(key)) { //if i want it should strictly starts that pattern: custNumber.startsWith(key)
          return item;
        }
      
        return null;
      });


    
      console.log(arr.length);

      setDetails(arr);
    }
    else{
      handleRefresh();
    }
    }
  };
  /* Handle Advanced Search */
  const handleSearch = (event) => {
    event.preventDefault();

    const arr = details.filter((item) => {
      if ( 
        item.cust_number.includes(cnum) &&
        item.buisness_year.includes(byear) &&
        item.doc_id.includes(docId) &&
        item.invoice_id.includes(invoiceId)
      ) {
        return item;
      }
      return null;
    });

    console.log(arr.length);

    setDetails(arr);
    setAdvance(false);
  };
  /**Handle Predict **/
  const handlePredict = async () => {
    console.log("handle predict");
    const doc_ids = [];
    selectedRows.map((i) => {
             doc_ids.push(parseInt(i.doc_id));
    });
    console.log(doc_ids);
    const headers = {
             "Access-Control-Allow-Origin": "*",
             "Content-Type": "application/json",
    };

    const res = await axios.post(
             "http://127.0.0.1:5000/get_prediction",
             {
                      data: doc_ids,
             },

             {
                      params: {
                               type: "post",
                      },
                      headers: {
                               "Content-Type": "application/json",
                      },
             }
    );

    console.log(res.data);

    const result = res.data;
    result.map((item) => {
             const updatedDetails = details.map((i) => {
                      if (item.doc_id.startsWith(i.doc_id)) {
                               i.aging_bucket = item.aging_bucket;
                               console.log(item);
                      }
                      return i;
             });

             setDetails(updatedDetails);
    });
};

  return (
    <header>
      <section id="flex-list">
        <div className="logo-item">
          <img src={name} alt="name-logo" />
        </div>
        <div className="logo-item logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="logo-item"></div>
        <div className="invoice-list">Invoice List</div>
      </section>

      <section id="search-bar">
        <div id="buttons">
          <div id="three-buttons">
          {selectedRows.length >= 1 ? (
              <div
                id="predict"
                className="three-one predict"
                onClick={handlePredict}
              >
                Predict
              </div>
            ) : (
              <div
                id="predict"
                className="three-one disabled"
                title="Show Predictable Data"
              >
                Predict
              </div>
            )}
            <div id="analytics" className="three-one">
              Analytics View
            </div>
            <div id="advanvce" className="three-one" onClick={openAdvance}>
              Advance Search
            </div>
          </div>
          <div
            id="refresh-btn"
            onClick={() => {
              handleRefresh();
            }}
          >
            <img
              src="https://img.icons8.com/external-kmg-design-flat-kmg-design/16/000000/external-refresh-arrow-kmg-design-flat-kmg-design-1.png"
              alt="img"
            />
          </div>

          {/* <input
            id="input-search"
            placeholder=""
           
          /> */}

          <TextField
            sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
            required
            id="filled-required"
            label="Search Customer Id"
            name="search cust_id"
            variant="standard"
            onKeyDown={handleKeyDown}
            style={{ width: "20%" }}
          />
          <div id="three-buttons">
            <div id="Add" className="three-one" onClick={openAddModel}>
              Add
            </div>
            {selectedRows.length === 1 ? (
              <div id="Edit" className="three-one" onClick={handleOpen}>
                Edit
              </div>
            ) : (
              <div id="Edit" className="three-one disabled">
                Edit
              </div>
            )}

            {selectedRows.length >= 1 ? (
              <div id="Delete" className="three-one" onClick={openDeleteModel}>
                Delete
              </div>
            ) : (
              <div id="Delete" className="three-one disabled">
                Delete
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Add Modal */}

      <Modal
      open={ifAdd}
      onClose={() => setAdd(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={addstyle}>
        <div className="box-container">
          <div>
            <p>Add</p>
          </div>

          <div className="box-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                required
                id="filled-required"
                label="Business Code"
                name="business_code"
                variant="standard"
                {...register("business_code", { required: true })}
              />
              <TextField
                sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                required
                id="filled-required"
                label="Customer Number"
                name="cust_number"
                type="number"
                variant="standard"
                {...register("cust_number", { required: true })}
              />
              <TextField
                sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                required
                id="filled-required"
                label="clear_date"
                name="clear_date"
                type="date"
                variant="standard"
                InputLabelProps={{ shrink: true, required: true }}
                {...register("clear_date", { required: true })}
              />

              <TextField
                sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                required
                id="filled-required"
                label="buisness_year"
                name="buisness_year"
                variant="standard"
                type="number"
                {...register("buisness_year", { required: true })}
              />
              <TextField
                sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                required
                id="filled-required"
                label="doc_id"
                name="doc_id"
                variant="standard"
                {...register("doc_id", { required: true })}
              />

              <TextField
                sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                required
                id="filled-required"
                label="posting_date"
                name="posting_date"
                type="date"
                variant="standard"
                InputLabelProps={{ shrink: true, required: true }}
                {...register("posting_date", { required: true })}
              />

              <TextField
                sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                required
                id="filled-required"
                label="document_create_date"
                name="document_create_date"
                type="date"
                variant="standard"
                InputLabelProps={{ shrink: true, required: true }}
                {...register("document_create_date", { required: true })}
              />

              <TextField
                sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                required
                id="filled-required"
                label="due_in_date"
                name="due_in_date"
                type="date"
                variant="standard"
                InputLabelProps={{ shrink: true, required: true }}
                {...register("due_in_date", { required: true })}
              />

              <TextField
                sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                required
                id="filled-required"
                label="baseline_create_date"
                name="baseline_create_date"
                type="date"
                variant="standard"
                InputLabelProps={{ shrink: true, required: true }}
                {...register("baseline_create_date", { required: true })}
              />

              <TextField
                sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                required
                id="filled-required"
                label="cust_payment_terms"
                name="cust_payment_terms"
                variant="standard"
                {...register("cust_payment_terms", { required: true })}
              />
              <TextField
                sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                required
                id="filled-required"
                label="invoice_currency"
                name="invoice_currency"
                variant="standard"
                {...register("invoice_currency", { required: true })}
              />
              <TextField
                sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                required
                id="filled-required"
                label="document_type"
                name="document_type"
                variant="standard"
                {...register("document_type", { required: true })}
              />
              <TextField
                sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                required
                id="filled-required"
                label="posting_id"
                name="posting_id"
                variant="standard"
                type="number"
                {...register("posting_id", { required: true })}
              />
              <TextField
                sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                required
                id="filled-required"
                label="invoice_id"
                name="invoice_id"
                variant="standard"
                type="number"
                {...register("invoice_id", { required: true })}
              />
              <TextField
                sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                required
                id="filled-required"
                label="total_open_amount"
                name="total_open_amount"
                variant="standard"
                {...register("total_open_amount", { required: true })}
              />
<div style={{width:"100%"}}>
              <button type="submit" className="span-cancel">
                ADD
              </button>

              <button className="span-cancel" onClick={() => setAdd(false)}>
                CANCEL
              </button>
              
              </div>
            </form>
          </div>
        </div>
      </Box>
    </Modal>

      {/* edit Modal */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="box-container">
            <div>
              <p>Edit</p>
            </div>
            <div className="box-form">
              <form onSubmit={handleEdit} className="flex-between">
                <TextField
                  sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                  required
                  id="filled-required"
                  label="invoice_currency"
                  name="invoice_currency"
                  variant="standard"
                  value={currency}
                  style={{ width: "45%" }}
                  onChange={(e) => setCurrency(e.target.value)}
                />

                <TextField
                  sx={{
                    margin: 1,

                    bgcolor: "white",
                    borderRadius: "5px",
                  }}
                  required
                  id="filled-required"
                  name="cust_payment_terms"
                  label="cust_payment_terms"
                  variant="standard"
                  value={cpt}
                  style={{ width: "45%" }}
                  onChange={(e) => setCpt(e.target.value)}
                />

                <button type="submit" className="span-cancel">
                  EDIT
                </button>
                <button className="span-cancel" onClick={handleClose}>
                  CANCEL
                </button>
              </form>
            </div>
          </div>
        </Box>
      </Modal>

      {/* delete popup modal */}

      <Modal
        open={ifDelete}
        onClose={closeDeleteModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="box-container">
            <div>
              <p>Delete Records ?</p>
            </div>
            <div className="box-form">
              <div style={{ marginBottom: "2rem" }}>
                Are you sure you want to delete these record[s] ?
              </div>

              <button
                type="submit"
                className="span-cancel"
                onClick={handleDelete}
              >
                DELETE
              </button>
              <button className="span-cancel" onClick={closeDeleteModel}>
                CANCEL
              </button>
            </div>
          </div>
        </Box>
      </Modal>

      {/* Advanved Search Modal */}

      <Modal
        open={ifAdvance}
        onClose={closeAdvance}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="box-container">
            <div>
              <p>Advance Search</p>
            </div>
            <div className="box-form">
              <form onSubmit={handleSearch} className="flex-between">
                <TextField
                  sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                  
                  id="filled-required"
                  label="Document Id"
                  name="doc_id"
                  variant="standard"
                  value={docId}
                  onChange={(e) => setDocId(e.target.value)}
                  style={{ width: "45%" }}
                />

                <TextField
                  sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                  
                  id="filled-required"
                  label="Invoice Id"
                  name="invoice_id"
                  variant="standard"
                  value={invoiceId}
                  onChange={(e) => setInvoiceId(e.target.value)}
                  style={{ width: "45%" }}
                />

                <TextField
                  sx={{ margin: 1, bgcolor: "white", borderRadius: "5px" }}
                  
                  id="filled-required"
                  label="Customer Number"
                  name="cust_number"
                  variant="standard"
                  value={cnum}
                  onChange={(e) => setCnum(e.target.value)}
                  style={{ width: "45%" }}
                />

                <TextField
                  sx={{
                    margin: 1,

                    bgcolor: "white",
                    borderRadius: "5px",
                  }}
                  
                  id="filled-required"
                  name="buisness_year"
                  label="Business Year"
                  variant="standard"
                  value={byear}
                  onChange={(e) => setByear(e.target.value)}
                  style={{ width: "45%" }}
                />

                <button type="submit" className="span-cancel">
                  SEARCH
                </button>
                <button className="span-cancel" onClick={closeAdvance}>
                  CANCEL
                </button>
              </form>
            </div>
          </div>
        </Box>
      </Modal>
    </header>
  );
}
