import React, { useState } from "react";
import InvoiceForm from "../small_components/InvoiceForm";

function EditInvoice(props) {
  const [listItem, setListItem] = useState(props.current);
  const [isDraft, setDraft] = useState(
    listItem.Status === "Draft" ? true : false
  );

  function handleDraft() {
    setListItem((prevNote) => {
      return { ...prevNote, Status: isDraft ? "Pending" : "Draft" };
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setListItem((prevNote) => {
      return { ...prevNote, [name]: value };
    });
  }
  localStorage.setItem("SelectedInvoice", JSON.stringify(listItem));

  function handleClick() {
    var invoices = JSON.parse(localStorage.getItem("Invoices"));
    var currentInvoiceIndex = invoices.findIndex(
      (element) => element.UniqueID === listItem.UniqueID
    );
    props.setCurrent(JSON.parse(localStorage.getItem("SelectedInvoice")));
    invoices = invoices.map((element, index) => {
      if (index === currentInvoiceIndex) {
        return listItem;
      } else {
        return element;
      }
    });
    localStorage.setItem("Invoices", JSON.stringify(invoices));
    props.setBurgerStatus(!props.burgerStatus);
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
      edit={true}
      current={props.current}
    />
  );
}

export default EditInvoice;
