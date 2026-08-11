function LegalPage({ title, content }) {
  const formattedDate = new Date(content.updated).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <div className="bg-steel min-h-screen">
      <section className="bg-paper border-b border-ink/10 py-14">
        <div className="max-w-3xl mx-auto px-6">
          <span className="font-mono text-xs tracking-widest text-blueprint uppercase">Legal</span>
          <h1 className="font-display font-semibold text-3xl md:text-4xl text-ink mt-2 mb-3">{title}</h1>
          <p className="font-mono text-xs text-slate/50 uppercase">Last updated: {formattedDate}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-14 space-y-8">
        {content.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="font-display font-semibold text-lg text-ink mb-2">{section.heading}</h2>
            <p className="font-body text-slate leading-relaxed">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LegalPage