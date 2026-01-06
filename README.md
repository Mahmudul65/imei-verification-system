# IMEI Verification System

> A NEIR-inspired backend system for validating, registering, blocking, and managing IMEI numbers of mobile devices.

---

## Table of Contents

- Overview
- Features
- Tech Stack
- Installation
- Database Setup
- API Endpoints
- Sample Requests
- License
- Notes

---

## Overview

This project is a backend system that mimics real-world IMEI verification platforms such as NEIR.  
It validates IMEI numbers using the **Luhn algorithm**, stores device information, and allows blocking, unblocking, deleting, and querying IMEI numbers.

The project is built for **learning backend architecture**, database integration, and real-world validation logic.

---

## Features

- IMEI validation using Luhn algorithm
- Register new IMEI numbers
- Block and unblock IMEI numbers
- Delete IMEI records from database
- Fetch all registered IMEIs
- PostgreSQL database with constraints
- Clean modular folder structure

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Thunder Client / Postman
- ES Modules

---

## Installation

1. Clone the repository
```bash
git clone https://github.com/Mahmudul65/imei-verification-system.git


cd imei-verification-system


2. Install depencies

npm install


3. DB

PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=imei_db

4.  Create db



CREATE TABLE devices (
    imei CHAR(15) PRIMARY KEY,
    status TEXT NOT NULL CHECK (status IN ('REGISTERED','BLOCKED')),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ownership_history (
    id SERIAL PRIMARY KEY,
    imei CHAR(15) REFERENCES devices(imei),
    nid VARCHAR(20) NOT NULL,
    from_date TIMESTAMP DEFAULT NOW(),
    to_date TIMESTAMP
);




API Endpoints
Method  	Endpoint	            Description

POST	/api/imei/register	    Register a new IMEI

POST	/api/imei/check	        Check IMEI status

POST	/api/imei/block	        Block an IMEI

POST	/api/imei/unblock	    Unblock an IMEI

DELETE	/api/imei/delete	    Delete IMEI from database

GET  	/api/imei/all	        Get all IMEI records




Sample Requests
Register IMEI
POST /api/imei/register
{
  "imei": "490154203237518"
}


Response:

{
  "status": "REGISTERED",
  "message": "IMEI registered successfully"
}

Check IMEI
POST /api/imei/check
{
  "imei": "490154203237518"
}


Response:

{
  "status": "REGISTERED",
  "message": "Device is registered"
}

Block IMEI
POST /api/imei/block
{
  "imei": "490154203237518"
}

Get All IMEIs
GET /api/imei/all

License
MIT License



Notes:

IMEI must pass Luhn checksum validation

Random 15-digit numbers will be rejected

Use real device IMEIs (*#06#) for testing

Designed for backend learning and practice