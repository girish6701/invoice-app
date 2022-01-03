import React from "react";
import styled from "styled-components";

function InputBox(props) {
  return (
    <Input changeStyle={props.theme} className={props.className}>
      {props.text && <p className="input-text">{props.text}</p>}
      <input
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </Input>
  );
}

const Input = styled.div.attrs((props) => ({
  className: props.className,
}))`
  margin-right: 10px;

  p {
    margin-top: 20px;
    margin-bottom: 8px;
  }
  input {
    background-color: ${(props) => (props.changeStyle ? "#1E2139" : "white")};
    color: ${(props) => (props.changeStyle ? "white" : "black")};
    border-radius: 4px;
    border: ${(props) =>
      props.changeStyle ? "1.3px solid #252945" : "1.3px solid #dfe3fa"};
    padding: 12px;
    width: 100%;
    font-weight: bold;
  }
  input:focus {
    outline: none;
    border: ${(props) =>
      props.changeStyle ? "1.4px solid #9277ff" : "1.4px solid #7C5DFA"};
  }
  input::placeholder {
    color: ${(props) => (props.changeStyle ? "#DFE3FA" : "")};
    font-weight: normal;
  }
  .input-text {
    color: ${(props) => (props.changeStyle ? "#DFE3FA" : "#7e88c3")};
    font-size: 12px;
  }
`;

export default InputBox;
