import { getProjects } from "@/lib/sanity";
import Project from "../components/Project";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="projects">
      <h1>Projects</h1>
      <div className="projects-list">
        {projects.map((project) => (
          <Project key={project._id} project={project} />
        ))}
      </div>
    </main>
  );
}
