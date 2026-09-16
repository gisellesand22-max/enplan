const MAP_AREAS = {
  centro: [
    "3535-7170", "3536-7170", "3537-7170",
    "3535-7171", "3536-7171", "3537-7171",
    "3535-7172", "3536-7172", "3537-7172",
  ],
  norte: [
    "3539-7167", "3540-7167", "3541-7167",
    "3539-7168", "3540-7168", "3541-7168",
    "3539-7169", "3540-7169", "3541-7169",
  ],
  sur: [
    "3531-7173", "3532-7173", "3533-7173",
    "3531-7174", "3532-7174", "3533-7174",
    "3531-7175", "3532-7175", "3533-7175",
  ],
} as const;

export type MapArea = keyof typeof MAP_AREAS;

export function MapBackdrop({
  blur = 5,
  area = "centro",
}: {
  blur?: number;
  area?: MapArea;
}) {
  const tiles = MAP_AREAS[area];
  return (
    <div className="pointer-events-none fixed left-1/2 top-0 bottom-0 z-0 w-full max-w-[430px] -translate-x-1/2 overflow-hidden">
      <div
        className="absolute inset-0 grid scale-110 grid-cols-3 grid-rows-3"
        style={{ filter: `blur(${blur}px)` }}
      >
        {tiles.map((t) => (
          <img
            key={t}
            src={`/assets/map/tile-${t}.png`}
            alt=""
            className="h-full w-full object-cover"
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F3]/10 via-[#FAF8F3]/35 to-[#FAF8F3]/85" />
    </div>
  );
}
