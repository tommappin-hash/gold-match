/**
 * Client-side sample patient data.
 * Mirrors the seed.sql data. Replace with server-side DB queries once
 * DATABASE_URL is connected.
 */

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  zipCode: string;
  createdAt: string;
}

export const samplePatients: Patient[] = [
  {
    id: "p0000001-0000-0000-0000-000000000001",
    name: "Alice Morgan",
    email: "alice.morgan@email.com",
    phone: "(415) 555-2001",
    city: "San Francisco",
    state: "CA",
    zipCode: "94110",
    createdAt: "2026-01-15T10:30:00Z",
  },
  {
    id: "p0000001-0000-0000-0000-000000000002",
    name: "Bob Henderson",
    email: "bob.henderson@email.com",
    phone: "(512) 555-2002",
    city: "Austin",
    state: "TX",
    zipCode: "78745",
    createdAt: "2026-02-20T14:15:00Z",
  },
  {
    id: "p0000001-0000-0000-0000-000000000003",
    name: "Carol Nguyen",
    email: "carol.nguyen@email.com",
    phone: "(312) 555-2003",
    city: "Chicago",
    state: "IL",
    zipCode: "60614",
    createdAt: "2026-03-10T09:45:00Z",
  },
  {
    id: "p0000001-0000-0000-0000-000000000004",
    name: "David Shapiro",
    email: "david.shapiro@email.com",
    phone: "(212) 555-2004",
    city: "New York",
    state: "NY",
    zipCode: "10025",
    createdAt: "2026-04-05T16:00:00Z",
  },
  {
    id: "p0000001-0000-0000-0000-000000000005",
    name: "Elena Vargas",
    email: "elena.vargas@email.com",
    phone: "(305) 555-2005",
    city: "Miami",
    state: "FL",
    zipCode: "33145",
    createdAt: "2026-05-12T11:20:00Z",
  },
];
