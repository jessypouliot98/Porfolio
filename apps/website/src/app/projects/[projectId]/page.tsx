import React, { cache } from "react";
import { queryProject } from "@repo/api/src/contentful/project/queries/queryProject";
import { contentfulClient } from "../../../utils/cms/server";
import { Header } from "../../../parts/Header/Header";
import { Footer } from "../../../parts/Footer/Footer";
import { ProjectCardTechList } from "../../../components/ProjectCard/ProjectCard.TechList";
import { assertDefined } from "@repo/util/src/assertDefined";
import { Metadata } from "next";
import { Asset } from "@repo/api/src/contentful";
import { ProjectCardTitle } from "../../../components/ProjectCard/ProjectCard.Title";
import {
  ProjectCardCarousel,
  ProjectCardCarouselDots,
  ProjectCardCarouselProvider
} from "../../../components/ProjectCard/ProjectCard.Carousel";
import { isDefined } from "@repo/util/src/isDefined";
import { ProjectCardLinks } from "../../../components/ProjectCard/ProjectCard.Links";
import { RichTextRender } from "@repo/ui/src/components/contentful/RichTextRender/RichTextRender";
import {
  ProjectCardCarouselButtonOpenInNewTab
} from "../../../components/ProjectCard/ProjectCardCarousel.ButtonOpenInNewTab";

type PageProps = {
  params: Promise<{ projectId: string }>
}

const getProject = cache((projectId: string) => queryProject(contentfulClient, projectId));

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { projectId } = await params;
  const project = await getProject(projectId);

  const keywords = [
    "portfolio",
    "project",
    project.fields.title,
  ];

  for (const tech of project.fields.technologies) {
    if (!tech) continue;
    keywords.push(tech.fields.name);
  }

  let mediaList = project.fields.mediaList?.filter(isDefined) ?? [];
  if (project.fields.thumbnail) {
    mediaList = [project.fields.thumbnail, ...mediaList];
  }

  return {
    title: project.fields.title,
    description: project.fields.description,
    keywords: keywords,
    openGraph: {
      images: mediaList
        .map((media) => {
          assertDefined(media.fields.file, "file is expected to be defined");
          return "https:" + media.fields.file.url;
        })
    }
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { projectId } = await params;
  const project = await getProject(projectId);
  const technologies = project.fields.technologies.map((tech) => {
    assertDefined(tech, "project tech not defined");
    return tech;
  });

  let mediaList: Array<Asset<"WITHOUT_UNRESOLVABLE_LINKS">> = project.fields.mediaList?.filter(isDefined) ?? [];
  if (project.fields.thumbnail) {
    mediaList = [project.fields.thumbnail, ...mediaList];
  }

  return (
    <div className="[--overlap:theme(spacing.96)] min-h-screen overflow-x-hidden">
      <Header
        className="pb-(--overlap)"
      >
        <div className="relative max-w-screen-2xl mx-auto px-6 py-12 space-y-4">
          <ProjectCardTitle
            as="h2"
            id={projectId}
            className="font-pixel text-6xl text-blue-500"
          >
            {project.fields.title}
          </ProjectCardTitle>
          <ProjectCardTechList
            id={projectId}
            className="max-w-screen-sm flex-wrap"
            technologies={technologies}
          />
          <p className="text-white max-w-screen-sm">{project.fields.description}</p>
          {!!project.fields.links && (
            <ProjectCardLinks
              links={project.fields.links}
            />
          )}
        </div>
      </Header>
      <main
        id="main"
        role="main"
        className="w-full max-w-screen-2xl mx-auto px-6 -mt-[var(--overlap)] space-y-12 py-12"
      >
        <ProjectCardCarouselProvider mediaList={mediaList}>
          <div className="relative aspect-video max-w-screen-md mx-auto">
            <ProjectCardCarousel
              id={project.sys.id}
              className="relative size-full"
              overflow
            />
            <ProjectCardCarouselButtonOpenInNewTab
              className="absolute bottom-4 right-4"
            />
          </div>
          <ProjectCardCarouselDots/>
        </ProjectCardCarouselProvider>
        <div className="max-w-screen-md px-0 md:px-12">
          {project.fields.content ? (
            <RichTextRender
              richTextDocument={project.fields.content}
            />
          ) : (
            <p>{project.fields.description}</p>
          )}
        </div>
        {!!project.fields.links && (
          <ProjectCardLinks
            className="justify-end px-0 md:px-12"
            links={project.fields.links}
          />
        )}
      </main>
      <Footer/>
    </div>
  );
}
