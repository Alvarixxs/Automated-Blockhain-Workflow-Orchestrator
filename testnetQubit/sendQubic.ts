import { QubicTransaction } from "@qubic-lib/qubic-ts-library/dist/qubic-types/QubicTransaction.js";

const baseURL = 'https://testnet-rpc.qubic.org'

// Creating and broadcasting a simple transaction
export async function sendQubicTransaction() {

    const sourceId = 'EQMBBVYGZOFUIHEXFOXKTFTANEKBXLBXHAYDFFMREEMRQEVADYMMEWACTODD'; // Your sender's public key
    const sourceSeed = 'xpsxzzfqvaohzzwlbofvqkqeemzhnrscpeeokoumekfodtgzmwghtqm'; // Your provided seed
    const destinationId = 'AFRNFIUDEZGDRGIDEQIWKZDDKBOBYFEANSVVSTFMMGJIFMTMLVLEJAKGQNNI'; // Replace with recipient's public key
    const amount = 1000; // Amount of Qubic tokens to send

    // Hardcode the tick value (or fetch from elsewhere)
    const targetTick = 21214100; // Set an appropriate tick value here

    // Creating the transaction
    const tx = new QubicTransaction()
        .setSourcePublicKey(sourceId) // Sender's public key
        .setDestinationPublicKey(destinationId) // Recipient's public key
        .setAmount(amount) // Amount to send
        .setTick(targetTick) // Tick for transaction

    // Signing the transaction
    await tx.build(sourceSeed) // Build the transaction with the source seed (private key)

    // Broadcasting the transaction
    const response = await broadcastTransaction(tx)
    const responseData = await response.json()

    if (!response.ok) {
        console.log("Failed to broadcast transaction: ", responseData)
        return
    }

    console.log("Successfully broadcast transaction.")
    console.log("Transaction ID: " + responseData.transactionId)
    console.log("Scheduled for tick: " + targetTick)
}

// Run the send transaction function
await sendQubicTransaction()

// Broadcasting the transaction to the network
export async function broadcastTransaction(transaction) {

    const encodedTransaction = transaction.encodeTransactionToBase64(transaction.getPackageData())

    return await fetch(baseURL + "/v1/broadcast-transaction",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(
                {
                    encodedTransaction: encodedTransaction
                }
            )
        });
}
