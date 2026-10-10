-- Insert clients and their packages
-- Run this in Supabase SQL editor after the schema is set up

-- 1. Anra solutions
INSERT INTO clients (company_name, website, instagram_url, facebook_url, brand_color) VALUES 
('Anra solutions', 'https://anrasolutions.com/', NULL, NULL, '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Anra solutions';

-- 2. SVC Properties
INSERT INTO clients (company_name, website, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, email, access_with, brand_color) VALUES 
('SVC Properties', 'https://svcbuildtech.com/', 'https://www.instagram.com/svcbuildtech', 'https://www.facebook.com/profile.php?id=61563222594554', 's.v__construction', 'Ksaini@38a', 'Sir', 'Sir', 'Sainivastuconstruction@gmail.com', 'Ksaini@38a', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'SVC Properties';

-- 3. Shri Balaji Murti Bhandar
INSERT INTO clients (company_name, website, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, email, access_with, brand_color) VALUES 
('Shri Balaji Murti Bhandar', 'https://shribalajimurtibhandar.biz/', 'https://www.instagram.com/shri_balaji_murti_bhandar', 'https://www.facebook.com/profile.php?id=61563757571738', 'shribalajimurtibhandar.com', 'Kailash@#$123', 'Kailash%123', 'passskey', 'kailashchand1661@gmail.com', 'kailashchand1661@gmail.com', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Shri Balaji Murti Bhandar';

-- 4. New Cherry
INSERT INTO clients (company_name, website, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, email, access_with, brand_color) VALUES 
('New Cherry', 'https://newcherryblossoms.in/', 'https://www.instagram.com/new_cherry_blossoms', 'https://www.facebook.com/profile.php?id=61570808705838', 'new_cherry_blossoms', '1U2m3a4n5g@', 'newcherryblossoms', '1U2m3a4n5g@', 'ashoknehra9953@gmail.com', 'newcherry8527@', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'New Cherry';

-- 5. Scrap Becho
INSERT INTO clients (company_name, website, instagram_url, facebook_url, brand_color) VALUES 
('Scrap Becho', 'scrapbecho.com', 'https://www.instagram.com/scrapbechoofficial', 'https://www.facebook.com/profile.php?id=61588102080986', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Scrap Becho';

-- 6. VPV EVENTS
INSERT INTO clients (company_name, website, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, email, access_with, brand_color) VALUES 
('VPV EVENTS', 'https://vpvevents.com/', 'https://www.instagram.com/vpv.events', 'https://www.facebook.com/profile.php?id=61590389310232', 'vpv.events', 'Hello@1785', 'Atul Sir', 'Atul Sir', 'vpvevents12@gmail.com', 'eventsmedia27', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'VPV EVENTS';

-- 7. Numrology
INSERT INTO clients (company_name, website, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, email, access_with, brand_color) VALUES 
('Numrology', 'yesvnno.com', 'https://www.instagram.com/yesvnno', 'https://www.facebook.com/profile.php?id=61590676412139', 'saandeepkumaarmalik', 'Saandeep@123', 'Facebook Otp', 'Facebook Otp', 'saandeepkumaarmalik@gmail.com', 'Saandeep@123', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Numrology';

-- 8. Shree Neel Kanth Dr Preeti
INSERT INTO clients (company_name, website, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, email, access_with, brand_color) VALUES 
('Shree Neel Kanth Dr Preeti', 'https://shrineelkanth.com/', 'https://www.instagram.com/shrineelkanth_homeopathic', 'https://www.facebook.com/myclinicneelkanth', 'shrineelkanth_homeopathic', 'Hello@1785', 'drpreetigosawami@gmail.com', 'mybabyayansh123456', 'neelkanthshree027@gmail.com', 'Hello@1785', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Shree Neel Kanth Dr Preeti';

-- 9. Nav Nirmaan Placement
INSERT INTO clients (company_name, website, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, email, access_with, brand_color) VALUES 
('Nav Nirmaan Placement', 'https://www.navnirmaan.co.in/', 'https://www.instagram.com/navnirmaanhrconsultancy', 'https://www.facebook.com/profile.php?id=100064034230886', 'navnirmaanhrconsultancy', 'Navnirmaan@65203', 'Navnirmaan4ever@gmail.com', 'Navnirmaan@65203', 'gurdarshansinghkapoor@gmail.com', 'Navnirmaan@65203', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Nav Nirmaan Placement';

-- 10. YUG FIT
INSERT INTO clients (company_name, website, brand_color) VALUES 
('YUG FIT', 'https://yugfit.com/', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'YUG FIT';

-- 11. RV INDUSTRIES
INSERT INTO clients (company_name, website, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, email, access_with, brand_color) VALUES 
('RV INDUSTRIES', 'https://www.cabletestmachines.com/', 'https://www.instagram.com/official.rvindustries', 'https://www.facebook.com/profile.php?id=61589036529105', 'official.rvindustries', 'Hello@1785', 'Sir', 'Sir', 'rvindustries0001@gmail.com', 'sagar@_0001', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'RV INDUSTRIES';

-- 12. Widgets Cafe
INSERT INTO clients (company_name, website, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, email, access_with, brand_color) VALUES 
('Widgets Cafe', 'https://widgetscafe.com/', 'https://www.instagram.com/widgets.cafe', 'https://www.facebook.com/profile.php?id=61589528124995', 'Widgets.Cafe', 'Hello@1785', 'sunny', 'sunny', 'Widgetscafe94@gmail.com', 'Chhabra@1994', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Widgets Cafe';

-- 13. Dental Health Care
INSERT INTO clients (company_name, website, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, email, access_with, brand_color) VALUES 
('Dental Health Care', 'https://www.dentalhealthcares.com/', 'https://www.instagram.com/dental_health.care', 'https://www.facebook.com/profile.php?id=61590611376964', 'dental_health.care', 'Hello@1785', 'Sunny', 'Sunny', 'drankitjindal8@gmail.com', '262401usnUK#', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Dental Health Care';

-- 14. Bloom Basket
INSERT INTO clients (company_name, website, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, email, access_with, brand_color) VALUES 
('Bloom Basket', 'https://bloombasket.co.in/', 'https://www.instagram.com/official.bloombasket', 'https://www.facebook.com/profile.php?id=61590847892048', 'official.bloombasket', 'Hello@1785', 'Sunny', 'Sunny', 'indianmeadows18@gmail.com', 'indian@1982', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Bloom Basket';

-- 15. Areeba Fashion
INSERT INTO clients (company_name, website, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, access_with, brand_color) VALUES 
('Areeba Fashion', 'areebafashion.com', 'https://www.instagram.com/official.areebafashion', 'https://www.facebook.com/profile.php?id=61590987383423', 'official.areebafashion', 'Hello@1785', 'Sunny', 'Sunny', 'Sunny', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Areeba Fashion';

-- 16. Tribhuvan Buildtech
INSERT INTO clients (company_name, website, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, email, access_with, brand_color) VALUES 
('Tribhuvan Buildtech', 'https://tribhuvanbuildtech.com/', 'https://www.instagram.com/tribhuvanbuildtech', 'https://www.facebook.com/profile.php?id=61584457448729', 'tribhuvanbuildtech', 'sir', 'lovepreet', NULL, 'tribhuvanbuildtech@gmail.com', 'Hello@1785', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Tribhuvan Buildtech';

-- 17. Dr Suraj
INSERT INTO clients (company_name, website, brand_color) VALUES 
('Dr Suraj', 'https://shivalays.com/', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Dr Suraj';

-- 18. Durga Cab
INSERT INTO clients (company_name, website, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, email, access_with, brand_color) VALUES 
('Durga Cab', 'https://durgacabservice.com/', 'https://www.instagram.com/durgacabservice', 'https://www.facebook.com/profile.php?id=61586959576564', 'a_durgacabservice', '886486ve', 'cabservicemathura@gmail.com', '886486ve', 'cabservicemathura@gmail.com', '886486ve', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Durga Cab';

-- 19. Travel Destiny
INSERT INTO clients (company_name, website, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, email, access_with, brand_color) VALUES 
('Travel Destiny', 'https://traveldestiny.in/', 'https://www.instagram.com/traveldestiny_delhi', 'https://www.facebook.com/traveldestiny.in', NULL, 'Harshita@16june', 'chandanmalhotra3986@gmail.com', 'Harshita@16june', 'chandanmalhotra3986@gmail.com', 'Harshita@16june', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Travel Destiny';

-- 20. TheIndiaexpedition
INSERT INTO clients (company_name, website, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, email, access_with, brand_color) VALUES 
('TheIndiaexpedition', 'https://theindiaexpedition.com/', 'https://www.instagram.com/official_indiaexpedition', 'https://www.facebook.com/profile.php?id=61590124325810', 'official_indiaexpedition', 'Hello@1785', 'arjun.abnamro@gmail.com', 'Apple@1919', 'arjun.abnamro@gmail.com', 'Apple@1919', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'TheIndiaexpedition';

-- 21. Navyug Properties
INSERT INTO clients (company_name, website, instagram_url, instagram_username, instagram_password, phone, access_with, brand_color) VALUES 
('Navyug Properties', 'https://navyugproperties.in/', 'https://www.instagram.com/navyugproperties_kundli', 'navyugproperties_kundli', 'jatin@1210', '8813030131', 'Jatin@866', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Navyug Properties';

-- 22. Rana Real Estate
INSERT INTO clients (company_name, website, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, email, access_with, brand_color) VALUES 
('Rana Real Estate', 'https://ranarealestate.net/', 'https://www.instagram.com/official.ranarealestate', 'https://www.facebook.com/profile.php?id=61591732865741', 'official.ranarealestate', 'Hello@1785', 'Sunny', 'Sunny', 'ranarealestate888@gmail.com', 'Rana.rana', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Rana Real Estate';

-- 23. Pandit Mahendra Sharma
INSERT INTO clients (company_name, website, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, email, access_with, brand_color) VALUES 
('Pandit Mahendra Sharma', 'https://panditmahendersharma.com/', 'https://www.instagram.com/panditmahendrasharma061', 'https://www.facebook.com/profile.php?id=61591804980837', 'pandit.mahendersharma', 'Hello@1785', 'Atul Sir', 'Atul Sir', 'panditmahendersharma061@gmail.com', 'Hello@1785', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Pandit Mahendra Sharma';

-- 24. Rainbow Entertainments
INSERT INTO clients (company_name, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, email, access_with, brand_color) VALUES 
('Rainbow Entertainments', 'https://www.instagram.com/official.rainbowentertainments', 'https://www.facebook.com/profile.php?id=61592007083933', 'official.rainbowentertainments', 'Hello@1785', 'Sunny', 'Sunny', 'rainbowentertainments070@gmail.com', 'Hello@1785', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Rainbow Entertainments';

-- 25. EZO Charge
INSERT INTO clients (company_name, website, brand_color) VALUES 
('EZO Charge', 'https://www.ezocharge.com/', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'EZO Charge';

-- 26. Shri Balaji Real Estate
INSERT INTO clients (company_name, website, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, email, access_with, brand_color) VALUES 
('Shri Balaji Real Estate', 'https://shreebalajirealestate.com/', 'https://www.instagram.com/shribalaji_real.estate', 'https://www.facebook.com/profile.php?id=61591568416704', 'shribalaji_real.estate', 'Hello@1785', 'Shubham', 'Shubham', 'sanjay.mal2235@gmail.com', 'Office@987', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Shri Balaji Real Estate';

-- 27. Aaru Home Solutions
INSERT INTO clients (company_name, website, instagram_url, facebook_url, brand_color) VALUES 
('Aaru Home Solutions', 'https://www.aaruhomesolutions.com/', 'https://www.instagram.com/aaruhomesolutions', 'https://www.facebook.com/profile.php?id=61591646904245', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Aaru Home Solutions';

-- 28. Spark Zing
INSERT INTO clients (company_name, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, access_with, brand_color) VALUES 
('Spark Zing', 'https://www.instagram.com/spark.zing', 'https://www.facebook.com/profile.php?id=61591966079459', 'spark.zing', 'Hello@1785', 'shubham/manthan', 'shubham/manthan', 'shubham/manthan', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Spark Zing';

-- 29. Gaddi Experts
INSERT INTO clients (company_name, website, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, email, access_with, brand_color) VALUES 
('Gaddi Experts', 'https://gaadiexperts.com/', 'https://www.instagram.com/gaadi_experts', 'https://www.facebook.com/profile.php?id=61591965570316', 'gaadi_experts', 'Deva@2017', 'Shubham', 'Shubham', 'gaadiexperts91@gmail.com', 'gxp@569@gh', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Gaddi Experts';

-- 30. Cadmap Signage
INSERT INTO clients (company_name, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, email, access_with, brand_color) VALUES 
('Cadmap Signage', 'https://www.instagram.com/cadmap.signage', 'https://www.facebook.com/profile.php?id=61592199268092', 'cadmap.signage', 'Hello@1785', 'vansh', 'vansh', 'delhisignagewale@gmail.com', 'Omhari@#9891', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Cadmap Signage';

-- 31. Shukla Marble
INSERT INTO clients (company_name, instagram_url, facebook_url, instagram_username, instagram_password, facebook_username, facebook_password, email, access_with, brand_color) VALUES 
('Shukla Marble', 'https://www.instagram.com/shuklamarble.art', 'https://www.facebook.com/profile.php?id=61592153573580', 'shuklamarble.art', 'Hello@1785', 'Vansh', 'Vansh', 'Shuklamarble280@gmail.com', 'Shukla@280', '#2563EB');

INSERT INTO packages (client_id, package_name, total_monthly_posts, start_date, end_date) 
SELECT id, 'Standard', 12, '2026-07-20', '2026-08-19' FROM clients WHERE company_name = 'Shukla Marble';
