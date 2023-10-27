import { DefaultValues, InvoiceData } from "../types/types";

type FormValues = {
  name: string;
  quantity: string;
  price: string;
  [key: string]: string;
};

export function getItemsArray(obj: any) {
  const allFormItemValues = Object.keys(obj)
    .filter(
      (fieldName) =>
        fieldName.startsWith("name") ||
        fieldName.startsWith("quantity") ||
        fieldName.startsWith("price")
    )
    .reduce((filteredValues: Record<string, string>, fieldName) => {
      filteredValues[fieldName] = obj[fieldName];
      return filteredValues;
    }, {});

  const itemValuesArray = Array.from(
    {
      length:
        Math.max(
          ...Object.keys(allFormItemValues).map((key) =>
            parseInt(key.split("_")[1], 10)
          )
        ) + 1,
    },
    () => ({ name: "", quantity: "", price: "" } as FormValues)
  );

  for (const key in allFormItemValues) {
    const [fieldName, number] = key.split("_");
    const index = parseInt(number, 10);
    itemValuesArray[index][fieldName] = allFormItemValues[key];
  }
  return itemValuesArray;
}

export function formatDate(date: Date | null): string {
  if (!date) return formatDate(new Date());
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function getDefaultValues(invoiceData: InvoiceData): DefaultValues {
  const defaultValues: DefaultValues = {
    clientCity: invoiceData.clientAddress.city,
    clientCountry: invoiceData.clientAddress.country,
    clientEmail: invoiceData.clientEmail,
    clientName: invoiceData.clientName,
    clientPostcode: invoiceData.clientAddress.postCode,
    clientStreetAddress: invoiceData.clientAddress.street,
    project: invoiceData.description,
    supplierCity: invoiceData.senderAddress.city,
    supplierCountry: invoiceData.senderAddress.country,
    supplierPostcode: invoiceData.senderAddress.postCode,
    supplierStreetAddress: invoiceData.senderAddress.street,
    invoiceDate: new Date() as any as string,
    paymentTerms: "Net 30 Days",
  };

  invoiceData.items.forEach((item, index) => {
    defaultValues[`name_${index}`] = item.name;
    defaultValues[`quantity_${index}`] = item.quantity.toString();
    defaultValues[`price_${index}`] = item.price.toString();
  });
  return defaultValues;
}

export function convertDateToString(value: any) {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return value;
}
