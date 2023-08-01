import { Address } from './address';

export interface Organisation {
  organisationId: number;
  organisationName: string;
  organisationEmail: string;
  organisationMobileNumber: number;
  address: Address;
}
