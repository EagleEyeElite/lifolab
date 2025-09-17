import Link from 'next/link';
import { notFound } from 'next/navigation';

enum AnimationMode {
  StartBig= "startBig",
  StartSmall = "startSmall",
  DontAnimate = "dontAnimate",
}

export default async function TestPage({params, searchParams}: {
  params: Promise<{ name: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    notFound();
  }

  const { name } = await params;
  // const resolvedSearchParams = await searchParams;
  // const paramAnimationMode = typeof resolvedSearchParams?.animationMode === "string"
  //   ? resolvedSearchParams.animationMode
  //   : null;

  if (name === 'blank') return <div />;
  if (name === 'id1') {
    return <Link href={`/test/id2?animationMode=${AnimationMode.DontAnimate}`}>Go to /test/id2</Link>;
  }
  if (name === 'id2') {
    return <Link href={`/test/id3?animationMode=${AnimationMode.StartSmall}`}>Go to /test/id3</Link>;
  }
  if (name === 'id3') {
    return <Link href={`/test/id1?animationMode=${AnimationMode.StartBig}`}>Go to /test/id1</Link>;
  }
  return <div className="w-full h-10 bg-secondary"/>;
}
