/**
 * Client-side mock data for dentist registrations.
 * Used to simulate storing registration form submissions before the DB
 * is connected. Replace with createServerFn + DB inserts when
 * DATABASE_URL is available.
 */

import type { Service } from "./dentists";

export interface DentistRegistration {
  id: string;
  practiceName: string;
  email: string;
  phone: string;
  website: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  bio: string;
  services: Service[];
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
}

export const dentistRegistrations: DentistRegistration[] = [];
