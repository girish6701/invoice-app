import React, { useState } from "react";
import Header from "./Header";
import StatusBox from "../small_components/StatusBox";
import styled from "styled-components";
import { Link } from "react-router-dom";
import EditInvoice from "./EditInvoice";
 
function PageTwo(props) {
  let invoice = JSON.parse(localStorage.getItem("SelectedInvoice"));
  const [currentInvoice, setCurrentInvoice] = useState(invoice);
  const [burgerStatus, setBurgerStatus] = useState(false);

  function handleEdit() {
    setBurgerStatus(true);
  }

  function handleDelete() {
    let invoices = JSON.parse(localStorage.getItem("Invoices"));
    let nonDeletedInvoices = invoices.filter(function (element) {
      return element.UniqueID !== currentInvoice.UniqueID;
    });
    localStorage.setItem("Invoices", JSON.stringify(nonDeletedInvoices));
  }

  function handleStatusChange() {
    setCurrentInvoice((prev) => {
      return { ...prev, Status: "Paid" };
    });
    let invoices = JSON.parse(localStorage.getItem("Invoices"));
    invoices.map((element) => {
      if (element.UniqueID === currentInvoice.UniqueID) {
        element.Status = "Paid";
      }
    });
    localStorage.setItem("Invoices", JSON.stringify(invoices));
  }

  return (
    <div>
      <Header theme={props.theme} setDarkTheme={props.setDarkTheme} />
      <EditInvoice
        burgerStatus={burgerStatus}
        current={currentInvoice}
        setCurrent={setCurrentInvoice}
        setBurgerStatus={setBurgerStatus}
        theme={props.theme}
      />
      <DetailsComponent changeStyle={props.theme}>
        <div className="component">
          <BackComponent changeStyle={props.theme}>
            <Link to="/">
              <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.342.886L2.114 5.114l4.228 4.228"
                  stroke="#9277FF"
                  strokeWidth="2"
                  fill="none"
                  fillRule="evenodd"
                />
              </svg>
            </Link>
            <p>Go back</p>
          </BackComponent>
          <DeleteComponent changeStyle={props.theme}>
            <div className="status-div">
              <p className="status-text">Status</p>
              <StatusBox status={currentInvoice.Status} />
            </div>
            <BtnDiv>
              <EditBtn onClick={handleEdit}>Edit</EditBtn>
              <Link to="/">
                <Button onClick={handleDelete}>Delete</Button>
              </Link>
              {currentInvoice.Status === "Pending" && (
                <MarkButton onClick={handleStatusChange}>
                  Mark as Paid
                </MarkButton>
              )}
            </BtnDiv>
          </DeleteComponent>
          <AllDetails changeStyle={props.theme}>
            <ContainerOne changeStyle={props.theme}>
              <div className="id-div">
                <p className="id-name">
                  <span>#</span>
                  {currentInvoice.UniqueID}
                </p>
                <p className="project-description">
                  {currentInvoice.Description}
                </p>
              </div>
              <div className="address-div">
                <p>
                  {currentInvoice.StreetAddress +
                    ", " +
                    currentInvoice.City +
                    ", " +
                    currentInvoice.PostCode +
                    ", " +
                    currentInvoice.Country}
                </p>
              </div>
            </ContainerOne>
            <ContainerTwo changeStyle={props.theme}>
              <div>
                <p className="small-heading">Invoice Date</p>
                <p className="main-text">{currentInvoice.Date}</p>
              </div>
              <div>
                <p className="small-heading">Bill To</p>
                <p className="main-text">{currentInvoice.ClientName}</p>
              </div>
              <div>
                <p className="small-heading email">Sent To</p>
                <p className="main-text">{currentInvoice.ClientEmail}</p>
              </div>
            </ContainerTwo>
            <ContainerTwo changeStyle={props.theme}>
              <div>
                <p className="small-heading">Payment Due</p>
                <p className="main-text">{currentInvoice.DueDate}</p>
              </div>
              <p className="small-heading small-width">
                {currentInvoice.ClientStreetAddress +
                  ", " +
                  currentInvoice.ClientCity +
                  ", " +
                  currentInvoice.ClientPostcode +
                  ", " +
                  currentInvoice.ClientCountry}
              </p>
            </ContainerTwo>
            <ItemContainer changeStyle={props.theme}>
              <div>
                <p className="info-text">Item Name</p>
                <p className="info">{currentInvoice.ItemName}</p>
              </div>
              <div>
                <p className="info-text">QTY.</p>
                <p className="info-light">{currentInvoice.Qty}</p>
              </div>
              <div>
                <p className="info-text">Price</p>
                <p className="info-light">£ {currentInvoice.Price}</p>
              </div>
              <div>
                <p className="info-text">Total</p>
                <p className="info">
                  £{" "}
                  {parseInt(currentInvoice.Price, 10) *
                    parseInt(currentInvoice.Qty, 10)}
                </p>
              </div>
            </ItemContainer>
            <TotalContainer changeStyle={props.theme}>
              <p className="amount-text">Amount Due</p>
              <p className="amount">
                £{" "}
                {parseInt(currentInvoice.Price, 10) *
                  parseInt(currentInvoice.Qty, 10)}
              </p>
            </TotalContainer>
          </AllDetails>
        </div>
      </DetailsComponent>
    </div>
  );
}

export default PageTwo;

const DetailsComponent = styled.div`
  background-color: ${(props) => (props.changeStyle ? "#141625" : "#f8f8fb")};
  display: flex;
  justify-content: center;
  padding: 0 15px;
  padding-bottom: 30px;

  .component {
    max-width: 650px;
    width: 100%;
    margin-top: 40px;
  }

  a:-webkit-any-link {
    text-decoration: none;
  }
`;

const BackComponent = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-left: 15px;
    font-size: 12px;
    font-weight: bold;
    color: ${(props) => (props.changeStyle ? "white" : "#0c0e16")};
  }
`;

const DeleteComponent = styled.div`
  background-color: ${(props) => (props.changeStyle ? "#1E2139" : "white")};
  border-radius: 8px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);

  .status-text {
    color: ${(props) => (props.changeStyle ? "#DFE3FA" : "#858bb2")};
    font-size: 12px;
    margin-right: 15px;
  }

  .status-div {
    width: 100%;
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 550px) {
    flex-direction: column;

    .status-div {
      justify-content: space-between;
    }
  }
`;

const BtnDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;

  @media screen and (max-width: 550px) {
    margin-top: 30px;
    justify-content: center;
  }
`;

const EditBtn = styled.div`
  background-color: #f9fafe;
  color: #7e88c3;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  width: 70px;
  height: 40px;
  margin-right: 10px;
  font-weight: bold;
  transition: all 0.4s;
  &:hover {
    background-color: #dfe3fa;
  }
`;

const Button = styled.div`
  background-color: #ec5757;
  color: white;
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.4s;
  &:hover {
    background-color: #ff9797;
  }
`;

const MarkButton = styled.div`
  margin-left: 10px;
  background-color: #7c5dfa;
  color: white;
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 12px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.4s;
  &:hover {
    background-color: #9277ff;
  }
`;

const AllDetails = styled.div`
  background-color: ${(props) => (props.changeStyle ? "#1E2139" : "white")};
  border-radius: 8px;
  margin-top: 20px;
  padding: 25px;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
`;

const ContainerOne = styled.div`
  display: flex;
  justify-content: space-between;

  .id-name {
    color: ${(props) => (props.changeStyle ? "white" : "black")};
    font-weight: bold;
  }

  .id-name span {
    color: #7e88c3;
  }

  .project-description {
    margin-top: 8px;
    color: ${(props) => (props.changeStyle ? "#DFE3FA" : "#7e88c3")};
    font-size: 13px;
  }

  .address-div {
    text-align: right;
    font-size: 11px;
    color: ${(props) => (props.changeStyle ? "#DFE3FA" : "#7e88c3")};
    max-width: 20%;
    line-height: 18px;
  }

  @media screen and (max-width: 660px) {
    flex-direction: column;

    .address-div {
      text-align: left;
      margin-top: 20px;
      max-width: 40%;
    }
  }
`;

const ContainerTwo = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 180px 180px 1fr;

  .small-heading {
    font-size: 12px;
    color: ${(props) => (props.changeStyle ? "#DFE3FA" : "#7e88c3")};
  }

  .main-text {
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
    color: ${(props) => (props.changeStyle ? "white" : "black")};
  }

  .small-width {
    max-width: 60%;
    line-height: 18px;
  }

  @media screen and (max-width: 660px) {
    grid-template-columns: calc(100% / 2) calc(100% / 2);

    .email {
      margin-top: 20px;
    }
  }
`;

const ItemContainer = styled.div`
  background-color: ${(props) => (props.changeStyle ? "#252945" : "#f9fafe")};
  padding: 30px;
  border-radius: 8px 8px 0 0;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  .info-text {
    font-size: 12px;
    margin-bottom: 16px;
    color: ${(props) => (props.changeStyle ? "#DFE3FA" : "#7e88c3")};
  }

  .info {
    color: ${(props) => (props.changeStyle ? "white" : "#0c0e16")};
    font-weight: bold;
    font-size: 13px;
  }

  .info-light {
    color: ${(props) => (props.changeStyle ? "#DFE3FA" : "#7e88c3")};
    font-size: 13px;
    font-weight: bold;
  }

  @media screen and (max-width: 370px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
    row-gap: 25px;
  }
`;

const TotalContainer = styled.div`
  background-color: ${(props) => (props.changeStyle ? "#0C0E16" : "#373b53")};
  padding: 30px;
  border-radius: 0 0 8px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .amount-text {
    font-size: 12px;
    color: #ffffff;
  }

  .amount {
    font-size: 22px;
    font-weight: bold;
    color: #ffffff;
  }
`;
