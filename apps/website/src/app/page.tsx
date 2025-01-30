import { ProjectCard } from "../components/ProjectCard/ProjectCard";
import React from "react";
import { queryProjectList } from "@repo/api/src/contentful/project/queries/queryProjectList";
import { contentfulClient, contentfulImageProps } from "../utils/cms";
import { Header } from "../parts/Header/Header";
import { Footer } from "../parts/Footer/Footer";
import { queryTechnologyList } from "@repo/api/src/contentful/technology/queries/queryTechnologyList";
import Image from "next/image";
import { Card } from "@repo/ui/src/components/Card/Card";
import { clsx } from "clsx";

export default async function Home() {
  const { items: projects } = await queryProjectList(contentfulClient);
  const { items: technologies } = await queryTechnologyList(contentfulClient);

  return (
    <div className="[--overlap:theme(spacing.96)] min-h-screen">
      <Header
        className="pb-(--overlap)"
      />
      <main
        id="main"
        className="w-full max-w-screen-2xl mx-auto -mt-[var(--overlap)] space-y-12 py-12"
      >
        <section id="projects" className="p-6 space-y-6">
          <h2 className="font-pixel text-4xl text-white">Projects</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {projects.map((project) => (
              <li key={project.sys.id}>
                <ProjectCard
                  id={project.sys.id}
                  title={project.fields.title}
                  thumbnail={contentfulImageProps(project.fields.thumbnail!).src}
                  technologies={project.fields.technologies.map((tech) => tech!.fields.name)}
                  Content={(
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque aut culpa eos esse et fugit
                      iusto
                      neque rem tenetur. Debitis eius eum explicabo impedit neque obcaecati perferendis quibusdam?
                      Laudantium.</p>
                  )}
                />
              </li>
            ))}
          </ul>
        </section>
        <section id="technologies" className="p-6 space-y-3">
          <h2 className="font-pixel text-4xl text-blue-500">Technologies</h2>
          <ul className="flex flex-wrap justify-center gap-6">
            {technologies.map((technology) => {
              const level = technology.fields.level ?? 40;
              const indexLevel = Math.floor(level / 10);
              const size = [48,36,28][indexLevel] ?? 28;
              return (
                <li
                  key={technology.sys.id}
                  className="grid place-items-center"
                  data-level={level}
                  data-index-level={indexLevel}
                >
                  <Card
                    className={clsx(
                      "p-2 flex gap-2 items-center",
                      "text-xs",
                      "data-[level=1]:text-base",
                      "data-[level=2]:text-sm",
                    )}
                  >
                    <div className="aspect-square grid place-items-center">
                      <Image
                        {...contentfulImageProps(technology.fields.image!)}
                        width={size}
                        height={size}
                      />
                    </div>
                    <div>{technology.fields.name}</div>
                  </Card>
                </li>
              )
            })}
          </ul>
        </section>
      </main>
      <Footer/>
    </div>
);
}
