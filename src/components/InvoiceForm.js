import React, { useState } from "react";
import styled from "styled-components";
import InputBox from "../small_components/InputBox";

function InvoiceForm(props) {
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
    Status: "Pending",
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
    var a = JSON.parse(localStorage.getItem("invoices")) || [];
    a.push(listItem);
    localStorage.setItem("invoices", JSON.stringify(a));
    resetList();
    props.setBurgerStatus(false);
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
      Status: "Pending",
    });
  }

  return (
    <NewInvoice show={props.burgerStatus} changeStyle={props.theme}>
      <h2>New Invoice</h2>
      <p className="text">Bill Form</p>
      <InputBox
        text="Street Address"
        type="text"
        name="StreetAddress"
        value={listItem.StreetAddress}
        onChange={(e) => handleChange(e)}
        theme={props.theme}
      />
      <ThreeInput>
        <InputBox
          text="City"
          type="text"
          name="City"
          value={listItem.City}
          onChange={(e) => handleChange(e)}
          theme={props.theme}
        />
        <InputBox
          text="Post Code"
          type="text"
          name="PostCode"
          value={listItem.PostCode}
          onChange={(e) => handleChange(e)}
          theme={props.theme}
        />
        <InputBox
          text="Country"
          type="text"
          name="Country"
          value={listItem.Country}
          onChange={(e) => handleChange(e)}
          theme={props.theme}
          className="first-input"
        />
      </ThreeInput>
      <p className="text">Bill To</p>
      <InputBox
        text="Client's Name"
        type="text"
        name="ClientName"
        value={listItem.ClientName}
        onChange={(e) => handleChange(e)}
        theme={props.theme}
      />
      <InputBox
        text="Client's Email"
        type="email"
        placeholder="e.g. email@example.com"
        name="ClientEmail"
        value={listItem.ClientEmail}
        onChange={(e) => handleChange(e)}
        theme={props.theme}
      />
      <InputBox
        text="Street Address"
        type="text"
        name="ClientStreetAddress"
        value={listItem.ClientStreetAddress}
        onChange={(e) => handleChange(e)}
        theme={props.theme}
      />
      <ThreeInput>
        <InputBox
          text="City"
          type="text"
          name="ClientCity"
          value={listItem.ClientCity}
          onChange={(e) => handleChange(e)}
          theme={props.theme}
        />
        <InputBox
          text="Post Code"
          type="text"
          name="ClientPostcode"
          value={listItem.ClientPostcode}
          onChange={(e) => handleChange(e)}
          theme={props.theme}
        />
        <InputBox
          text="Country"
          type="text"
          name="ClientCountry"
          value={listItem.ClientCountry}
          onChange={(e) => handleChange(e)}
          theme={props.theme}
          className="first-input"
        />
      </ThreeInput>
      <CalenderStatusDiv changeStyle={props.theme}>
        <CalendarDiv>
          <InputBox
            text="Invoice Date"
            type="text"
            placeholder="24-10-2021"
            name="Date"
            value={listItem.Date}
            onChange={(e) => handleChange(e)}
            theme={props.theme}
          />
        </CalendarDiv>
        {/* <select name="Status" id="Status" onChange={(e) => handleChange(e)}>
          <option value="Pending">Pending</option>
          <option value="Draft">Draft</option>
          <option value="Paid">Paid</option>
        </select> */}
        <CalendarDiv>
          <InputBox
            text="Due Date"
            type="text"
            placeholder="20-11-2021"
            name="DueDate"
            value={listItem.DueDate}
            onChange={(e) => handleChange(e)}
            theme={props.theme}
          />
        </CalendarDiv>
      </CalenderStatusDiv>
      <InputBox
        text="Project Description"
        type="text"
        placeholder="e.g. Graphic Design Service"
        name="Description"
        value={listItem.Description}
        onChange={(e) => handleChange(e)}
        theme={props.theme}
      />
      <p className="item-list">Item List</p>
      <FourInput changeStyle={props.theme}>
        <InputBox
          text="Item Name"
          name="ItemName"
          type="text"
          value={listItem.ItemName}
          onChange={(e) => handleChange(e)}
          theme={props.theme}
          className="item-name"
        />
        <InputBox
          text="Qty."
          name="Qty"
          type="number"
          value={listItem.Qty}
          onChange={(e) => handleChange(e)}
          theme={props.theme}
        />
        <InputBox
          text="Price"
          name="Price"
          type="number"
          value={listItem.Price}
          onChange={(e) => handleChange(e)}
          theme={props.theme}
        />
        <div>
          <p className="total">Total</p>
          <p
            className="total-value"
            style={{ color: props.theme ? "white" : "black" }}
          >
            {listItem.Price &&
              listItem.Qty &&
              parseInt(listItem.Price, 10) * parseInt(listItem.Qty, 10)}
            {(listItem.Price === "" || listItem.Qty === "") && 0}
          </p>
        </div>
      </FourInput>
      <ActivityButtons>
        <DiscardButton
          onClick={() => {
            resetList();
            props.setBurgerStatus(false);
          }}
        >
          Discard
        </DiscardButton>
        <div style={{ display: "flex" }}>
          <SendButton onClick={handleClick}>Save & Send</SendButton>
        </div>
      </ActivityButtons>
    </NewInvoice>
  );
}

export default InvoiceForm;

const NewInvoice = styled.div`
  max-width: 700px;
  background-color: ${(props) =>
    props.changeStyle ? "rgb(20, 22, 37)" : "white"};
  position: absolute;
  height: calc(100% - 70px);
  overflow: scroll;
  overflow-x: hidden;
  top: 70px;
  left: 0;
  border-radius: 0 8px 8px 0;
  padding: 50px 30px;
  display: flex;
  flex-direction: column;
  transform: ${(props) => (props.show ? "translateX(0)" : "translateX(-100%)")};

  h2 {
    color: ${(props) => (props.changeStyle ? "white" : "black")};
  }

  .text {
    color: #7c5dfa;
    font-size: 12px;
    margin-top: 40px;
    font-weight: bold;
  }

  .item-list {
    color: #777f98;
    font-size: 18px;
    margin-top: 30px;
    font-weight: bold;
  }
`;

const ThreeInput = styled.div`
  display: flex;
  justify-content: space-between;

  select {
    width: 100%;
    margin-top: 20px;
    padding: 8px;
  }

  .first-input {
    grid-column-start: 1;
    grid-column-end: 3;
  }

  @media screen and (max-width: 670px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

const FourInput = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 8px;

  .total {
    margin-top: 20px;
    margin-bottom: 8px;
    color: ${(props) => (props.changeStyle ? "#DFE3FA" : "#7e88c3")};
    font-size: 12px;
  }

  .total-value {
    margin-top: 20px;
    font-size: 14px;
    font-weight: bold;
  }

  @media screen and (max-width: 430px) {
    grid-template-columns: 1fr 1fr 1fr;

    .item-name {
      grid-column-start: 1;
      grid-column-end: 4;
    }
  }
`;

const ActivityButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

const DiscardButton = styled.div`
  background: #f9fafe;
  color: #7e88c3;
  font-weight: bold;
  font-size: 12px;
  border-radius: 24px;
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.4s;
  &:hover {
    background-color: #dfe3fa;
  }
`;

const SendButton = styled.div`
  background: #7c5dfa;
  padding: 15px 20px;
  color: #ffffff;
  font-weight: bold;
  border-radius: 24px;
  cursor: pointer;
  font-size: 12px;
  margin-left: 10px;
  transition: all 0.4s;
  &:hover {
    background-color: #9277ff;
  }
`;

const CalendarDiv = styled.div`
  width: 100%;
`;

const CalenderStatusDiv = styled.div`
  display: flex;
  ${"" /* margin-top: 20px; */}
  align-items: center;
  justify-content: space-between;

  ${
    "" /* select {
    margin-right: 10px;
    padding: 12px;
    width: 100%;
    background-color: ${(props) => (props.changeStyle ? "#1E2139" : "white")};
    border-radius: 4px;
    border: ${(props) =>
      props.changeStyle ? "1px solid #252945" : "1px solid #dfe3fa"};
    color: ${(props) => (props.changeStyle ? "#DFE3FA" : "#7e88c3")};
  } */
  }
`;
