// Central source of truth for company details.
// Once the admin panel exists, this becomes a single editable record
// instead of a hardcoded file — every component below just reads from it.
export const COMPANY = {
  name: 'Al Madina Autos',
  tagline: 'Wholesale & Retail Auto Spare Parts',
  phones: [
    { label: 'Sales', number: '0333 6466645', tel: '+923336466645', whatsapp: '923336466645' },
    { label: 'Support', number: '0333 6466647', tel: '+923336466647', whatsapp: '923336466647' },
  ],
  address: 'Near Leghari Workshop DHA Road Off Jampur Road Dera Ghazi Khan', // set to a string once confirmed — UI shows "Address coming soon" while null
  regionWholesale: 'South Punjab',
  regionRetail: 'Nationwide (Pakistan)',
  deliveryNote: 'Delivery charges apply on orders shipped outside South Punjab.',
}