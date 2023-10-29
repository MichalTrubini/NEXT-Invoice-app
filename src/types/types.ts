export interface InvoiceProps {
  invoiceNumber: string;
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
  invoiceNumber?: string;
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  createdAt: string;
  status?: string;
  paymentDue: string;
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientName: string;
  clientEmail: string;
  items: { name: string; quantity: string; price: string}[];
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
  [key: string]: string;
} & {
  [key: `name_${number}`]: string;
  [key: `quantity_${number}`]: string;
  [key: `price_${number}`]: string;
};

export interface PaymentTermsPickerProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export interface MyInputProps {
  label: string;
  labelCustomClass?: string;
  inputCustomClass?: string;
  placeholder?: string;
  min?: number | string;
  type?: string;
  step?: number | string;
}

export interface MyNativeEvent extends Event {
  submitter: HTMLButtonElement;
}

export interface Counter {
  _id: string;
  seq: number;
}