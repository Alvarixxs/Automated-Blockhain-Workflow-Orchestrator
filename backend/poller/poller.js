const express = require("express");
const app = express();
const PORT = 3000;
const urlBase = "https://rpc.qubic.org"
const urlBackend = "https://93f0-195-55-210-1.ngrok-free.app/api/trigger/transaction/process"
const urlBaseV1 = `${urlBase}/v1`;
const urlBaseV2 = `${urlBase}/v2`;

let prevTick = null; // Store the last processed tick

var failedTicks = new Set();

async function pollAPI() {
    try {
        const response = await fetch(`${urlBaseV1}/tick-info`);
        const data = await response.json();
        const currentTick = data.tickInfo.tick;

        if (prevTick === null) {
            prevTick = currentTick; // Initialize on first run
        }

        if (currentTick > prevTick) {
            let missedTicks = new Set(); 
            let newFailedTicks = new Set();
            for (let tick = prevTick + 1; tick <= currentTick; tick++) {
                missedTicks.add(tick);
            }

            let union = new Set([...failedTicks, ...missedTicks])
            for (let tick of union) {
                try {
                    const response = await fetch(`${urlBaseV2}/ticks/${tick}/transactions`);
                    const data = await response.json();
            
                    // Check if the response contains an error
                    if (data.code && data.code !== 0) {
                        newFailedTicks.add(tick)
                    } else {
                        for (let transaction of data.transactions.map(t => t.transaction)) {
                            fetch(urlBackend, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json', 
                                },
                                body: JSON.stringify({
                                    "sender_id": transaction.sourceId,
                                    "receiver_id": transaction.destId,
                                    "amount": transaction.amount
                                }),  // Convert the payload to a JSON string
                            })
                        }
                    }
            
                } catch (error) {
                    console.error(`Error fetching transactions for tick ${tickNumber}:`, error);
                }
                
            }
            failedTicks = newFailedTicks

        } else {
            console.log(`No new ticks. Current tick: ${currentTick}`);
        }

        prevTick = currentTick; // Update for next iteration
    } catch (error) {
        console.error("Error fetching API:", error);
    }
}

// Poll every 5 seconds
setInterval(pollAPI, 5000);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
