import { setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="p-8">
      <h1 className="font-bold text-2xl">e-manager</h1>
    </main>
  );
}
