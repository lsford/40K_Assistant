-- Create table for unit types
CREATE TABLE unit_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `move` CHAR(10),
    weapon_skill CHAR(10),
    ballistic_skill CHAR(10),
    attacks VARCHAR (10),
    wounds INT,
    leadership INT,
    `save` CHAR(10)
);

-- Create table for weapons
CREATE TABLE weapons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `type` VARCHAR(50),
    `range` CHAR(10),
    attacks VARCHAR(10),
    sap CHAR(10), -- Strength Against Personnel
    sat CHAR(10), -- Strength Against Tanks
    abilities VARCHAR(255)
);

-- Create table for unit_weapon_relations (many-to-many relationship)
CREATE TABLE unit_weapon_relations (
    unit_type_id INT,
    weapon_id INT,
    PRIMARY KEY (unit_type_id, weapon_id),
    FOREIGN KEY (unit_type_id) REFERENCES unit_types(id),
    FOREIGN KEY (weapon_id) REFERENCES weapons(id)
);

-- Create table for phases
CREATE TABLE phases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create table for actions
CREATE TABLE actions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Create table for unit actions (tracking units' actions in specific phases)
CREATE TABLE unit_actions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    unit_type_id INT,
    action_id INT,
    phase_id INT,
    points INT,
    FOREIGN KEY (unit_type_id) REFERENCES unit_types(id),
    FOREIGN KEY (action_id) REFERENCES actions(id),
    FOREIGN KEY (phase_id) REFERENCES phases(id)
);
-- Insert data into unit_types
INSERT INTO unit_types (name, move, weapon_skill, ballistic_skill, attacks, wounds, leadership, save)
VALUES
('Knight Paladin', '12"', '3+', '3+', 4, 5, 7, '5+'),
('Knight Preceptor', '12"', '3+', '3+', 4, 5, 7, '5+'),
('Knight Errant', '12"', '3+', '3+', 4, 5, 7, '5+'),
('Knight Gallant', '12"', '2+', '3+', 4, 5, 7, '5+'),
('Knight Warden', '12"', '3+', '3+', 4, 5, 7, '5+'),
('Knight Crusader', '12"', '3+', '3+', 4, 5, 7, '5+'),
('Canis Rex', '12"', '2+', '2+', 4, 5, 7, '5+'),
('Knight Castellan', '10"', '4+', '3+', 4, 6, 7, '5+'),
('Knight Valiant', '10"', '4+', '3+', 4, 6, 7, '5+'),
('Armiger Helverin', '14"', '3+', '3+', 2, 2, 6, '5+'),
('Armiger Warglaive', '14"', '3+', '3+', 2, 2, 6, '5+');

-- Insert data into weapons
INSERT INTO weapons (name, type, `range`, attacks, sap, sat, abilities)
VALUES
('Heavy Stubber', 'Heavy', '36"', 1, '8+', '10+', NULL),
('Ironstorm Missile Pod', 'Heavy', '72"', 2, '6+', '9+', 'Barrage'),
('Meltagun', 'Heavy', '12"', 1, '11+', '7+', NULL),
('Rapid-fire Battle Cannon', 'Heavy', '72"', 4, '6+', '6+', NULL),
('Stormspear Rocket Pod', 'Heavy', '48"', 1, '6+', '5+', NULL),
('Twin Icarus Autocannon', 'Heavy', '48"', 2, '8+', '8+', 'Anti-air'),
('Reaper Chainsword', 'Melee', 'Melee', 'User', '5+', '6+', 'Destroyer'),
('Thunderstrike Gauntlet', 'Melee', 'Melee', 'User', '6+', '5+', 'Destroyer'),
('Avenger Gatling Cannon', 'Heavy', '36"', 4, '4+', '8+', NULL),
('Heavy Flamer', 'Heavy', '8"', 1, '6+', '9+', 'Inferno'),
('Thermal Cannon', 'Heavy', '36"', 2, '6+', '4+', 'Destroyer'),
('Titanic Feet', 'Melee', 'Melee', 'User', '7+', '7+', NULL),
('Las-impulsor', 'Heavy', '36"', 4, '5+', '5+', NULL),
('Freedom’s Hand', 'Melee', 'Melee', 'User', '5+', '4+', 'Destroyer'),
('Plasma Decimator', 'Heavy', '48"', 2, '6+', '6+', 'Supercharge'),
('Shieldbreaker Missile', 'Heavy', '48"', 1, '9+', '5+', 'One Use Only'),
('Twin Siegebreaker Cannon', 'Heavy', '48"', 2, '7+', '7+', NULL),
('Volcano Lance', 'Heavy', '80"', 2, '10+', '3+', 'Destroyer'),
('Conflagration Cannon', 'Heavy', '18"', 6, '4+', '8+', 'Inferno'),
('Thundercoil Harpoon', 'Heavy', '12"', 1, '8+', '2+', 'Apocalyptic Destroyer'),
('Armiger Autocannon', 'Heavy', '60"', 2, '7+', '7+', NULL),
('Thermal Spear', 'Heavy', '30"', 1, '10+', '4+', NULL),
('Reaper Chain-cleaver', 'Melee', 'Melee', 'User', '7+', '7+', NULL);

-- Insert data into unit_weapon_relations
INSERT INTO unit_weapon_relations (unit_type_id, weapon_id)
VALUES
(1, 1), (1, 4), (1, 7), (1, 8), -- Knight Paladin
(2, 1), (2, 13), (2, 7), (2, 8), -- Knight Preceptor
(3, 1), (3, 11), (3, 7), (3, 8), -- Knight Errant
(4, 1), (4, 7), (4, 8), -- Knight Gallant
(5, 9), (5, 10), (5, 1), (5, 7), (5, 8), -- Knight Warden
(6, 9), (6, 10), (6, 11), (6, 12), (6, 4), -- Knight Crusader
(7, 13), (7, 14), (7, 1), -- Canis Rex
(8, 15), (8, 16), (8, 17), (8, 18), (8, 12), -- Knight Castellan
(9, 19), (9, 16), (9, 21), (9, 20), (9, 12), -- Knight Valiant
(10, 22), (10, 1), -- Armiger Helverin
(11, 23), (11, 24), (11, 1), (11, 8); -- Armiger Warglaive