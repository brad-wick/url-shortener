import UrlShortenerContainer from "@/components/url-shortener-container";

export default function Home() {
  return (
    <main className="mx-auto max-w-xl py-12 md:py-24 space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl md:text-5xl font-bold">URL Shortener</h1>
        <p className="text-gray-600">Shorten and share your URLs with ease!</p>
      </div>
      <UrlShortenerContainer></UrlShortenerContainer>
    </main>
  );
}
