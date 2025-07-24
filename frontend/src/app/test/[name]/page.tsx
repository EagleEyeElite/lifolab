import Link from 'next/link';

export default async function TestPage({params, searchParams}: {
  params: Promise<{ name: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const { name } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const fullNav = resolvedSearchParams?.fullNav === 'true';

  if (name === 'blank') {
    return <div />;
  }

  if (name === 'text') {
    return <p>test</p>;
  }

  if (name === 'id1') {
    return <Link id="nav-link-id1" href="/test/id2?fullNav=true">Go to /test/id2?fullNav=true</Link>;
  }

  if (name === 'id2') {
    return <Link id="nav-link-id2" href="/test/id1?fullNav=false">Go to /test/id1?fullNav=false</Link>;
  }

  return <div className="bg-red-600"/>;
}
