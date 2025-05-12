import React, { useState } from "react";
import type { QuoteItem } from "../type/type";

type Props = {
  data: QuoteItem;
  setIsModalOpen: (value: boolean) => void;
  onSave: (updatedData: QuoteItem) => void;
};

const EditQuoteModal: React.FC<Props> = ({ data, onSave, setIsModalOpen }) => {
  const [formData, setFormData] = useState<QuoteItem>(data);
  const [errors, setErrors] = useState<
    Partial<Record<keyof QuoteItem, string>>
  >({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newValue =
      name === "noQuotes" || name === "id" ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };

      if (value.trim() !== "") {
        delete updatedErrors[name as keyof QuoteItem];

        if (name === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            updatedErrors.email = "Invalid email address";
          } else {
            delete updatedErrors.email;
          }
        }

        if (name === "noQuotes" && isNaN(Number(value))) {
          updatedErrors[name as keyof QuoteItem] = "Must be a number";
        } else if (name === "noQuotes") {
          delete updatedErrors[name as keyof QuoteItem];
        }
      }

      return updatedErrors;
    });
  };

  const handleSave = () => {
    const newErrors: Partial<Record<keyof QuoteItem, string>> = {};

    const requiredFields: (keyof QuoteItem)[] = [
      "quote",
      "date",
      "customer",
      "site",
      "noQuotes",
      "subTotal",
      "vat",
      "total",
      "deposit",
      "outstanding",
      "profit",
      "email",
      "description",
    ];

    requiredFields.forEach((field) => {
      const value = formData[field];
      if (
        value === undefined ||
        value === null ||
        value.toString().trim() === ""
      ) {
        newErrors[field] = "This field is required";
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (isNaN(Number(formData.noQuotes))) {
      newErrors.noQuotes = "Must be a number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedQuote: QuoteItem = {
      ...formData,
      checkbox: false,
    };

    onSave(updatedQuote);
    setErrors({});
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">
          Edit Quote #{formData.quote}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(formData).map(([key, value]) =>
            key !== "id" && key !== "checkbox" ? (
              <div key={key}>
                <label className="block text-sm font-medium capitalize mb-1">
                  {key}
                </label>
                {key === "description" ? (
                  <textarea
                    name={key}
                    value={value ?? ""}
                    onChange={handleChange}
                    className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                      errors[key as keyof QuoteItem]
                        ? "border-red-500 focus:ring-red-500"
                        : "focus:ring-blue-400"
                    }`}
                    rows={4}
                  />
                ) : (
                  <input
                    type={typeof value === "number" ? "number" : "text"}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                      errors[key as keyof QuoteItem]
                        ? "border-red-500 focus:ring-red-500"
                        : "focus:ring-blue-400"
                    }`}
                  />
                )}
                {errors[key as keyof QuoteItem] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[key as keyof QuoteItem]}
                  </p>
                )}
              </div>
            ) : null
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditQuoteModal;
