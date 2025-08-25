import "./Widget.css";

interface WidgetProps {
  title: React.ReactNode,
  children?: React.ReactNode,
  className?: string,
}

export default function Widget({ title, children }:WidgetProps) {
  return (
    <div className="widget">
      <h1>{title}</h1>
      {children}
    </div>
  );
}
