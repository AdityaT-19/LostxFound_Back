-- Active: 1700499878468@@127.0.0.1@3306@lostxfound

CREATE DATABASE lostxfound;

USE lostxfound;

CREATE TABLE
    university (
        univid INT,
        uname VARCHAR(255) NOT NULL,
        PRIMARY KEY (univid)
    );

CREATE TABLE
    admin (
        aid INT,
        aname VARCHAR(255) NOT NULL,
        PRIMARY KEY (aid)
    );

CREATE TABLE
    administration (
        aid INT,
        univid INT,
        FOREIGN KEY (aid) REFERENCES admin(aid) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (univid) REFERENCES university(univid) ON DELETE CASCADE ON UPDATE CASCADE,
        PRIMARY KEY (aid, univid)
    );

CREATE TABLE
    users (
        uid VARCHAR(20),
        firebaseid VARCHAR(255) NOT NULL,
        sname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phno BIGINT NOT NULL,
        address VARCHAR(255),
        univid INT,
        lostcount INT DEFAULT 0,
        foundcount INT DEFAULT 0,
        FOREIGN KEY (univid) REFERENCES university(univid) ON DELETE CASCADE ON UPDATE CASCADE,
        PRIMARY KEY (uid)
    );

CREATE TABLE
    location (
        locid INT PRIMARY KEY AUTO_INCREMENT,
        bname VARCHAR(255) NOT NULL,
        floor INT NOT NULL,
        aid INT,
        univid INT,
        FOREIGN KEY (aid) REFERENCES admin(aid) ON DELETE
        SET
            NULL ON UPDATE CASCADE,
            FOREIGN KEY (univid) REFERENCES university(univid) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    camno(
        locid INT,
        camid INT NOT NULL,
        Foreign Key (locid) REFERENCES location(locid) ON DELETE CASCADE
    );

CREATE TABLE
    lost_item (
        lid INT PRIMARY KEY AUTO_INCREMENT,
        lname VARCHAR(255) NOT NULL,
        ldescription TEXT NOT NULL,
        liimage VARCHAR(255),
        ldate DATE,
        uid VARCHAR(20),
        FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    found_item (
        fid INT PRIMARY KEY AUTO_INCREMENT,
        fname VARCHAR(255) NOT NULL,
        fdescription TEXT NOT NULL,
        fimage VARCHAR(255) NOT NULL,
        fdate DATE NOT NULL,
        locid INT NOT NULL,
        locdesc TEXT NOT NULL,
        uid VARCHAR(20),
        FOREIGN KEY (locid) REFERENCES location(locid) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE ON UPDATE CASCADE
    );

CREATE TABLE
    probably_lost_in (
        lid INT,
        locid INT,
        locdesc TEXT,
        FOREIGN KEY (lid) REFERENCES lost_item(lid) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (locid) REFERENCES location(locid) ON DELETE CASCADE ON UPDATE CASCADE,
        PRIMARY KEY (lid, locid)
    );

CREATE TABLE
    resolved (
        lid INT,
        fid INT,
        rdate DATE NOT NULL,
        FOREIGN KEY (lid) REFERENCES lost_item(lid) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (fid) REFERENCES found_item(fid) ON DELETE CASCADE ON UPDATE CASCADE,
        PRIMARY KEY (lid, fid)
    );

INSERT INTO university VALUES (1, 'SJCE, JSSSTU');

INSERT INTO university VALUES (2, 'VVCE');

INSERT INTO admin VALUES (1, 'Dr. B G Sudarshan');

INSERT INTO admin VALUES (2, 'Dr. B Sadashive Gowda');

INSERT INTO administration VALUES (1, 1);

INSERT INTO administration VALUES (2, 2);

INSERT INTO
    users (
        uid,
        firebaseid,
        sname,
        email,
        phno,
        address,
        univid
    )
VALUES (
        '01JCE21CS001',
        'firebaseid1',
        'Sachin',
        'sc@jss.in',
        1234567890,
        'Mysore',
        1
    );

INSERT INTO
    users (
        uid,
        firebaseid,
        sname,
        email,
        phno,
        address,
        univid
    )
VALUES (
        '01JCE21CS002',
        'firebaseid2',
        'Rahul',
        'ra@jss.in',
        1234567890,
        'Mysore',
        1
    );

INSERT INTO
    users (
        uid,
        firebaseid,
        sname,
        email,
        phno,
        address,
        univid
    )
VALUES (
        '01JCE21CS003',
        'firebaseid3',
        'Virat',
        'vi@jss.in',
        1234567890,
        'Mysore',
        1
    );

INSERT INTO
    users (
        uid,
        firebaseid,
        sname,
        email,
        phno,
        address,
        univid
    )
VALUES (
        '01JCE21CS004',
        'firebaseid4',
        'Dhoni',
        'msd@jss.in',
        1234567890,
        'Mysore',
        1
    );

INSERT INTO
    lost_item (
        lname,
        ldescription,
        liimage,
        ldate,
        uid
    )
VALUES (
        'Laptop',
        'Dell Laptop',
        'imgdell.jpg',
        '2021-01-01',
        '01JCE21CS001'
    );

INSERT INTO
    lost_item (
        lname,
        ldescription,
        liimage,
        ldate,
        uid
    )
VALUES (
        'Mobile',
        'Samsung Mobile',
        'imgsamsung.jpg',
        '2021-01-01',
        '01JCE21CS002'
    );

INSERT INTO
    lost_item (
        lname,
        ldescription,
        liimage,
        ldate,
        uid
    )
VALUES (
        'Laptop',
        'HP Laptop',
        'imghp.jpg',
        '2021-01-01',
        '01JCE21CS001'
    );

INSERT INTO
    lost_item (
        lname,
        ldescription,
        liimage,
        ldate,
        uid
    )
VALUES (
        'Laptop',
        'Apple Laptop',
        'imgapple.jpg',
        '2021-01-01',
        '01JCE21CS003'
    );

INSERT INTO
    location (bname, floor, aid, univid)
VALUES ('CSE', 1, 1, 1);

INSERT INTO camno VALUES(1, 1), (1, 2), (1, 3);

INSERT INTO
    location (bname, floor, aid, univid)
VALUES ('CSE', 2, 1, 1);

INSERT INTO camno VALUES(2, 5), (2, 6), (2, 7);

INSERT INTO
    location (bname, floor, aid, univid)
VALUES ('ECE', 1, 1, 1);

INSERT INTO camno VALUES(3, 1), (3, 2), (3, 3);

INSERT INTO
    found_item (
        fname,
        fdescription,
        fimage,
        fdate,
        locid,
        locdesc,
        uid
    )
VALUES (
        'Laptop',
        'Apple Laptop',
        'imgapple.jpg',
        '2021-01-01',
        1,
        'near CS001',
        '01JCE21CS002'
    );

INSERT INTO
    found_item (
        fname,
        fdescription,
        fimage,
        fdate,
        locid,
        locdesc,
        uid
    )
VALUES (
        'Key',
        'Car Key',
        'imgkey.jpg',
        '2021-01-01',
        3,
        'near Seminar hall',
        '01JCE21CS001'
    );

INSERT INTO
    found_item (
        fname,
        fdescription,
        fimage,
        fdate,
        locid,
        locdesc,
        uid
    )
VALUES (
        'Watch',
        'FireBoltt Smart Watch',
        'imgwatch.jpg',
        '2021-01-01',
        2,
        'near CS101',
        '01JCE21CS001'
    );

INSERT INTO probably_lost_in VALUES(1, 1, 'near CS001');

INSERT INTO probably_lost_in VALUES(1, 2, 'near CS101');

INSERT INTO probably_lost_in VALUES(4, 3, NULL);

INSERT INTO resolved VALUES(3, 1, '2021-01-01');

CREATE TRIGGER LOSTITEMCOUNT AFTER INSERT ON LOST_ITEM 
FOR EACH ROW BEGIN UPDATE  users
	SET lostcount = lostcount + 1
	WHERE uid = NEW.uid;
	END;


CREATE TRIGGER FOUNDITEMCOUNT AFTER INSERT ON FOUND_ITEM 
FOR EACH ROW BEGIN 
	UPDATE users
	SET foundcount = foundcount + 1
	WHERE uid = NEW.uid;
	END;


SELECT
    univid,
    uid,
    sname,
    phno,
    email,
    address,
    foundcount,
    lostcount
FROM users
WHERE uid = '01JCE21CS001';

SELECT
    uid,
    sname,
    lid,
    lname,
    ldescription,
    liimage,
    ldate
FROM lost_item
NATURAL JOIN users
WHERE uid = '01JCE21CS001';

SELECT
    locid,
    locdesc,
    bname,
    floor,
    aname
FROM probably_lost_in
    NATURAL JOIN location
    NATURAL JOIN admin
WHERE lid = 1;

SELECT camid FROM camno WHERE locid = 1;

SELECT
uid,
sname,
    lid,
    lname,
    ldescription,
    liimage,
    ldate
FROM lost_item
NATURAL JOIN users

SELECT
    locid,
    locdesc,
    bname,
    floor,
    aname
FROM probably_lost_in
    NATURAL JOIN location
    NATURAL JOIN admin
WHERE lid = 1;

SELECT camid FROM camno WHERE locid = 1;

SELECT
    uid,
    sname,
    fid,
    fname,
    fdescription,
    fimage,
    fdate,
    locid,
    locdesc,
    bname,
    floor,
    aname
FROM found_item
NATURAL JOIN users
    NATURAL JOIN location
    NATURAL JOIN admin
WHERE uid = '01JCE21CS001';

SELECT
    uid,
    sname,
    fid,
    fname,
    fdescription,
    fimage,
    fdate,
    locid,
    locdesc,
    bname,
    floor,
    aname
FROM found_item f
    NATURAL JOIN users
    NATURAL JOIN location
    NATURAL JOIN admin
WHERE fname IN (
        SELECT lname
        FROM lost_item l
        WHERE
            lname = fname
            AND l.uid = '01JCE21CS001'
    );

SELECT camid FROM camno WHERE locid = 1;

SELECT locid, bname, floor,aname FROM location NATURAL JOIN admin WHERE univid = 1;

SELECT
    uid,
    sname,
    lid,
    lname,
    ldescription,
    liimage,
    ldate
FROM lost_item
NATURAL JOIN users
WHERE lid = 1;

SELECT
    uid,
    sname,
    fid,
    fname,
    fdescription,
    fimage,
    fdate,
    locid,
    locdesc,
    bname,
    floor,
    aname
FROM found_item
NATURAL JOIN users
    NATURAL JOIN location
    NATURAL JOIN admin
WHERE fid = 1;

