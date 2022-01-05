import React, { useState } from "react";
import InvoiceForm from "../small_components/InvoiceForm";

function CreateInvoice(props) {
  const [isDraft, setDraft] = useState(false);
  const [listItem, setListItem] = useState({
    UniqueID: makeid(),
    StreetAddress: "",
    City: "",
    PostCode: "",
    Country: "",
    ClientName: "",
    ClientEmail: "",
    ClientStreetAddress: "",
    ClientCity: "",
    ClientPostcode: "",
    ClientCountry: "",
    Description: "",
    ItemName: "",
    Qty: "",
    Price: "",
    Total: 0,
    Date: "",
    DueDate: "",
    Status: isDraft ? "Draft" : "Pending",
  });

  function makeid() {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var nums = "1234567890";
    var charactersLength = characters.length;
    var numsLength = nums.length;
    for (var i = 0; i < 2; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    for (var j = 0; j < 4; j++) {
      result += nums.charAt(Math.floor(Math.random() * numsLength));
    }
    return result;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setListItem((prevNote) => {
      return { ...prevNote, [name]: value };
    });
  }

  function handleClick() {
    setListItem((prevNote) => {
      return { ...prevNote, Date: "date.toDateString()" };
    });
    var a = JSON.parse(localStorage.getItem("Invoices")) || [];
    a.push(listItem);
    localStorage.setItem("Invoices", JSON.stringify(a));
    resetList();
    props.setBurgerStatus(false);
  }

  function handleDraft() {
    setListItem((prevNote) => {
      return { ...prevNote, Status: isDraft ? "Pending" : "Draft" };
    });
  }

  function resetList() {
    setListItem({
      UniqueID: makeid(),
      StreetAddress: "",
      City: "",
      PostCode: "",
      Country: "",
      ClientName: "",
      ClientEmail: "",
      ClientStreetAddress: "",
      ClientCity: "",
      ClientPostcode: "",
      ClientCountry: "",
      Description: "",
      ItemName: "",
      Qty: "",
      Price: "",
      Total: 0,
      Date: "",
      DueDate: "",
      Status: isDraft ? "Draft" : "Pending",
    });
  }

  return (
    <InvoiceForm
      listItem={listItem}
      setListItem={setListItem}
      isDraft={isDraft}
      setDraft={setDraft}
      handleChange={handleChange}
      handleClick={handleClick}
      handleDraft={handleDraft}
      burgerStatus={props.burgerStatus}
      setBurgerStatus={props.setBurgerStatus}
      theme={props.theme}
      edit={false}
      resetList={resetList}
    />
  );
}

export default CreateInvoice;
