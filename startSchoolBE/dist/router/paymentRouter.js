"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controller/paymentController");
const router = (0, express_1.Router)();
router.route("/payment/:schoolID").post(paymentController_1.createPayment);
router.route("/get-banks/:schoolID").get(paymentController_1.getBankAccount);
router.route("/make-payment/:schoolID").post(paymentController_1.makePayment);
router.route("/payment/:schoolID").get(paymentController_1.viewSchoolPayment);
router.route("/store-payment/:schoolID").post(paymentController_1.paymentFromStore);
router.route("/create-payment-account/:schoolID").post(paymentController_1.createPaymentAccount);
exports.default = router;