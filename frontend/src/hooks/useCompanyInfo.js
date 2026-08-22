import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

const FALLBACK = {
  name: 'Al Madina Autos',
  tagline: '',
  phone1Label: 'Sales', phone1Number: '',
  phone2Label: 'Support', phone2Number: '',
  address: null,
  regionWholesale: '', regionRetail: '', deliveryNote: '',
}

export function useCompanyInfo() {
  const [company, setCompany] = useState(FALLBACK)

  useEffect(() => {
    fetch(`${API_BASE}/settings/company`)
      .then((r) => r.json())
      .then((data) => data && setCompany(data))
      .catch(() => {})
  }, [])

  return {
    ...company,
    phones: [
      { label: company.phone1Label, number: company.phone1Number, tel: `+92${company.phone1Number?.replace(/\D/g, '').slice(-10)}`, whatsapp: `92${company.phone1Number?.replace(/\D/g, '').slice(-10)}` },
      { label: company.phone2Label, number: company.phone2Number, tel: `+92${company.phone2Number?.replace(/\D/g, '').slice(-10)}`, whatsapp: `92${company.phone2Number?.replace(/\D/g, '').slice(-10)}` },
    ],
  }
}