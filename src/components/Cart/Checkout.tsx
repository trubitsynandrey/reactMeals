import React, { useRef, useState } from "react";
import { UserData } from "../../types/types"
import styled from "styled-components";

const Form = styled.form`
  margin: 1rem 0;
  height: 19rem;
  overflow: auto;
`;

const FormItem = styled.div`
  margin-bottom: 0.5rem;
  & label {
    font-weight: bold;
    margin-bottom: 0.25rem;
    display: block;
  }
  & input {
    font: inherit;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 20rem;
    max-width: 100%;
  }
  &[data-invalid="true"] {
    & input {
      border-color: #aa0b20;
      background-color: #ffeff1;
    }
    & label {
      color: #ca3e51;
    }
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const CancelButton = styled.button`
  font: inherit;
  color: #5a1a01;
  cursor: pointer;
  background-color: transparent;
  border: none;
  border-radius: 25px;
  padding: 0.5rem 2rem;
  &:hover,
  &:active {
    background-color: #ffe6dc;
  }
`;

const SubmitButton = styled(CancelButton)`
  border: 1px solid #5a1a01;
  background-color: #5a1a01;
  color: white;
  &:hover,
  &:active {
    background-color: #7a2706;
  }
`;

type CheckoutProps = {
  hideCartModal: () => void;
  onConfirm: (UserData: UserData) => void
};

export const Checkout = ({ hideCartModal, onConfirm }: CheckoutProps) => {
  const [isFormItemsValid, setIsFormItemsValid] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });
  const isEmpty = (string: string | undefined) => string?.trim() === "";
  const isFiveChars = (string: string | undefined) =>
    string?.trim().length === 5;
  const nameInputRef = useRef<HTMLInputElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const postalInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const confirmHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredName = nameInputRef.current?.value;
    const enteredStreet = streetInputRef.current?.value;
    const enteredPostal = postalInputRef.current?.value;
    const enteredCity = cityInputRef.current?.value;

    const isEnteredNameValid = !isEmpty(enteredName);
    const isEnteredStreetValid = !isEmpty(enteredStreet);
    const isEnteredCityValid = !isEmpty(enteredCity);
    const isPostalValid = isFiveChars(enteredPostal);

    setIsFormItemsValid({
      name: isEnteredNameValid,
      street: isEnteredStreetValid,
      city: isEnteredCityValid,
      postal: isPostalValid,
    });

    const formIsValid =
      isEnteredNameValid &&
      isEnteredCityValid &&
      isEnteredStreetValid &&
      isPostalValid;

    if (!formIsValid) {
      return;
    }

    onConfirm({
      name: enteredName!,
      street: enteredCity!,
      city: enteredPostal!,
      postalCode: enteredPostal!
    });
  };
  return (
    <Form onSubmit={confirmHandler}>
      <FormItem data-invalid={!isFormItemsValid.name}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" ref={nameInputRef} />
        {!isFormItemsValid.name && <p>enter the valid name please</p>}
      </FormItem>
      <FormItem data-invalid={!isFormItemsValid.street}>
        <label htmlFor="street">Street</label>
        <input id="street" type="text" ref={streetInputRef} />
        {!isFormItemsValid.street && <p>enter the valid street please</p>}
      </FormItem>
      <FormItem data-invalid={!isFormItemsValid.postal}>
        <label htmlFor="postal">Postal Code</label>
        <input id="postal" type="text" ref={postalInputRef} />
        {!isFormItemsValid.postal && <p>enter the valid postal code please</p>}
      </FormItem>
      <FormItem data-invalid={!isFormItemsValid.city}>
        <label htmlFor="city">City</label>
        <input id="city" type="text" ref={cityInputRef} />
        {!isFormItemsValid.city && <p>enter the valid city please</p>}
      </FormItem>
      <Actions>
        <CancelButton type="button" onClick={hideCartModal}>
          Cancel
        </CancelButton>
        <SubmitButton>Submit</SubmitButton>
      </Actions>
    </Form>
  );
};
