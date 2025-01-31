export function SocialLinksLayout({ children }: React.PropsWithChildren) {
  return (
    <menu className="flex text-xl px-6 gap-4">
      {children}
    </menu>
  )
}