
# Backend for Make App Integration

This backend is designed to work with the [Make app](https://www.make.com/). It handles webhook creation, transaction filtering, and forwarding for further processing within the Make pipeline.

## Diagram

![System Level Integration Architecture](docs/SLIAL.png)


## 🚀 Quick Overview

- Compatible with the **Make app**.
- On webhook creation (via the Make dashboard), the backend:
  - Creates a database entry to watch for specific transactions.
  - Retrieves matching transactions and sends them to the Make webhook for pipeline processing.

## 🛠️ Development

To get started locally:

```bash
npm install
npm run dev