export default function Filter({ value, onChange }) {
  return (
    <select className="input" value={value} onChange={(e)=>onChange(e.target.value)}>
      <option>All</option>
      <option>Completed</option>
      <option>Incomplete</option>
    </select>
  )
}
