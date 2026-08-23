import { FloorPlan } from "@/components/tables/FloorPlan";

export const metadata = {
  title: "Table Floor Plan & Real-time Allocation | AURA Cafe",
  description:
    "Interactive 2D table grid and live seating management for AURA Roastery & Kitchen in Jhamsikhel, Lalitpur.",
};

export default function TablesPage() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <FloorPlan />
      </div>
    </main>
  );
}
