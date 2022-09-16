import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import BackwardsNavbar from "../../../../comps/backwardsNavbar";

type PaypalFormItem = {
  username: string;
  email: string;
};

const PaypalForm: React.FC = () => {
  const { query } = useRouter();
  const editPaypalId = query.item;
  const newPaypalItemForm: PaypalFormItem = {
    username: "",
    email: "",
  };
  const [formData, setFormData] = useState<PaypalFormItem>(newPaypalItemForm);

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, dataset } = target;
    const { field } = dataset;
    setFormData({ ...formData, [`${field}`]: value });
  };

  const onCancleForm = (event: React.MouseEvent) => {
    event.preventDefault();
    history.back();
  };

  const onSubmitForm = () => {
    console.log("Submit formData:", formData);
  };

  useEffect(() => {
    if (editPaypalId) {
      setFormData({
        username: "TEST-PAYPAL-USERNAME-01",
        email: "TEST-PAYPAL-EMAIL-01",
      });
    } else {
      setFormData(newPaypalItemForm);
    }
  }, [editPaypalId]);

  return (
    <div>
      <BackwardsNavbar
        label={editPaypalId ? "Edit Paypal Account" : "Add Paypal Account"}
      />

      <div className="flex flex-col px-4 items-center">
        <div className="w-full mb-48">
          <form className="p-3" onSubmit={onSubmitForm}>
            <div className="flex flex-col my-3">
              <label>Username</label>
              <input
                className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                type="text"
                placeholder="Username"
                data-field="username"
                value={formData.username}
                onChange={onInputChange}
              />
            </div>

            <div className="flex flex-col my-3">
              <label>Email</label>
              <input
                className="p-2 mt-1 outline-none bg-slate-100 border-b-accent-color focus:border-b-2"
                type="email"
                placeholder="Email"
                data-field="email"
                value={formData.email}
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

export default PaypalForm;
