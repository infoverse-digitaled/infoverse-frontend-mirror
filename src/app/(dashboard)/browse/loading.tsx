export default function BrowseLoading() {
  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-dark mb-1 sm:mb-2">
          Browse Curriculum
        </h1>
        <p className="text-sm sm:text-base text-gray-500">
          Explore our comprehensive collection of subjects and lessons.
        </p>
      </div>

      <div className="flex flex-wrap gap-3" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-[52px] w-32 rounded-xl bg-gray-100 animate-pulse" />
        ))}
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        aria-busy="true"
        aria-label="Loading subjects"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-56 rounded-xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
