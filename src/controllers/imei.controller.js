import { pool } from "../db/index.js";
import { isValidIMEI } from "../services/imeiValidator.js";


// Check IMEI

export const checkIMEI = async (req, res) => {
  try {
    const { imei } = req.body;

    if (!isValidIMEI(imei)) {
      return res.status(400).json({ status: "INVALID", message: "Invalid IMEI format" });
    }

    const result = await pool.query("SELECT status FROM devices WHERE imei = $1", [imei]);

    if (result.rowCount === 0) {
      return res.status(200).json({ status: "UNREGISTERED", message: "IMEI not found" });
    }

    const deviceStatus = result.rows[0].status;

    return res.status(200).json({
      status: deviceStatus,
      message: deviceStatus === "BLOCKED" ? "Device is blocked" : "Device is registered"
    });

  } catch (err) {
    console.error("IMEI check error:", err);
    return res.status(500).json({ status: "ERROR", message: "Internal Server Error" });
  }
};


// Register IMEI

export const registerIMEI = async (req, res) => {
  try {
    const { imei } = req.body;

    if (!isValidIMEI(imei)) {
      return res.status(400).json({ status: "INVALID", message: "Invalid IMEI format" });
    }

    const exist = await pool.query("SELECT * FROM devices WHERE imei = $1", [imei]);
    if (exist.rowCount > 0) {
      return res.status(400).json({ status: "REGISTERED", message: "IMEI already exists" });
    }

    await pool.query(
      "INSERT INTO devices (imei, status) VALUES ($1, 'REGISTERED')",
      [imei]
    );

    return res.status(201).json({ status: "REGISTERED", message: "IMEI registered successfully" });

  } catch (err) {
    console.error("Register IMEI error:", err);
    return res.status(500).json({ status: "ERROR", message: "Internal Server Error" });
  }
};


// Block IMEI

export const blockIMEI = async (req, res) => {
  try {
    const { imei } = req.body;

    if (!isValidIMEI(imei)) {
      return res.status(400).json({ status: "INVALID", message: "Invalid IMEI format" });
    }

    const result = await pool.query(
      "UPDATE devices SET status='BLOCKED' WHERE imei=$1 RETURNING *",
      [imei]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ status: "UNREGISTERED", message: "IMEI not found" });
    }

    return res.status(200).json({ status: "BLOCKED", message: "IMEI blocked successfully" });

  } catch (err) {
    console.error("Block IMEI error:", err);
    return res.status(500).json({ status: "ERROR", message: "Internal Server Error" });
  }
};


// Unblock IMEI

export const unblockIMEI = async (req, res) => {
  try {
    const { imei } = req.body;

    if (!isValidIMEI(imei)) {
      return res.status(400).json({ status: "INVALID", message: "Invalid IMEI format" });
    }

    const result = await pool.query(
      "UPDATE devices SET status='REGISTERED' WHERE imei=$1 RETURNING *",
      [imei]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ status: "UNREGISTERED", message: "IMEI not found" });
    }

    return res.status(200).json({ status: "REGISTERED", message: "IMEI unblocked successfully" });

  } catch (err) {
    console.error("Unblock IMEI error:", err);
    return res.status(500).json({ status: "ERROR", message: "Internal Server Error" });
  }
};


// Delete IMEI

export const deleteIMEI = async (req, res) => {
  try {
    const { imei } = req.body;

    if (!isValidIMEI(imei)) {
      return res.status(400).json({ status: "INVALID", message: "Invalid IMEI format" });
    }

    const result = await pool.query(
      "DELETE FROM devices WHERE imei=$1 RETURNING *",
      [imei]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ status: "UNREGISTERED", message: "IMEI not found" });
    }

    return res.status(200).json({ status: "DELETED", message: "IMEI deleted successfully" });

  } catch (err) {
    console.error("Delete IMEI error:", err);
    return res.status(500).json({ status: "ERROR", message: "Internal Server Error" });
  }
};


// Get all IMEIs

export const getAllIMEIs = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT imei, status, created_at FROM devices ORDER BY created_at DESC"
    );

    return res.status(200).json({
      status: "SUCCESS",
      total: result.rowCount,
      data: result.rows
    });

  } catch (err) {
    console.error("Get all IMEIs error:", err);
    return res.status(500).json({
      status: "ERROR",
      message: "Internal Server Error"
    });
  }
};
