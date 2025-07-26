import Link from 'next/link';

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
    return null;
  }

  const { name } = await params;

  if (name === 'blank') {
    const resolvedSearchParams = await searchParams;
    const paramAnimationMode = typeof resolvedSearchParams?.animationMode === "string"
      ? resolvedSearchParams.animationMode
      : null;

    const logoAnimationMode = paramAnimationMode && paramAnimationMode in AnimationMode
      ? AnimationMode[paramAnimationMode as keyof typeof AnimationMode]
      : null;

    if (logoAnimationMode) {
      return <div className="size-full bg-green-300" />;
    }
    return <div />;
  }

  if (name === 'id1') {
    return <Link href={`/test/id2?animationMode=${AnimationMode.DontAnimate}`}>Go to /test/id2</Link>;
  }

  if (name === 'id2') {
    return <Link href={`/test/id3?animationMode=${AnimationMode.StartSmall}`}>Go to /test/id3</Link>;
  }

  if (name === 'id3') {
    return <Link href={`/test/id1?animationMode=${AnimationMode.StartBig}`}>Go to /test/id1</Link>;
  }

  return <div className="bg-red-600"/>;
}
