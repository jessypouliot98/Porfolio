import { ProjectCard } from "../components/ProjectCard/ProjectCard";
import React, { cache, Suspense } from "react";
import { queryProjectList } from "@repo/api/src/contentful/project/queries/queryProjectList";
import { contentfulClient, contentfulImageProps } from "../utils/cms";
import { Header } from "../parts/Header/Header";
import { Footer } from "../parts/Footer/Footer";
import { queryTechnologyList } from "@repo/api/src/contentful/technology/queries/queryTechnologyList";
import Image from "next/image";
import { Card } from "@repo/ui/src/components/Card/Card";
import { clsx } from "clsx";
import { assertDefined } from "@repo/util/src/assertDefined";
import { HeroSkillSpinner } from "../parts/HeroSkillSpinner/HeroSkillSpinner";

const getProjectList = cache(() => queryProjectList(contentfulClient));
const getTechnologyList = cache(() => queryTechnologyList(contentfulClient));

export default async function Home() {
  const [
    { items: projects },
    { items: technologies }
  ] = await Promise.all([
    getProjectList(),
    getTechnologyList(),
  ]);

  return (
    <div className="[--overlap:theme(spacing.96)] min-h-screen">
      <Header
        className="pb-(--overlap)"
        backgroundContent={(
          <div className="size-full max-w-screen-2xl mx-auto relative">
            <Suspense fallback={null}>
              <HeroSkillSpinner/>
            </Suspense>
          </div>
        )}
      />
      <main
        id="main"
        className="w-full max-w-screen-2xl mx-auto -mt-[var(--overlap)] space-y-12 py-12"
      >
        <section id="projects" className="p-6 space-y-6">
          <h2 className="font-pixel text-4xl text-white">Projects</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {projects.map((project, i) => {
              return (
                <li key={project.sys.id}>
                  <ProjectCard
                    project={project}
                    thumbnailLoading={i < 4 ? "eager" : "lazy"}
                  />
                </li>
              )
            })}
          </ul>
        </section>
        <section id="technologies" className="p-6 space-y-3">
          <h2 className="font-pixel text-4xl text-blue-500">Technologies</h2>
          <ul className="flex flex-wrap justify-center gap-6">
            {technologies.map((technology) => {
              const image = technology.fields.image;
              assertDefined(image);
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
                        {...contentfulImageProps(image)}
                        width={size}
                        height={size}
                        loading="lazy"
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
