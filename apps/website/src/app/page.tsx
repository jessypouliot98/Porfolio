import { ProjectCard } from "../components/ProjectCard/ProjectCard";

export default function Home() {
  return (
    <div className="min-h-screen">
      <ul className="flex gap-6">
        <li><ProjectCard id="a" className="w-32" /></li>
        <li><ProjectCard id="b" className="w-32" /></li>
        <li><ProjectCard id="c" className="w-32" /></li>
      </ul>
    </div>
  );
}
