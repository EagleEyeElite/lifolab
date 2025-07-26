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
  const resolvedSearchParams = await searchParams;
  const fullNav = resolvedSearchParams?.fullNav === 'true';

  if (name === 'blank') {
    if (fullNav) {
      return <div className={"size-full bg-green-300"}/>;
    }
    return <div />
  }

  if (name === 'id1') {
    return <Link id="nav-link-id1" href="/test/id2">Go to /test/id2</Link>;
  }

  if (name === 'id2') {
    return <Link id="nav-link-id2" href="/test/id3">Go to /test/id1</Link>;
  }

  if (name === 'id3') {
    return <Link id="nav-link-id3" href="/test/id1">Go to /test/id1</Link>;
  }


  return <div className="bg-red-600"/>;
}
