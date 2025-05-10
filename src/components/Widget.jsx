export default function Widget({ title, children }) {
  return (
    <div className="widget">
      <h1>{title}</h1>
      {children}
    </div>
  );
}
