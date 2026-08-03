import { useEffect, useState } from 'react'
import { FaPlus, FaTrash, FaChevronDown, FaChevronRight } from 'react-icons/fa'
import api from '../../api/client'

function VehicleList() {
  const [makes, setMakes] = useState([])
  const [expanded, setExpanded] = useState(null)
  const [newMake, setNewMake] = useState('')
  const [newModelInputs, setNewModelInputs] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchMakes = async () => {
    setLoading(true)
    try {
      const res = await api.get('/makes')
      setMakes(res.data)
    } catch {
      setError('Failed to load vehicles. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchMakes() }, [])

  const handleAddMake = async (e) => {
    e.preventDefault()
    if (!newMake.trim()) return
    setError('')
    try {
      await api.post('/makes', { name: newMake.trim() })
      setNewMake('')
      fetchMakes()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add make.')
    }
  }

  const handleDeleteMake = async (id, name) => {
    if (!window.confirm(`Delete "${name}" and all its models?`)) return
    try {
      await api.delete(`/makes/${id}`)
      fetchMakes()
    } catch {
      setError('Failed to delete make.')
    }
  }

  const handleAddModel = async (makeId) => {
    const name = (newModelInputs[makeId] || '').trim()
    if (!name) return
    setError('')
    try {
      await api.post(`/makes/${makeId}/models`, { name })
      setNewModelInputs((prev) => ({ ...prev, [makeId]: '' }))
      fetchMakes()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add model.')
    }
  }

  const handleDeleteModel = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return
    try {
      await api.delete(`/models/${id}`)
      fetchMakes()
    } catch {
      setError('Failed to delete model.')
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <span className="font-mono text-xs tracking-widest text-blueprint uppercase">Fitment Data</span>
      <h1 className="font-display font-semibold text-2xl text-ink mt-1 mb-8">Vehicle Makes &amp; Models</h1>

      <form onSubmit={handleAddMake} className="flex gap-3 mb-6">
        <input
          type="text"
          value={newMake}
          onChange={(e) => setNewMake(e.target.value)}
          placeholder="New make (e.g. Nissan)"
          className="flex-grow bg-paper border border-ink/10 rounded-md px-4 py-2.5 text-sm font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
        />
        <button type="submit" className="flex items-center gap-2 bg-ink text-paper font-medium text-sm px-5 py-2.5 rounded-md hover:bg-blueprint transition-colors">
          <FaPlus size={12} /> Add Make
        </button>
      </form>

      {error && (
        <div className="bg-ignition/10 border border-ignition/30 text-ignition font-body text-sm px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {loading ? (
          <p className="font-body text-slate text-sm">Loading…</p>
        ) : makes.length === 0 ? (
          <p className="font-body text-slate text-sm">No makes yet.</p>
        ) : (
          makes.map((make) => (
            <div key={make.id} className="bg-paper border border-ink/10 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpanded((e) => (e === make.id ? null : make.id))}
                className="w-full flex items-center justify-between px-5 py-3.5"
              >
                <span className="flex items-center gap-3 font-body font-medium text-ink text-sm">
                  {expanded === make.id ? <FaChevronDown size={11} /> : <FaChevronRight size={11} />}
                  {make.name}
                  <span className="font-mono text-[10px] text-slate/50">({make.models.length} models)</span>
                </span>
                <span
                  onClick={(e) => { e.stopPropagation(); handleDeleteMake(make.id, make.name) }}
                  className="text-slate hover:text-ignition transition-colors"
                >
                  <FaTrash size={13} />
                </span>
              </button>

              {expanded === make.id && (
                <div className="border-t border-ink/5 px-5 py-4 bg-steel/30">
                  <div className="space-y-2 mb-3">
                    {make.models.map((model) => (
                      <div key={model.id} className="flex items-center justify-between">
                        <span className="font-mono text-xs text-ink">{model.name}</span>
                        <button onClick={() => handleDeleteModel(model.id, model.name)} className="text-slate/50 hover:text-ignition transition-colors">
                          <FaTrash size={11} />
                        </button>
                      </div>
                    ))}
                    {make.models.length === 0 && (
                      <p className="font-mono text-xs text-slate/40">No models yet.</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newModelInputs[make.id] || ''}
                      onChange={(e) => setNewModelInputs((prev) => ({ ...prev, [make.id]: e.target.value }))}
                      placeholder="New model name"
                      className="flex-grow bg-paper border border-ink/10 rounded-md px-3 py-2 text-xs font-body text-ink focus:outline-none focus:border-blueprint transition-colors"
                    />
                    <button
                      onClick={() => handleAddModel(make.id)}
                      className="bg-ink text-paper font-mono text-xs uppercase px-4 py-2 rounded-md hover:bg-blueprint transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default VehicleList