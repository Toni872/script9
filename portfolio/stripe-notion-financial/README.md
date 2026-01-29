# 💸 Automated Financial Dashboard (Stripe → Notion)

> **Real-time Revenue Operations (RevOps) automation using Webhooks and Serverless Functions.**

## 📌 Project Overview
Founders waste hours manually updating spreadsheets. This integration creates a **Live Financial Command Center** in Notion:
1.  **Trigger**: New Payment in Stripe / Invoice Paid.
2.  **Process**: Webhook receiver normalizes data (Gross, Net, Fees, Currency).
3.  **Sync**: Updates Notion Database "Finance Tracker".
4.  **Alert**: Sends a "Cha-Ching 💰" notification to Slack/Telegram.

## 🛠️ Tech Stack
*   **Payment**: Stripe API (Webhooks)
*   **Database**: Notion API
*   **Runtime**: Node.js / AWS Lambda / n8n
*   **Notification**: Slack API

## 🔄 Workflow Logic
1.  Customer pays €2,500 invoice.
2.  Stripe sends `payment_intent.succeeded` event.
3.  Server validates signature (security).
4.  Script calculates MRR impact vs LTV.
5.  Notion row created:
    *   `Amount`: €2,500
    *   `Client`: Acme Corp
    *   `Status`: Paid ✅
    *   `Date`: Today

## 💻 Sample Webhook Handler (Node.js)
```javascript
app.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object;
    await notion.pages.create({
      parent: { database_id: NOTION_DB_ID },
      properties: {
        'Client': { title: [{ text: { content: invoice.customer_email } }] },
        'Amount': { number: invoice.amount_paid / 100 },
        'Status': { select: { name: 'Paid' } }
      }
    });
  }
  res.send();
});
```

---
**Maintained by:** [Script9](https://script-9.com)
