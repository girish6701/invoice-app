import React, { useState } from "react";
import Header from "./Header";
import InvoicesHeading from "./InvoicesHeading";
import InvoiceTile from "../small_components/InvoiceTile";
import InvoiceForm from "./InvoiceForm";
import NoInvoicesPage from "./NoInvoicesPage";
import styled from "styled-components";

function PageOne(props) {
  const [burgerStatus, setBurgerStatus] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  var b = JSON.parse(localStorage.getItem("invoices"));

  function handleFilter(status) {
    var a = JSON.parse(localStorage.getItem("invoices"));
    if (status === "All") {
      return createInvoiceTile(a);
    } else {
      a = handleStatusChange(a, status);
      return createInvoiceTile(a);
    }
  }

  function handleStatusChange(a, status) {
    return a.filter(function (element) {
      return element.Status === status;
    });
  }

  function createInvoiceTile(a) {
    return (
      a !== null &&
      a.map((element, index) => {
        return (
          <InvoiceTile
            key={index}
            uniqueID={element.UniqueID}
            date={element.Date}
            name={element.ClientName}
            amount={parseInt(element.Price, 10) * parseInt(element.Qty, 10)}
            status={element.Status}
            theme={props.theme}
          />
        );
      })
    );
  }

  return (
    <Main changeStyle={props.theme}>
      <Header theme={props.theme} setDarkTheme={props.setDarkTheme} />
      <InvoicesHeading
        setBurgerStatus={setBurgerStatus}
        burgerStatus={burgerStatus}
        theme={props.theme}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      {(b === null || (b !== null && b.length === 0)) && (
        <NoInvoicesPage theme={props.theme} />
      )}
      <InvoiceForm
        burgerStatus={burgerStatus}
        setBurgerStatus={setBurgerStatus}
        theme={props.theme}
      />
      {handleFilter(filterStatus)}
    </Main>
  );
}

export default PageOne;

const Main = styled.div`
  background-color: ${(props) => (props.changeStyle ? "#141625" : "#f8f8fb")};
  min-height: 100vh;
  padding-bottom: 20px;
`;
