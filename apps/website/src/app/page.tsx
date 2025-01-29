import { ProjectCard } from "../components/ProjectCard/ProjectCard";
import React from "react";
import { queryProjectList } from "@repo/api/src/contentful/project/queries/queryProjectList";
import { contentfulClient } from "../utils/cms";

const img = "https://images.unsplash.com/photo-1467385829985-2b0fb82b5193?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export default async function Home() {
  const { items: projects } = await queryProjectList(contentfulClient);
  console.log(projects)
  return (
    <div className="min-h-screen">
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {projects.map((project) => (
          <li key={project.sys.id}>
            <ProjectCard
              id={project.sys.id}
              title={project.fields.title}
              thumbnail={project.fields.thumbnail!.fields.file!.url}
              technologies={project.fields.technologies.map((tech) => tech!.fields.name)}
              Content={(
                <div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque aut culpa eos esse et fugit
                    iusto
                    neque rem tenetur. Debitis eius eum explicabo impedit neque obcaecati perferendis quibusdam?
                    Laudantium.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque aut culpa eos esse et fugit
                    iusto neque rem tenetur. Debitis eius eum explicabo impedit neque obcaecati perferendis quibusdam?
                    Laudantium.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque aut culpa eos esse et fugit
                    iusto neque rem tenetur. Debitis eius eum explicabo impedit neque obcaecati perferendis quibusdam?
                    Laudantium.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque aut culpa eos esse et fugit
                    iusto neque rem tenetur. Debitis eius eum explicabo impedit neque obcaecati perferendis quibusdam?
                    Laudantium.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque aut culpa eos esse et fugit
                    iusto neque rem tenetur. Debitis eius eum explicabo impedit neque obcaecati perferendis quibusdam?
                    Laudantium.</p>
                </div>
              )}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
