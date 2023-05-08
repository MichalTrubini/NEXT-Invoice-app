export default interface IDetails {
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
  items: {name: string; quantity: number; price: number; total: number}[]
}
