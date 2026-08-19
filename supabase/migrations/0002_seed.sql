-- Seed content extracted/inferred from the original SRM Welkin site so the
-- clone isn't empty on first load. Edit freely from the admin dashboard afterwards.

insert into site_settings (key, value) values
  ('school_name', 'SRM Welkin'),
  ('tagline', 'Higher Secondary School, Sopore'),
  ('logo_url', '/images/welkin-logo.svg'),
  ('phone', '+91 1800 890 1866'),
  ('email', 'info@srmwelkin.com'),
  ('address', 'Near Dak Bunglow, Opposite Sub-District Hospital, Sopore'),
  ('facebook_url', '#'),
  ('linkedin_url', '#'),
  ('twitter_url', '#'),
  ('hero_heading', 'Shaping Bright Futures at SRM Welkin'),
  ('hero_subheading', 'A legacy of academic excellence, strong values and holistic growth in the heart of Sopore.'),
  ('chairman_message_heading', 'Welcome Message From the Chairman, SRM Welkin'),
  ('chairman_message_body', 'At Welkin everyone is encouraged to get involved to his maximum capacity and to do his best. The experiences that every student will have during his lifetime will equip him for life in the present demanding and fast-changing world — a world that plays a key role in shaping their future.'),
  ('chairman_photo_url', '/images/welkin-chairman.svg'),
  ('about_why_welkin', 'Welkin is about 55 km away from the capital city Srinagar, commonly known as North Kashmir, Apple town Sopore situated at the banks of the River Jhelum. The institution primarily was established to spread the power of knowledge, information, and enlightenment to the inhabitants of the town. As of now, the institution covers 58 kanals of land, with seven giant spacious elegant, and splendid structures. The library of this institution is properly digitalized and serves as the treasure of knowledge, quenching the thirst of thousand odd knowledge thirsty aspirants, with thousands of books on varied subjects. Besides this the institution has a multipurpose hall, a separate kindergarten activity room, three vast playgrounds, one basketball court, one play zone, an elegant botanical garden and a cafeteria for staff and students in Ahad block.'),
  ('about_team', 'The institution has a huge staff comprising of teaching and non-teaching faculties. The whole team is administered and guided by the able and competent administration of the institution — Chairman, Vice-Chairperson, Principal, Academic Head, HODs, and supervisors.'),
  ('about_accreditation', 'Maintaining the educational setup and standards, SRM Welkin Higher Secondary School got its accreditation right at its onset by CBSE. It has approvals from the Fire and Emergency Department, Chemicals Department, and R&B for its functioning.'),
  ('admissions_heading', 'Thank you for considering joining our community!'),
  ('admissions_body', 'We are excited to welcome individuals who share our passion and vision. By becoming a member, you will have the opportunity to engage with like-minded individuals, contribute to meaningful discussions, and be a part of initiatives that drive positive change.')
on conflict (key) do nothing;

insert into stat_counters (label, start_value, end_value, suffix, sort_order) values
  ('Well Qualified & Experienced Teachers', 1, 200, '+', 1),
  ('Students Enrolled', 1, 5916, '+', 2),
  ('Best Results in Academics & Co-Curricular Activities', 1, 100, '%', 3),
  ('Kanals of Beautiful Campus', 1, 58, '', 4),
  ('Years of Excellence', 1, 20, '+', 5)
on conflict do nothing;

insert into hero_slides (title, subtitle, image_url, sort_order) values
  ('Shaping Bright Futures', 'Academic excellence and strong values since two decades', '/images/hero-1.svg', 1),
  ('A Campus Built for Growth', '58 kanals of playgrounds, labs, library and gardens', '/images/hero-2.svg', 2),
  ('Admissions Open', 'Join a community that believes in your child''s potential', '/images/hero-3.svg', 3)
on conflict do nothing;

insert into notifications (title, body) values
  ('Admissions Open for New Session', 'SRM Welkin is now accepting admission enquiries for the upcoming academic session. Contact the office or submit an enquiry online.'),
  ('Annual Result Declared', 'Results for the recent academic session have been published. Check the Results page for details.')
on conflict do nothing;
