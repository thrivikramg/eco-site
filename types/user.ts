export type Address = {
  _id?: string;
  label: string; // Home, Work, etc.
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault?: boolean;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  addresses: Address[];
  createdAt: Date;
};
