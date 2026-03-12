import { LOCATIONS } from "@/lib/data";
import { makeMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/PageHero";
import { LocationCard } from "@/components/LocationCard";

export const metadata = makeMetadata({
  title: "Junk Removal Near Me | Portland Metro Area | The Junk Moose",
  description:
    "The Junk Moose serves 10 cities across the Portland metro area. Find fast, affordable junk removal near you — same-day service available in every location.",
  path: "/locations",
});

export default function LocationsPage() {
  return (
    <>
      <PageHero
        label="Service Areas"
        title="Junk Removal Near You"
        subtitle="We serve the entire Portland metro area — 10 cities, same-day service, upfront pricing. Find your city below."
      />

      <section className="bg-dark px-6 lg:px-10 py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto">
          <p className="font-satoshi text-stone-dim text-base sm:text-lg leading-relaxed max-w-3xl mb-12">
            The Junk Moose provides professional junk removal across the greater
            Portland metropolitan area. From furniture and appliance hauling to
            full property cleanouts, our crew is ready to serve your neighborhood
            with fast, reliable service and honest pricing.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {LOCATIONS.map((loc) => (
              <LocationCard
                key={loc.slug}
                city={loc.city}
                state={loc.state}
                slug={loc.slug}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
