import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import BackwardsNavbar from "../../../../comps/backwardsNavbar";

type CardFormItem = {
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  cardHolder: string;
};

const CardItemEditForm: NextPage = () => {
  const { query } = useRouter();
  const editCardItemId = query.item;
  const newCardItemForm: CardFormItem = {
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
    cardHolder: "",
  };
  const [formData, setFormData] = useState<CardFormItem>(newCardItemForm);

  const submitFormData = () => {
    console.log("Submit formData:", formData);
  };

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, dataset } = target;
    const { field } = dataset;
    setFormData({ ...formData, [`${field}`]: value });
  };

  const onCancleForm = (event: React.MouseEvent) => {
    event.preventDefault();
    history.back();
  };

  useEffect(() => {
    console.log("Get card Item:", editCardItemId);
    if (editCardItemId) {
      setFormData({
        cardNumber: "TEST CARD EDIT 1234",
        expirationDate: "TEST-EDIT-EXP-DATE",
        securityCode: "TEST-EDIT-SECURITY-CODE",
        cardHolder: "TEST-EDIT-CARD-HOLDER",
      });
    } else {
      setFormData(newCardItemForm);
    }
  }, [editCardItemId]);

  return (
    <div>
      <BackwardsNavbar
        label={editCardItemId ? "Edit Card" : "Add Card"}
        onReturnClick={() => history.back()}
      />

      <div className="flex flex-col px-4 items-center">
        <div className="w-full mb-48">
          <form className="p-3" onSubmit={submitFormData}>
            <div className="flex flex-col my-3">
              <label>Card Number</label>
              <input
                className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                type="text"
                placeholder="Card Number"
                data-field="cardNumber"
                value={formData.cardNumber}
                onChange={onInputChange}
              />
            </div>

            <div className="flex flex-col my-3">
              <label>Expiration Date</label>
              <input
                className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                type="text"
                placeholder="Expiration Date"
                data-field="expirationDate"
                value={formData.expirationDate}
                onChange={onInputChange}
              />
            </div>

            <div className="flex flex-col my-3">
              <label>Security Code</label>
              <input
                className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                type="text"
                placeholder="Security Code"
                data-field="securityCode"
                value={formData.securityCode}
                onChange={onInputChange}
              />
            </div>

            <div className="flex flex-col my-3">
              <label>Card Holder</label>
              <input
                className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                type="text"
                placeholder="Card Holder"
                data-field="cardHolder"
                value={formData.cardHolder}
                onChange={onInputChange}
              />
            </div>

            <div className="flex flex-row w-full justify-end">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded w-20 mr-4"
                onClick={onCancleForm}
              >
                cancle
              </button>

              <button
                type="submit"
                className="bg-accent-color text-white px-4 py-2 rounded w-20"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CardItemEditForm;
