import express from "express";
import { sendMail } from "../controllers/sendMail.js";

export const sendMailRoute = express.Router();

sendMailRoute.post("/", sendMail);