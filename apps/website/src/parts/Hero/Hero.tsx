export function Hero() {
  return (
    <div className="py-12 text-white space-y-8">
      <div className="max-w-xl leading-none">
        <h1 className="font-pixel text-3xl">
          <span className="text-orange-400 text-[2em]">Hello!</span> I'm Jessy Pouliot,
        </h1>
        <h2 className="font-pixel text-5xl text-blue-500">
          FullStack TypeScript Developer
        </h2>
        <h3 className="text-sm text-blue-200 text-right pr-12">
          and aspiring general purpose developer
        </h3>
      </div>
      <div className="space-y-2 max-w-2xl">
        <p>
          I’m passionate about writing code that pushes boundaries.
          Whether it’s crafting high-performance websites and apps or building impressive user experiences that make you
          go <span className="font-pixel text-orange-500 inline-block scale-150 px-1.5">WOW!</span>
        </p>
        <p>
          I’m constantly eager to learn and dive into new technologies, frameworks, and programming languages. Right
          now, I’m exploring <a className="underline text-orange-500"
                                href="https://github.com/jessypouliot98?tab=repositories&q=&type=&language=zig&sort="
                                target="_blank" rel="noreferrer noopener">Zig</a> and sharpening my skills.
        </p>
      </div>
    </div>
  )
}