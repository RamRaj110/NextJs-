Server-side pre-rendering
Next.js server pe React page ka HTML pehle se bana deta hai.
Browser ko ready-made HTML milta hai → fast load + SEO friendly.

Client component vs server component
By default component server pe run hota hai.
Agar hooks / browser APIs use karne hai → "use client" likho top pe.

Dynamic routes
Agar URL ka part dynamic chahiye:
app/dashboard/user/[id]/page.tsx → /dashboard/user/3
Folder name [id] ⇒ params.id.

New Next.js 16 params rule
params ab Promise hai.
Isliye:
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
};