DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS challenges;
DROP TABLE IF EXISTS applications;
DROP TABLE IF EXISTS responses;
DROP TABLE IF EXISTS challengeresponses;
CREATE TABLE accounts (
    id integer not null primary key autoincrement,
    active integer not null,
    username text not null unique collate nocase,
    email text not null unique collate nocase,
    employer integer not null,
    companyname text not null,
    firstname text not null,
    lastname text not null,
    salt text not null unique,
    key text not null
    --creationdate numeric not null
);
CREATE TABLE jobs (
    id integer not null primary key autoincrement,
    active integer not null,
    accountid integer not null,
    title text not null,
    location text not null,
    description text not null
    --postdate numeric not null
    --expdate numeric not null
);
CREATE TABLE questions (
    id integer not null primary key autoincrement,
    jobid integer not null,
    questionnumber integer not null,
    question text not null,
    answertype text not null
);
CREATE TABLE challenges (
    id integer not null primary key autoincrement,
    active integer not null,
    accountid integer not null,
    jobid integer not null,
    title text not null,
    description text not null,
    language text not null,
    time integer not null
    --postdate numeric not null
    --expdate numeric not null
);
CREATE TABLE applications (
    id integer not null primary key autoincrement,
    active integer not null,
    accountid integer not null,
    jobid integer not null
    --postdate numeric not null
);
CREATE TABLE responses (
    id integer not null primary key autoincrement,
    accountid integer not null,
    jobid integer not null,
    questionid integer not null,
    questionnumber integer not null,
    answer text not null
);
CREATE TABLE challengeresponses (
    id integer not null primary key autoincrement,
    accountid integer not null,
    jobid integer not null,
    challengeid integer not null,
    filename text not null,
    code text not null
    --postdate numeric not null
);
