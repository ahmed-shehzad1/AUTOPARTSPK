import { useState } from 'react'
import Papa from 'papaparse'
import { Link } from 'react-router-dom'
import { FaArrowLeft, FaUpload, FaDownload } from 'react-icons/fa'
import api from '../../api/client'

const TEMPLATE_HEADERS = [
  'partNo', 'name', 'description', 'category', 'partBrand',
  'condition', 'stock', 'price', 'wholesalePrice', 'wholesaleMinQty',
  'moq', 'unit', 'rfqThreshold',
]

function BulkAddProducts() {
  const [rows, setRows] = useState([])
  const [fileName, setFileName] = useState('')
  const [result, setResult] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setFileName(file.name)
    setResult(null)
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => setRows(res.data),
    })
  }

  const handleDownloadTemplate = () => {
    const csv = TEMPLATE_HEADERS.join(',') + '\n' +
      'BRK-3001,Front Brake Disc,Ventilated front disc,Brakes,Bosch,New,In Stock,4500,3800,10,pcs,100'
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'product-import-template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await api.post('/products/bulk-import', { rows })
      setResult(res.data)
      if (res.data.skippedCount === 0) setRows([])
    } catch (err) {
      alert('Import failed — check the backend is running.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl">
      <Link to="/products" className="flex items-center gap-2 font-mono text-xs text-slate hover:text-blueprint transition-colors mb-6 w-fit">
        <FaArrowLeft size={10} /> Back to Products
      </Link>

      <h1 className="font-display font-semibold text-2xl text-ink mb-2">Bulk Add Products</h1>
      <p className="font-body text-sm text-slate mb-8">
        Upload a CSV from your supplier to create many products at once. Category and brand names must match existing entries exactly (check Categories/Brands pages first).
      </p>

      <div className="bg-paper border border-ink/10 rounded-lg p-7 mb-6">
        <button
          onClick={handleDownloadTemplate}
          className="flex items-center gap-2 font-mono text-xs uppercase text-blueprint hover:underline mb-6"
        >
          <FaDownload size={11} /> Download CSV Template
        </button>

        <label className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-ink/15 rounded-lg py-10 cursor-pointer hover:border-blueprint transition-colors">
          <FaUpload className="text-slate/40 text-xl" />
          <span className="font-body text-sm text-slate">
            {fileName || 'Click to select a CSV file'}
          </span>
          <input type="file" accept=".csv" onChange={handleFile} className="hidden" />
        </label>
      </div>

      {rows.length > 0 && (
        <div className="bg-paper border border-ink/10 rounded-lg p-6 mb-6">
          <p className="font-mono text-xs text-slate uppercase mb-4">{rows.length} rows parsed — preview first 5:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-ink/10">
                  {TEMPLATE_HEADERS.map((h) => (
                    <th key={h} className="text-left font-mono text-slate/60 uppercase px-3 py-2 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 5).map((row, i) => (
                  <tr key={i} className="border-b border-ink/5">
                    {TEMPLATE_HEADERS.map((h) => (
                      <td key={h} className="px-3 py-2 text-ink whitespace-nowrap">{row[h]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="mt-5 bg-ink text-paper font-medium px-6 py-3 rounded-md hover:bg-blueprint transition-colors disabled:opacity-50"
          >
            {submitting ? 'Importing…' : `Import ${rows.length} Products`}
          </button>
        </div>
      )}

      {result && (
        <div className="bg-paper border border-ink/10 rounded-lg p-6">
          <p className="font-body text-ink mb-2">
            <span className="text-blueprint font-semibold">{result.createdCount}</span> products created,{' '}
            <span className="text-ignition font-semibold">{result.skippedCount}</span> skipped.
          </p>
          {result.skipped.length > 0 && (
            <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
              {result.skipped.map((s, i) => (
                <div key={i} className="font-mono text-xs bg-ignition/10 text-ignition px-3 py-2 rounded">
                  {s.row.partNo || '(no part no.)'} — {s.reason}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default BulkAddProducts