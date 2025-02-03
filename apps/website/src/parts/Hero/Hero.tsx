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
          I’m passionate about building robust, scalable applications that push the limits of what’s possible. From designing efficient backend systems to developing seamless, high-performance user interfaces, I enjoy tackling complex challenges across the stack.
        </p>
        <p>
          I’m always eager to learn and experiment with new technologies, frameworks, and programming languages. Right
          now, I’m diving into <a className="underline text-orange-500"
                                  href="https://github.com/jessypouliot98?tab=repositories&q=&type=&language=zig&sort="
                                  target="_blank" rel="noreferrer noopener">Zig</a> and refining my skills to stay at
          the forefront of modern development.
        </p>
      </div>
    </div>
  )
}