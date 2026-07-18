-- GoldMatch Database Schema
-- Run this migration when DATABASE_URL is connected.
-- Uses IF NOT EXISTS so it's safe to re-run.

-- ============================================================================
-- Extensions
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- Dentists
-- ============================================================================
CREATE TABLE IF NOT EXISTS dentists (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    practice_name   TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE,
    phone           TEXT,
    website         TEXT,
    address_line1   TEXT,
    address_line2   TEXT,
    city            TEXT NOT NULL,
    state           TEXT NOT NULL,
    zip_code        TEXT NOT NULL,
    latitude        DOUBLE PRECISION,
    longitude       DOUBLE PRECISION,
    bio             TEXT,
    -- Services offered: e.g. {crowns, bridges, inlays, onlays}
    services        TEXT[] NOT NULL DEFAULT '{}',
    -- Photos as JSON array of {url, caption} objects
    photos          JSONB DEFAULT '[]'::jsonb,
    listing_status  TEXT NOT NULL DEFAULT 'pending'
                    CHECK (listing_status IN ('pending', 'active', 'inactive')),
    payment_status  TEXT NOT NULL DEFAULT 'unpaid'
                    CHECK (payment_status IN ('unpaid', 'paid')),
    stripe_payment_id TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Location-based search indexes
CREATE INDEX IF NOT EXISTS idx_dentists_city      ON dentists (city);
CREATE INDEX IF NOT EXISTS idx_dentists_state     ON dentists (state);
CREATE INDEX IF NOT EXISTS idx_dentists_zip_code  ON dentists (zip_code);
CREATE INDEX IF NOT EXISTS idx_dentists_city_state ON dentists (city, state);

-- GIN index on services array for "find dentists who offer crowns"
CREATE INDEX IF NOT EXISTS idx_dentists_services  ON dentists USING GIN (services);

-- Filter by listing status
CREATE INDEX IF NOT EXISTS idx_dentists_listing_status ON dentists (listing_status);
CREATE INDEX IF NOT EXISTS idx_dentists_payment_status ON dentists (payment_status);

-- Geospatial index for proximity search (when lat/lng populated)
CREATE INDEX IF NOT EXISTS idx_dentists_location   ON dentists (latitude, longitude);

-- ============================================================================
-- Patients
-- ============================================================================
CREATE TABLE IF NOT EXISTS patients (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name        TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE,
    phone       TEXT,
    city        TEXT,
    state       TEXT,
    zip_code    TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_patients_email ON patients (email);

-- ============================================================================
-- Connections
-- ============================================================================
CREATE TABLE IF NOT EXISTS connections (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id  UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    dentist_id  UUID NOT NULL REFERENCES dentists(id) ON DELETE CASCADE,
    status      TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'accepted', 'declined')),
    message     TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_connections_patient_id ON connections (patient_id);
CREATE INDEX IF NOT EXISTS idx_connections_dentist_id ON connections (dentist_id);
CREATE INDEX IF NOT EXISTS idx_connections_status    ON connections (status);

-- Prevent duplicate pending connections
CREATE UNIQUE INDEX IF NOT EXISTS idx_connections_unique_active
    ON connections (patient_id, dentist_id)
    WHERE status = 'pending';

-- ============================================================================
-- Updated-at trigger function
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to all tables with updated_at
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'update_dentists_updated_at'
    ) THEN
        CREATE TRIGGER update_dentists_updated_at
            BEFORE UPDATE ON dentists
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'update_patients_updated_at'
    ) THEN
        CREATE TRIGGER update_patients_updated_at
            BEFORE UPDATE ON patients
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'update_connections_updated_at'
    ) THEN
        CREATE TRIGGER update_connections_updated_at
            BEFORE UPDATE ON connections
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;
