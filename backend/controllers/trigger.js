const router = require("express").Router();
const { Op } = require("sequelize");
const {
  Trigger,
  TransactionTrigger,
  SmartContractTrigger,
} = require("../models");

router.get("/", async (req, res, next) => {
  res.status(200).end();
});

router.post("/transaction", async (req, res, next) => {
  try {
    const trigger = await Trigger.create({
      type: "transaction",
      webhook: req.body.webhook,
    });
    const transactionTrigger = await TransactionTrigger.create({
      id: trigger.id,
      senderId: req.body.sender_id,
      receiverId: req.body.receiver_id,
      minQubic: req.body.min_qubic,
      maxQubic: req.body.max_qubic,
    });
    res.json({
        externalHookId: trigger.id,
        token: "",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("/transaction", async (req, res, next) => {
  try {
    const body = req.body;
    await Trigger.destroy({
      where: {
        id: body.id,
      },
    });
    await TransactionTrigger.destroy({
      where: {
        id: body.id,
      },
    });
    res.status(204).end();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete("smartContract/:id", async (req, res, next) => {
  try {
    await Trigger.destroy({
      where: {
        id: req.params.id,
      },
    });
    await SmartContractTrigger.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).end();
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

router.post("/transaction/process", async (req, res, next) => {
  try {
    const transaction = req.body;
    const { sender_id, receiver_id, amount } = transaction;
    
    if (!sender_id || !receiver_id || !amount) {
      return res.status(400).json({ error: "Missing required transaction fields" });
    }
    
    // Find matching transaction triggers using ORM filtering
    const triggers = await TransactionTrigger.findAll({
      where: {
        [Op.and]: [
          // Match sender if defined, otherwise true
          {
            [Op.or]: [
              { sender_id: null },
              { sender_id: sender_id }
            ]
          },
          // Match receiver if defined, otherwise true 
          {
            [Op.or]: [
              { receiver_id: null },
              { receiver_id: receiver_id }
            ]
          },
          // Amount must be >= min_qubic if defined
          {
            [Op.or]: [
              { min_qubic: null },
              { min_qubic: { [Op.lte]: amount } }
            ]
          },
          // Amount must be <= max_qubic if defined
          {
            [Op.or]: [
              { max_qubic: null }, 
              { max_qubic: { [Op.gte]: amount } }
            ]
          }
        ]
      }
    });

    // Get webhook URLs for matching triggers
    const triggerIds = triggers.map(trigger => trigger.id);
    const webhookTriggers = await Trigger.findAll({
      where: {
        id: {
          [Op.in]: triggerIds
        }
      }
    });

    // Call webhooks for matching triggers
    const fetch = require('node-fetch');
    const matchPromises = webhookTriggers.map(async (trigger) => {
      try {
        const webhookData = {
          sender_id,
          receiver_id,
          amount
        };
        
        await fetch(trigger.webhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData)
        });
        
        return { triggerId: trigger.id, success: true };
      } catch (error) {
        console.error(`Failed to call webhook for trigger ${trigger.id}:`, error);
        return { triggerId: trigger.id, success: false, error: error.message };
      }
    });

    const results = await Promise.all(matchPromises);
    const matchedTriggers = results.filter(result => result !== null);
    
    res.status(200).json({
      transaction_processed: true,
      triggers_matched: matchedTriggers.length,
      results: matchedTriggers
    });
  } catch (error) {
    console.error("Error processing transaction:", error);
    next(error);
  }
});

module.exports = router;
