export default function TestLayoutPage() {
  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return <div />;
}
