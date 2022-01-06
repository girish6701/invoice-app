import React from "react";
import styled from "styled-components";

function StatusBox(props) {
  return (
    <StatusContainer
      id={props.id}
      statusInfo={props.status}
      changeStyle={props.changeStyle}
    >
      <p className="status" id={props.id}>
        <span id={props.id}>●</span>
        {props.status}
      </p>
    </StatusContainer>
  );
}

const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 104px;
  height: 40px;
  border-radius: 6px;
  background-color: ${(props) =>
    props.statusInfo === "Pending"
      ? "rgba(255, 143, 0, 0.06)"
      : props.statusInfo === "Paid"
      ? "rgba(51, 214, 159, 0.06)"
      : "rgba(151, 151, 151,0.06)"};

  .status {
    font-weight: bold;
    font-size: 12px;
    color: ${(props) =>
      props.statusInfo === "Pending"
        ? "rgba(255, 143, 0)"
        : props.statusInfo === "Paid"
        ? "rgba(51, 214, 159)"
        : props.changeStyle === true
        ? "#DFE3FA"
        : "rgba(55, 59, 83)"};
  }
  .status span {
    font-size: 18px;
    margin-right: 4px;
  }
`;

export default StatusBox;
