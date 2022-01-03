import React from "react";
import styled from "styled-components";
import { ReactComponent as ReactLogo } from "../assets/illustration-empty.svg";

function NoInvoicesPage(props) {
  return (
    <EmptyContainer changeStyle={props.theme}>
      <div className="empty-div">
        <ReactLogo />
        <h3 className="empty-heading">There is nothing to here</h3>
        <p className="empty-text">
          Create an invoice by clicking the <span>New Invoice</span> button and
          get started
        </p>
      </div>
    </EmptyContainer>
  );
}

export default NoInvoicesPage;

const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${(props) => (props.changeStyle ? "#141625" : "#f8f8f8")};

  .empty-div {
    max-width: 300px;
  }

  .empty-heading {
    font-size: 18px;
    margin: 35px 0 20px 0;
    color: ${(props) => (props.changeStyle ? "white" : "#0c0e16")};
  }

  .empty-text {
    font-size: 12px;
    color: ${(props) => (props.changeStyle ? "#DFE3FA" : "#888eb0")};

    span {
      font-weight: bold;
    }
  }
`;
