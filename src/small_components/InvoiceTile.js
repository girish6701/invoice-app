import React from "react";
import styled from "styled-components";
import StatusBox from "./StatusBox";
import { Link } from "react-router-dom";
 
function InvoiceTile(props) {
  function getInvoice(event) {
    let uniqueID = event.target.getAttribute("id");
    let invoices = JSON.parse(localStorage.getItem("Invoices"));
    let selectedInvoice = find(invoices, uniqueID);
    localStorage.setItem("SelectedInvoice", JSON.stringify(selectedInvoice));
  }

  function find(invoices, uniqueID) {
    return invoices.find((element) => {
      return element.UniqueID === uniqueID;
    });
  }

  return (
    <TileContainer>
      <Link to="/info" style={{ textDecoration: "none" }} id={props.uniqueID}>
        <InformationTile
          id={props.uniqueID}
          changeStyle={props.theme}
          onClick={(e) => {
            getInvoice(e);
          }}
        >
          <div className="IDdiv" id={props.uniqueID}>
            <span className="hashtag" id={props.uniqueID}>
              #
            </span>
            <span className="invoice-id" id={props.uniqueID}>
              {props.uniqueID}
            </span>
          </div>
          <p className="invoice-date" id={props.uniqueID}>
            {props.date}
          </p>
          <p className="name" id={props.uniqueID}>
            {props.name}
          </p>
          <p className="amount" id={props.uniqueID}>
            £ {props.amount}
          </p>
          <RightContainer id={props.uniqueID}>
            <StatusBox
              id={props.uniqueID}
              status={props.status}
              changeStyle={props.theme}
            />
            <svg
              id={props.uniqueID}
              width="7"
              height="10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id={props.uniqueID}
                d="M1 1l4 4-4 4"
                stroke="#7C5DFA"
                strokeWidth="2"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
          </RightContainer>
        </InformationTile>
      </Link>
    </TileContainer>
  );
}

export default InvoiceTile;

const TileContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  padding: 0 15px;
`;

const InformationTile = styled.div`
  box-sizing: border-box;
  background-color: ${(props) => (props.changeStyle ? "#1E2139" : "white")};
  max-width: 730px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 25px;
  box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.100397);
  border-radius: 8px;
  cursor: pointer;

  p,
  .IDdiv {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .hashtag {
    color: #7e88c3;
    font-size: 12px;
    font-weight: bold;
  }
  .invoice-id {
    color: ${(props) => (props.changeStyle ? "white" : "black")};
    font-weight: bold;
    font-size: 12px;
  }
  .invoice-date {
    color: ${(props) => (props.changeStyle ? "#DFE3FA" : "#888eb0")};
    font-size: 12px;
  }
  .name {
    font-size: 12px;
    color: ${(props) => (props.changeStyle ? "#DFE3FA" : "#858bb2")};
    text-align: left;
  }
  .amount {
    justify-content: center;
    font-size: 15px;
    font-weight: bold;
    color: ${(props) => (props.changeStyle ? "white" : "#0c0e16")};
    text-align: right;
  }

  &:hover {
    outline: 1.5px solid #7c5dfa;
  }

  @media screen and (max-width: 550px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;

    .IDdiv {
      grid-column-start: 1;
      grid-column-end: 2;
      grid-row-start: 1;
      grid-row-end: 2;
    }

    .name {
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 2;
      justify-content: flex-end;
    }

    .invoice-date {
      margin-top: 15px;
    }

    .amount {
      margin-top: 6px;
      justify-content: flex-start;
    }
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;

  svg {
    cursor: pointer;
    margin-left: 20px;
  }

  @media screen and (max-width: 550px) {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 4;
    margin-top: 15px;
    justify-content: flex-end;
  }
`;
