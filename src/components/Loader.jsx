export default function Loader({ text = 'Loading…' }) {
  return (
    <div className="loader-wrap">
      <span className="loader-spinner" />
      <span className="loader-text">{text}</span>
    </div>
  )
}

export function Spinner({ small = false }) {
  return <span className={`loader-spinner ${small ? 'sm' : ''}`} />
}