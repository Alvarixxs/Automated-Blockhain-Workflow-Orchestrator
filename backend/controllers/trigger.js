const router = require("express").Router();
const {
  Trigger,
  TransactionTrigger,
  SmartContractTrigger,
} = require("../models");

router.post("/transaction", async (req, res, next) => {
  try {
    const trigger = await Trigger.create({
      type: "transaction",
      webhook: req.body.webhook,
    });
    const transactionTrigger = await TransactionTrigger.create({
      id: trigger.id,
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
      amount: req.body.amount,
    });
    res.json(transactionTrigger);
  } catch (error) {
    next(error);
  }
});

router.post("/smartContract", async (req, res, next) => {
  try {
    const trigger = await Trigger.create({
      type: "smartContract",
      webhook: req.body.webhook,
    });
    const smartContractTrigger = await SmartContractTrigger.create({
      id: trigger.id,
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
      amount: req.body.amount,
    });
    res.json(smartContractTrigger);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
