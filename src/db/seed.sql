-- GoldMatch Seed Data
-- Sample dentists and patients for development/testing.
-- Safe to re-run: uses ON CONFLICT DO NOTHING.

-- ============================================================================
-- Sample Dentists (across different US regions)
-- ============================================================================
INSERT INTO dentists (id, practice_name, email, phone, website, address_line1, city, state, zip_code, latitude, longitude, bio, services, photos, listing_status, payment_status) VALUES
(
    'd0000001-0000-0000-0000-000000000001',
    'Golden State Dental Studio',
    'dr.chen@goldenstatedental.com',
    '(415) 555-0101',
    'https://goldenstatedental.com',
    '450 Sutter St, Suite 800',
    'San Francisco',
    'CA',
    '94108',
    37.7891,
    -122.4072,
    'Dr. Chen has over 20 years of experience specializing in gold restorations. We believe gold is the superior material for posterior crowns and bridges — unmatched longevity, biocompatibility, and gentle on opposing teeth.',
    ARRAY['crowns', 'bridges', 'inlays', 'onlays'],
    '[{"url":"/photos/gsd-office.jpg","caption":"Our San Francisco office"},{"url":"/photos/gsd-gold-crown.jpg","caption":"Gold crown case study"}]'::jsonb,
    'active',
    'paid'
),
(
    'd0000001-0000-0000-0000-000000000002',
    'Austin Gold Teeth',
    'dr.rodriguez@austingoldteeth.com',
    '(512) 555-0202',
    'https://austingoldteeth.com',
    '3800 N Lamar Blvd, Suite 200',
    'Austin',
    'TX',
    '78756',
    30.3119,
    -97.7424,
    'Specializing exclusively in gold dental work since 2010. From single-surface inlays to full-mouth gold reconstructions, we do it all with precision and artistry.',
    ARRAY['crowns', 'bridges', 'inlays', 'onlays'],
    '[{"url":"/photos/agt-clinic.jpg","caption":"Our Austin clinic"}]'::jsonb,
    'active',
    'paid'
),
(
    'd0000001-0000-0000-0000-000000000003',
    'Midwest Gold Dentistry',
    'dr.patel@midwestgold.com',
    '(312) 555-0303',
    'https://midwestgolddentistry.com',
    '233 S Wacker Dr, Suite 450',
    'Chicago',
    'IL',
    '60606',
    41.8790,
    -87.6363,
    'Combining old-school gold craftsmanship with modern digital dentistry. Dr. Patel is a Fellow of the Academy of Gold Foil Operators and teaches gold techniques at regional conferences.',
    ARRAY['crowns', 'inlays', 'onlays'],
    '[{"url":"/photos/mgd-office.jpg","caption":"Downtown Chicago practice"}]'::jsonb,
    'active',
    'paid'
),
(
    'd0000001-0000-0000-0000-000000000004',
    'Park Avenue Gold Restorations',
    'dr.weiss@parkavegold.com',
    '(212) 555-0404',
    'https://parkavegold.com',
    '515 Madison Ave, 12th Floor',
    'New York',
    'NY',
    '10022',
    40.7601,
    -73.9735,
    'Fifth-generation gold restoration specialist serving Manhattan since 1948. We combine traditional gold techniques with the latest CEREC digital workflows for same-day gold restorations.',
    ARRAY['crowns', 'bridges', 'inlays', 'onlays'],
    '[{"url":"/photos/pagr-office.jpg","caption":"Park Avenue location"}]'::jsonb,
    'active',
    'paid'
),
(
    'd0000001-0000-0000-0000-000000000005',
    'Mile High Gold Dental',
    'dr.nakamura@milehighgold.com',
    '(303) 555-0505',
    'https://milehighgolddental.com',
    '1601 Wewatta St, Suite 300',
    'Denver',
    'CO',
    '80202',
    39.7508,
    -104.9967,
    'Dr. Nakamura is passionate about gold — its biocompatibility, durability, and beauty. We serve patients from across the Mountain West who want the best in restorative dentistry.',
    ARRAY['crowns', 'bridges', 'inlays', 'onlays'],
    '[{"url":"/photos/mhgd-clinic.jpg","caption":"Denver Union Station area"}]'::jsonb,
    'active',
    'paid'
),
(
    'd0000001-0000-0000-0000-000000000006',
    'Sunshine State Gold Teeth',
    'dr.williams@sunshinestategold.com',
    '(305) 555-0606',
    'https://sunshinestategoldteeth.com',
    '1200 Brickell Ave, Suite 500',
    'Miami',
    'FL',
    '33131',
    25.7612,
    -80.1916,
    'Bringing gold back to South Florida! Dr. Williams trained at the Kois Center and specializes in complex gold rehabilitation cases. Spanish and English spoken.',
    ARRAY['crowns', 'bridges', 'inlays', 'onlays'],
    '[{"url":"/photos/ssgt-office.jpg","caption":"Brickell Avenue office"}]'::jsonb,
    'active',
    'paid'
),
(
    'd0000001-0000-0000-0000-000000000007',
    'Pacific Northwest Gold Dentistry',
    'dr.anderson@pnwgold.com',
    '(206) 555-0707',
    'https://pnwgolddentistry.com',
    '1100 Olive Way, Suite 250',
    'Seattle',
    'WA',
    '98101',
    47.6133,
    -122.3302,
    'Eco-conscious gold dentistry in the heart of Seattle. We use recycled gold alloys and digital impressions to minimize waste. Gold restorations that last decades — better for your health and the planet.',
    ARRAY['crowns', 'inlays', 'onlays'],
    '[{"url":"/photos/pnwgd-office.jpg","caption":"Seattle office"}]'::jsonb,
    'active',
    'paid'
),
(
    'd0000001-0000-0000-0000-000000000008',
    'Nashville Gold Crowns',
    'dr.johnson@nashvillegold.com',
    '(615) 555-0808',
    'https://nashvillegoldcrowns.com',
    '3322 West End Ave, Suite 100',
    'Nashville',
    'TN',
    '37203',
    36.1487,
    -86.8060,
    'Gold crowns are our passion. Dr. Johnson has placed over 5,000 gold restorations and lectures nationally on gold preparation techniques. Accepting patients from across the Southeast.',
    ARRAY['crowns', 'bridges', 'inlays', 'onlays'],
    '[{"url":"/photos/ngc-office.jpg","caption":"West End Ave practice"}]'::jsonb,
    'active',
    'paid'
),
(
    'd0000001-0000-0000-0000-000000000009',
    'DC Gold Restorations',
    'dr.kim@dcgold.com',
    '(202) 555-0909',
    'https://dcgoldrestorations.com',
    '1800 K St NW, Suite 600',
    'Washington',
    'DC',
    '20006',
    38.9026,
    -77.0421,
    'Serving the DC metro area with premium gold dental restorations. Dr. Kim is a prosthodontist who completed advanced training in gold techniques at the Pankey Institute.',
    ARRAY['crowns', 'bridges', 'inlays', 'onlays'],
    '[{"url":"/photos/dcgr-office.jpg","caption":"K Street office"}]'::jsonb,
    'active',
    'paid'
),
(
    'd0000001-0000-0000-0000-000000000010',
    'LA Gold Dental Lab & Clinic',
    'dr.martinez@lagolddental.com',
    '(213) 555-1010',
    'https://lagolddental.com',
    '6200 Wilshire Blvd, Suite 100',
    'Los Angeles',
    'CA',
    '90048',
    34.0635,
    -118.3648,
    'In-house gold lab means faster turnaround and perfect fits. Dr. Martinez specializes in full-mouth gold rehabilitation for patients who want the ultimate in durability and aesthetics.',
    ARRAY['crowns', 'bridges', 'inlays', 'onlays'],
    '[{"url":"/photos/lagd-office.jpg","caption":"Wilshire Blvd clinic & lab"}]'::jsonb,
    'active',
    'paid'
),
(
    'd0000001-0000-0000-0000-000000000011',
    'Boston Gold Dentistry',
    'dr.oconnor@bostongold.com',
    '(617) 555-1111',
    'https://bostongolddentistry.com',
    '50 Staniford St, Suite 400',
    'Boston',
    'MA',
    '02114',
    42.3626,
    -71.0689,
    'Gold is the gold standard. Dr. O''Connor brings 30 years of gold restoration experience, serving patients from New England and beyond who seek the best in durable, biocompatible restorations.',
    ARRAY['crowns', 'bridges', 'inlays'],
    '[{"url":"/photos/bgd-office.jpg","caption":"Boston practice near MGH"}]'::jsonb,
    'active',
    'paid'
),
(
    'd0000001-0000-0000-0000-000000000012',
    'Atlanta Gold Smiles',
    'dr.thompson@atlgold.com',
    '(404) 555-1212',
    'https://atlgoldsmiles.com',
    '3340 Peachtree Rd NE, Suite 700',
    'Atlanta',
    'GA',
    '30326',
    33.8470,
    -84.3686,
    'Gold restorations that look as good as they perform. Dr. Thompson combines precision gold work with aesthetic considerations for results patients love showing off.',
    ARRAY['crowns', 'bridges', 'inlays', 'onlays'],
    '[{"url":"/photos/ags-office.jpg","caption":"Buckhead office"}]'::jsonb,
    'active',
    'paid'
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Sample Patients
-- ============================================================================
INSERT INTO patients (id, name, email, phone, city, state, zip_code) VALUES
(
    'p0000001-0000-0000-0000-000000000001',
    'Alice Morgan',
    'alice.morgan@email.com',
    '(415) 555-2001',
    'San Francisco',
    'CA',
    '94110'
),
(
    'p0000001-0000-0000-0000-000000000002',
    'Bob Henderson',
    'bob.henderson@email.com',
    '(512) 555-2002',
    'Austin',
    'TX',
    '78745'
),
(
    'p0000001-0000-0000-0000-000000000003',
    'Carol Nguyen',
    'carol.nguyen@email.com',
    '(312) 555-2003',
    'Chicago',
    'IL',
    '60614'
),
(
    'p0000001-0000-0000-0000-000000000004',
    'David Shapiro',
    'david.shapiro@email.com',
    '(212) 555-2004',
    'New York',
    'NY',
    '10025'
),
(
    'p0000001-0000-0000-0000-000000000005',
    'Elena Vargas',
    'elena.vargas@email.com',
    '(305) 555-2005',
    'Miami',
    'FL',
    '33145'
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Sample Connections
-- ============================================================================
INSERT INTO connections (id, patient_id, dentist_id, status, message) VALUES
(
    'c0000001-0000-0000-0000-000000000001',
    'p0000001-0000-0000-0000-000000000001',
    'd0000001-0000-0000-0000-000000000001',
    'pending',
    'Hi! I need a gold crown on tooth #30. My previous dentist retired and I heard great things about Dr. Chen. Can you let me know if you accept my insurance?'
),
(
    'c0000001-0000-0000-0000-000000000002',
    'p0000001-0000-0000-0000-000000000002',
    'd0000001-0000-0000-0000-000000000002',
    'accepted',
    'Looking for a gold bridge replacement. My current bridge is 25 years old and needs updating.'
),
(
    'c0000001-0000-0000-0000-000000000003',
    'p0000001-0000-0000-0000-000000000003',
    'd0000001-0000-0000-0000-000000000003',
    'accepted',
    'Interested in gold inlays instead of composite fillings for teeth #3 and #14. Would love a consultation.'
),
(
    'c0000001-0000-0000-0000-000000000004',
    'p0000001-0000-0000-0000-000000000004',
    'd0000001-0000-0000-0000-000000000004',
    'pending',
    'I have several old silver fillings I want replaced with gold onlays. Looking for a practice that specializes in gold work.'
),
(
    'c0000001-0000-0000-0000-000000000005',
    'p0000001-0000-0000-0000-000000000005',
    'd0000001-0000-0000-0000-000000000006',
    'declined',
    'I need full gold crown work on my back molars. Do you offer sedation options?'
)
ON CONFLICT (id) DO NOTHING;
