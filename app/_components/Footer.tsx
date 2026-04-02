export default function Footer() {
  return (
    <footer className="border-t border-[#222222] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="anton text-lg text-[hsl(215,25%,70%)]">RP</span>
        <p className="text-xs text-[#444444]">
          © {new Date().getFullYear()} Ronaj Pradhan. All rights reserved.
        </p>
        <p className="text-xs text-[#444444]">Built with Next.js &amp; Tailwind CSS</p>
      </div>
    </footer>
  )
}
