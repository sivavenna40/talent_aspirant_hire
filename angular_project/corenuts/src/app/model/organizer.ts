import { Address } from './address';
import { Organisation } from './organisation';

export interface Organizer {
  organizerId: number;
  organizerName: string;
  organizerGender: string;
  organizerAge: string;
  organizerEmail: string;
  organizerMobileNumber: number;
  address: Address;
  organisation: Organisation;
}
