import "./Heading.css";

export default function Heading({ headingTitle }: {headingTitle: string}) {
  return <h1 className="heading">{headingTitle}</h1>;
}
