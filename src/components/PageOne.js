import React, { useState } from "react";
import Header from "./Header";
import InvoicesHeading from "./InvoicesHeading";
import InvoiceTile from "../small_components/InvoiceTile";
import CreateInvoice from "./CreateInvoice";
import NoInvoicesPage from "./NoInvoicesPage";
import styled from "styled-components";

function PageOne(props) {
  const [burgerStatus, setBurgerStatus] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  let invoices = JSON.parse(localStorage.getItem("Invoices"));

  function handleFilter(status) {
    let filterInvoices = JSON.parse(localStorage.getItem("Invoices"));
    if (status === "All") {
      return createInvoiceTile(filterInvoices);
    } else {
      filterInvoices = handleStatusChange(filterInvoices, status);
      return createInvoiceTile(filterInvoices);
    }
  }

  function handleStatusChange(filterInvoices, status) {
    return filterInvoices.filter(function (element) {
      return element.Status === status;
    });
  }

  function createInvoiceTile(filterInvoices) {
    return (
      filterInvoices !== null &&
      filterInvoices.map((element, index) => {
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
    <Main changeStyle={props.theme} >
      <Header theme={props.theme} setDarkTheme={props.setDarkTheme} />
      <InvoicesHeading
        setBurgerStatus={setBurgerStatus}
        burgerStatus={burgerStatus}
        theme={props.theme}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      {(invoices === null || (invoices !== null && invoices.length === 0)) && (
        <NoInvoicesPage theme={props.theme} />
      )}
      <CreateInvoice
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
