export interface InputName {
  firstName: Attributes;
  lastName: Attributes;
  email: Attributes;
  password: Attributes;
  passwordConfirmation: Attributes;
  terms: Attributes;
  _csrf: string;
}

export interface Attributes {
  name: string;
  label: string;
  type: string;
  msg: Message;
}
export interface Message {
  invalid: string;
  empty: string;
  min: string;
  max: string;
}
