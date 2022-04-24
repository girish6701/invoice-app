import React from "react";
import styled from "styled-components";

function InvoicesHeading(props) {
  let a = JSON.parse(localStorage.getItem("Invoices"));

  function handleChange(event) {
    const { value } = event.target;
    props.setFilterStatus(value);
  }
 
  return (
    <MainContainer>
      <CenterContainer>
        <LeftContainer changeStyle={props.theme}>
          <h2>Invoices</h2>
          {(a === null || (a !== null && a.length === 0)) && <p>No invoices</p>}
          {a !== null && a.length !== 0 && a.length === 1 && (
            <p>{a.length} total invoice</p>
          )}
          {a !== null && a.length !== 0 && a.length !== 1 && (
            <p>{a.length} total invoices</p>
          )}
        </LeftContainer>
        <RightContainer>
          <FilterContainer changeStyle={props.theme}>
            <select
              defaultValue="All"
              name="filter"
              id="filter"
              onChange={(e) => handleChange(e)}
            >
              <option disabled value="All">
                Filter
              </option>
              <option value="All">All</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Draft">Draft</option>
            </select>
          </FilterContainer>
          <NewInvoiceButton onClick={() => props.setBurgerStatus(true)}>
            <Svg>
              <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.313 10.023v-3.71h3.71v-2.58h-3.71V.023h-2.58v3.71H.023v2.58h3.71v3.71z"
                  fill="#7C5DFA"
                  fillRule="nonzero"
                />
              </svg>
            </Svg>
            <p>New Invoice</p>
          </NewInvoiceButton>
        </RightContainer>
      </CenterContainer>
    </MainContainer>
  );
}

export default InvoicesHeading;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
`;

const CenterContainer = styled.div`
  max-width: 730px;
  padding: 0 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftContainer = styled.div`
  p {
    color: ${(props) => (props.changeStyle ? "#DFE3FA" : "#888eb0")};
    font-size: 12px;
    margin-top: 4px;
  }

  h2 {
    color: ${(props) => (props.changeStyle ? "#ffffff" : "#0c0e16")};
    font-size: 32px;
  }

  @media screen and (max-width: 550px) {
    h2 {
      font-size: 20px;
    }

    p {
      font-size: 10px;
    }
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FilterContainer = styled.div`
  margin-right: 30px;

  select {
    color: ${(props) => (props.changeStyle ? "#ffffff" : "black")};
    background: transparent;
    outline: none;
    border: none;
  }

  @media screen and (max-width: 550px) {
    margin-right: 10px;
    select {
      font-size: 12px;
    }
  }
`;

const NewInvoiceButton = styled.div`
  background-color: #7c5dfa;
  font-size: 10px;
  padding: 7px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.4s;
  p {
    color: white;
  }
  &:hover {
    background-color: #9277ff;
  }

  @media screen and (max-width: 550px) {
    font-size: 8px;
    padding: 5px;
  }
`;

const Svg = styled.div`
  background-color: white;
  padding: 7px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;

  @media screen and (max-width: 550px) {
    margin-right: 6px;
  }
`;
