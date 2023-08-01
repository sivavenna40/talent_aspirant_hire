import { Address } from './address';

export interface Admin {
  adminId: number;
  adminName: string;
  adminGender: string;
  adminAge: string;
  adminEmail: string;
  adminMobileNumber: number;
  address: Address;
}
