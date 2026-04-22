export interface IAddress {
  _id: string;
  title: string;
  address: string;
  city: string;
  state?: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface AddressFormData {
  title: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}