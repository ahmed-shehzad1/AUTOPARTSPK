const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = 'AutoPartsPK <onboarding@resend.dev>' // swap to a verified domain address later
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL

async function notifyNewOrder(order) {
  try {
    await resend.emails.send({
      from: FROM,
      to: NOTIFY_EMAIL,
      subject: `New Order — ${order.orderNumber}`,
      html: `
        <h2>New order received</h2>
        <p><strong>Order:</strong> ${order.orderNumber}</p>
        <p><strong>Customer:</strong> ${order.customerName} — ${order.phone}</p>
        <p><strong>Address:</strong> ${order.address}, ${order.city}</p>
        <p><strong>Payment:</strong> ${order.paymentMethod}</p>
        <p><strong>Total:</strong> PKR ${order.subtotal.toLocaleString()}</p>
        <h3>Items</h3>
        <ul>
          ${order.items.map((i) => `<li>${i.name} (${i.partNo}) × ${i.qty} — PKR ${(i.unitPrice * i.qty).toLocaleString()}</li>`).join('')}
        </ul>
      `,
    })
  } catch (err) {
    console.error('Failed to send order notification email:', err)
  }
}

async function notifyNewWholesaleInquiry(inquiry) {
  try {
    await resend.emails.send({
      from: FROM,
      to: NOTIFY_EMAIL,
      subject: `New Wholesale Inquiry — ${inquiry.businessName}`,
      html: `
        <h2>New wholesale inquiry</h2>
        <p><strong>Business:</strong> ${inquiry.businessName}</p>
        <p><strong>Contact:</strong> ${inquiry.contactName} — ${inquiry.phone}</p>
        ${inquiry.email ? `<p><strong>Email:</strong> ${inquiry.email}</p>` : ''}
        ${inquiry.city ? `<p><strong>City:</strong> ${inquiry.city}</p>` : ''}
        ${inquiry.volume ? `<p><strong>Volume:</strong> ${inquiry.volume}</p>` : ''}
        ${inquiry.categories ? `<p><strong>Categories:</strong> ${inquiry.categories}</p>` : ''}
        ${inquiry.message ? `<p><strong>Message:</strong> ${inquiry.message}</p>` : ''}
      `,
    })
  } catch (err) {
    console.error('Failed to send wholesale inquiry email:', err)
  }
}

async function notifyNewContactMessage(message) {
  try {
    await resend.emails.send({
      from: FROM,
      to: NOTIFY_EMAIL,
      subject: `New Contact Message — ${message.subject || 'No subject'}`,
      html: `
        <h2>New contact message</h2>
        <p><strong>From:</strong> ${message.name} — ${message.phone}</p>
        ${message.email ? `<p><strong>Email:</strong> ${message.email}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.message}</p>
      `,
    })
  } catch (err) {
    console.error('Failed to send contact message email:', err)
  }
}

async function sendOrderConfirmation(order, customerEmail) {
  if (!customerEmail) return // guest checkout with no email provided — skip
  try {
    await resend.emails.send({
      from: FROM,
      to: customerEmail,
      subject: `Order Confirmed — ${order.orderNumber}`,
      html: `
        <h2>Thanks for your order, ${order.customerName}!</h2>
        <p>Your order <strong>${order.orderNumber}</strong> has been received and is being processed.</p>
        <h3>Order Summary</h3>
        <ul>
          ${order.items.map((i) => `<li>${i.name} × ${i.qty} — PKR ${(i.unitPrice * i.qty).toLocaleString()}</li>`).join('')}
        </ul>
        <p><strong>Total: PKR ${order.subtotal.toLocaleString()}</strong></p>
        <p>Payment method: ${order.paymentMethod}</p>
        <p>We'll be in touch if we need anything further to process your order.</p>
      `,
    })
  } catch (err) {
    console.error('Failed to send customer confirmation email:', err)
  }
}

module.exports = {
  notifyNewOrder,
  notifyNewWholesaleInquiry,
  notifyNewContactMessage,
  sendOrderConfirmation,
}