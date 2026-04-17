import Link from "next/link";

const contentSections = [
  { title: "Hero Banner", description: "Manage homepage hero banner images and CTAs", items: 3, href: "#" },
  { title: "Editor's Picks", description: "Curate featured products for the editor's picks section", items: 8, href: "#" },
  { title: "Trending Products", description: "Manage trending products carousel", items: 12, href: "#" },
  { title: "Most Popular", description: "Configure most popular products grid", items: 10, href: "#" },
  { title: "Store Categories", description: "Manage category tiles on the homepage", items: 6, href: "#" },
  { title: "Styling Videos", description: "Add and manage styling video content", items: 4, href: "#" },
];

export default function AdminContentPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#111111]">Content</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage homepage and storefront content sections</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {contentSections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="bg-white rounded-xl border border-gray-100 p-5 hover:border-gray-200 hover:shadow-sm transition-all group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#111111] group-hover:text-[#6a7f38] transition-colors">{section.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{section.description}</p>
              </div>
              <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full shrink-0">
                {section.items} items
              </span>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#6a7f38]">
              Manage
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
