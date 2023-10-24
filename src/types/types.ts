export interface InvoiceProps {
  _id: string;
  description: string;
  senderStreet: string;
  senderCity: string;
  senderPostCode: string;
  senderCountry: string;
  createdAt: string;
  paymentDue: string;
  clientName: string;
  clientStreet: string;
  clientPostCode: string;
  clientCity: string;
  clientCountry: string;
  clientEmail: string;
  items: { name: string; quantity: number; price: number }[];
}

export interface DefaultValues {
  project: string;
  supplierStreetAddress: string;
  supplierCity: string;
  supplierPostcode: string;
  supplierCountry: string;
  invoiceDate: string;
  clientName: string;
  clientStreetAddress: string;
  clientPostcode: string;
  clientCity: string;
  clientCountry: string;
  clientEmail: string;
  [key: string]: string;
}

export interface InvoiceData {
  _id?: string;
  description: string;
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  createdAt: string;
  paymentDue: string;
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientName: string;
  clientEmail: string;
  items: { name: string; quantity: string; price: number}[];
}

export interface DatePickerProps {
  field: {
    onChange: (date: Date | null) => void;
    value: Date | null;
  };
}

export type Inputs = {
  supplierStreetAddress: string;
  supplierCity: string;
  supplierPostcode: string;
  supplierCountry: string;
  clientName: string;
  clientEmail: string;
  clientStreetAddress: string;
  clientCity: string;
  clientPostcode: string;
  clientCountry: string;
  invoiceDate: string;
  paymentTerms: string;
  project: string;
} & {
  [key: `name-${number}`]: string;
  [key: `quantity-${number}`]: string;
  [key: `price-${number}`]: string;
};

export interface PaymentTermsPickerProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export interface MyInputProps {
  label: string;
  classNameCustom?: string;
  placeholder?: string;
  min?: number | string;
  type?: string;
  step?: number | string;
}
