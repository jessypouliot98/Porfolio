import clsx from "clsx";
import React from "react";
import Image from "next/image";
import { SkillCircleEntry, SkillRingEntry } from "@repo/api/src/contentful/skill-circle/model";
import { assertDefined } from "@repo/util/src/assertDefined";
import { TechnologyEntry } from "@repo/api/src/contentful/technology/model";
import { contentfulImageProps } from "../../utils/cms/client";

function getRingSize(ring: SkillRingEntry) {
  const conf = ring.fields.configuration;
  let sizeRing: string;
  if (typeof conf?.size?.ring === "string") {
    sizeRing = conf.size.ring;
  } else if (typeof conf?.size?.ring === "number") {
    sizeRing = `${conf.size.ring}px`;
  } else {
    sizeRing = "500px";
  }
  return sizeRing;
}

function getRingBubbleSize(ring: SkillRingEntry) {
  const conf = ring.fields.configuration;
  let sizeBubble: string;
  if (typeof conf?.size?.bubble === "string") {
    sizeBubble = conf.size?.bubble;
  } else if (typeof conf?.size?.bubble === "number") {
    sizeBubble = `${conf.size.bubble}px`;
  } else {
    sizeBubble = "4rem";
  }
  return sizeBubble;
}

function getRingSpinDuration(ring: SkillRingEntry) {
  const conf = ring.fields.configuration;
  let spinDuration: string;
  if (typeof conf?.spinDuration === "string") {
    spinDuration = conf.spinDuration;
  } else if (typeof conf?.spinDuration === "number") {
    spinDuration = `${conf.spinDuration}ms`;
  } else {
    spinDuration = "30s";
  }
  return spinDuration;
}

export type SkillSpinnerProps = {
  className?: string;
  skillCircle: SkillCircleEntry;
}

export function SkillSpinner({ className, skillCircle }: React.PropsWithChildren<SkillSpinnerProps>) {
  const firstRing = skillCircle.fields.rings.at(0);
  const ringSize = firstRing ? getRingSize(firstRing) : "0px";
  const bubbleSize = firstRing ? getRingBubbleSize(firstRing) : "0px";
  const cssVars: object = {
    "--spinner-size": `calc(${ringSize} - (${bubbleSize} / 2))`,
  }

  return (
    <div className={className}>
      <div
        className="relative size-(--spinner-size)"
        style={cssVars}
      >
        {skillCircle.fields.rings.map((ring, i) => {
          assertDefined(ring, "ring not defined");
          return (
            <SkillSpinner.Ring
              key={ring.sys.id}
              classNames={{
                ring: clsx(
                  (i & 1) === 0 ? "border-dashed border-orange-500/70" : "border-solid border-orange-500/30",
                  i < 2 ? "border-4" : "border-2"
                )
              }}
              ring={ring}
            />
          )
        })}
      </div>
    </div>
  )
}

export namespace SkillSpinner {

  export type RingProps = {
    className?: string;
    classNames?: Partial<Record<"container" | "ring" | "bubble", string>>;
    style?: React.CSSProperties;
    ring: SkillRingEntry;
  }

  export function Ring({ className, classNames, style, ring }: RingProps) {
    const skills = ring.fields.skills;
    const spinDuration = getRingSpinDuration(ring);
    const ringSize = getRingSize(ring);
    const bubbleSize = getRingBubbleSize(ring);
    const ringCssVars: object = {
      "--ring-size": ringSize,
      "--animation-duration": spinDuration,
    }

    return (
      <div
        className={clsx(
          "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2",
          classNames?.container,
          className,
        )}
        style={style}
      >
        <div
          className={clsx(
            "relative rounded-full animate-[spin_var(--animation-duration)_linear_infinite] size-(--ring-size)",
            classNames?.ring,
          )}
          style={ringCssVars}
        >
          {skills.map((skill, i) => {
            assertDefined(skill, "skill not defined");
            return (
              <Bubble
                key={skill.fields.slug}
                className={clsx(
                  "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2",
                  classNames?.bubble,
                )}
                offset={`calc(${ringSize} / 2)`}
                anglePercent={(i + 1) / skills.length}
                size={bubbleSize}
                technology={skill}
              />
            )
          })}
        </div>
      </div>
    )
  }

  export type BubbleProps = {
    className?: string;
    offset: number | string;
    anglePercent: number;
    size: number | string;
    technology: TechnologyEntry;
  }

  export function Bubble({ className, technology, size, offset, anglePercent }: BubbleProps) {
    const image = technology.fields.image;
    assertDefined(image, "skill image not defined");

    const offsetCss = typeof offset === "number" ? `${offset}px` : offset;
    const cssVars: object = {
      "--bubble-offset-x": `calc(${offsetCss} * sin(${anglePercent * 360}deg))`,
      "--bubble-offset-y": `calc(${offsetCss} * cos(${anglePercent * 360}deg))`,
      "--bubble-rotation": `${-anglePercent * 360 - 90}deg`,
      "--bubble-size": typeof size === "number" ? `${size}px` : size,
    };
    const customStyle: object | null = typeof technology.fields.extra?.skillSpinnerBubbleStyle === "object" ? technology.fields.extra?.skillSpinnerBubbleStyle : null;

    return (
      <div className={className}>
        <div
          className={clsx(
            "rounded-full p-2 size-(--bubble-size) shadow bg-white flex justify-center items-center overflow-hidden",
            "origin-center transform rotate-(--bubble-rotation) translate-y-(--bubble-offset-y) translate-x-(--bubble-offset-x)"
          )}
          style={cssVars}
        >
          <div className="w-full h-full" style={customStyle ?? undefined}>
            <div className="relative w-full h-full rounded-full">
              <Image
                className="block w-full h-full"
                {...contentfulImageProps(image)}
                loading="lazy"
                fill
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

}