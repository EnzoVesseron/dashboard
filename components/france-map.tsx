"use client";

import { useMemo, useState } from "react";

interface Region {
  id: string;
  name: string;
  percentage: number;
}

interface FranceMapProps {
  regions: Region[];
}

export function FranceMap({ regions }: FranceMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const maxPercentage = useMemo(() => {
    return Math.max(...regions.map(r => r.percentage));
  }, [regions]);

  const getRegionColor = (percentage: number, isHovered: boolean) => {
    const intensity = (percentage / maxPercentage) * 0.8 + 0.2;
    return isHovered 
      ? `hsl(var(--primary) / ${Math.min(intensity + 0.2, 1)})`
      : `hsl(var(--primary) / ${intensity})`;
  };

  const getRegionData = (id: string) => {
    return regions.find(r => r.id === id);
  };

  return (
    <svg
      viewBox="0 0 600 600"
      className="w-full h-full"
      fill="none"
      stroke="hsl(var(--border))"
      strokeWidth="1"
    >
      {/* Hauts-de-France */}
      <path
        id="hdf"
        d="M300,50 L380,40 L420,70 L400,110 L350,130 L320,120 L280,90 Z"
        fill={getRegionColor(getRegionData("hdf")?.percentage || 0, hoveredRegion === "hdf")}
        onMouseEnter={() => setHoveredRegion("hdf")}
        onMouseLeave={() => setHoveredRegion(null)}
        className="transition-colors duration-200 cursor-pointer hover:opacity-90"
      />
      
      {/* Île-de-France */}
      <path
        id="idf"
        d="M320,120 L350,130 L370,150 L350,180 L310,170 L290,140 Z"
        fill={getRegionColor(getRegionData("idf")?.percentage || 0, hoveredRegion === "idf")}
        onMouseEnter={() => setHoveredRegion("idf")}
        onMouseLeave={() => setHoveredRegion(null)}
        className="transition-colors duration-200 cursor-pointer hover:opacity-90"
      />
      
      {/* Grand Est */}
      <path
        id="ges"
        d="M350,130 L400,110 L420,70 L480,100 L500,140 L470,180 L370,150 Z"
        fill={getRegionColor(getRegionData("ges")?.percentage || 0, hoveredRegion === "ges")}
        onMouseEnter={() => setHoveredRegion("ges")}
        onMouseLeave={() => setHoveredRegion(null)}
        className="transition-colors duration-200 cursor-pointer hover:opacity-90"
      />
      
      {/* Normandie */}
      <path
        id="nor"
        d="M200,100 L280,90 L320,120 L290,140 L250,150 L220,130 L180,120 Z"
        fill={getRegionColor(getRegionData("nor")?.percentage || 0, hoveredRegion === "nor")}
        onMouseEnter={() => setHoveredRegion("nor")}
        onMouseLeave={() => setHoveredRegion(null)}
        className="transition-colors duration-200 cursor-pointer hover:opacity-90"
      />
      
      {/* Bretagne */}
      <path
        id="bre"
        d="M120,120 L180,120 L220,130 L200,160 L150,170 L100,140 Z"
        fill={getRegionColor(getRegionData("bre")?.percentage || 0, hoveredRegion === "bre")}
        onMouseEnter={() => setHoveredRegion("bre")}
        onMouseLeave={() => setHoveredRegion(null)}
        className="transition-colors duration-200 cursor-pointer hover:opacity-90"
      />
      
      {/* Pays de la Loire */}
      <path
        id="pdl"
        d="M200,160 L220,130 L250,150 L290,140 L310,170 L270,210 L210,190 Z"
        fill={getRegionColor(getRegionData("pdl")?.percentage || 0, hoveredRegion === "pdl")}
        onMouseEnter={() => setHoveredRegion("pdl")}
        onMouseLeave={() => setHoveredRegion(null)}
        className="transition-colors duration-200 cursor-pointer hover:opacity-90"
      />
      
      {/* Centre-Val de Loire */}
      <path
        id="cvl"
        d="M310,170 L350,180 L340,230 L300,250 L270,210 Z"
        fill={getRegionColor(getRegionData("cvl")?.percentage || 0, hoveredRegion === "cvl")}
        onMouseEnter={() => setHoveredRegion("cvl")}
        onMouseLeave={() => setHoveredRegion(null)}
        className="transition-colors duration-200 cursor-pointer hover:opacity-90"
      />
      
      {/* Bourgogne-Franche-Comté */}
      <path
        id="bfc"
        d="M350,180 L370,150 L470,180 L450,230 L400,260 L340,230 Z"
        fill={getRegionColor(getRegionData("bfc")?.percentage || 0, hoveredRegion === "bfc")}
        onMouseEnter={() => setHoveredRegion("bfc")}
        onMouseLeave={() => setHoveredRegion(null)}
        className="transition-colors duration-200 cursor-pointer hover:opacity-90"
      />
      
      {/* Nouvelle-Aquitaine */}
      <path
        id="naq"
        d="M210,190 L270,210 L300,250 L280,330 L230,370 L190,340 L160,270 Z"
        fill={getRegionColor(getRegionData("naq")?.percentage || 0, hoveredRegion === "naq")}
        onMouseEnter={() => setHoveredRegion("naq")}
        onMouseLeave={() => setHoveredRegion(null)}
        className="transition-colors duration-200 cursor-pointer hover:opacity-90"
      />
      
      {/* Auvergne-Rhône-Alpes */}
      <path
        id="ara"
        d="M340,230 L400,260 L450,230 L480,270 L460,330 L400,350 L350,310 L300,250 Z"
        fill={getRegionColor(getRegionData("ara")?.percentage || 0, hoveredRegion === "ara")}
        onMouseEnter={() => setHoveredRegion("ara")}
        onMouseLeave={() => setHoveredRegion(null)}
        className="transition-colors duration-200 cursor-pointer hover:opacity-90"
      />
      
      {/* Occitanie */}
      <path
        id="occ"
        d="M230,370 L280,330 L350,310 L400,350 L380,410 L320,430 L260,410 Z"
        fill={getRegionColor(getRegionData("occ")?.percentage || 0, hoveredRegion === "occ")}
        onMouseEnter={() => setHoveredRegion("occ")}
        onMouseLeave={() => setHoveredRegion(null)}
        className="transition-colors duration-200 cursor-pointer hover:opacity-90"
      />
      
      {/* Provence-Alpes-Côte d'Azur */}
      <path
        id="pac"
        d="M400,350 L460,330 L490,350 L470,390 L380,410 Z"
        fill={getRegionColor(getRegionData("pac")?.percentage || 0, hoveredRegion === "pac")}
        onMouseEnter={() => setHoveredRegion("pac")}
        onMouseLeave={() => setHoveredRegion(null)}
        className="transition-colors duration-200 cursor-pointer hover:opacity-90"
      />
      
      {/* Corse */}
      <path
        id="cor"
        d="M510,370 L530,360 L540,380 L530,400 L510,390 Z"
        fill={getRegionColor(getRegionData("cor")?.percentage || 0, hoveredRegion === "cor")}
        onMouseEnter={() => setHoveredRegion("cor")}
        onMouseLeave={() => setHoveredRegion(null)}
        className="transition-colors duration-200 cursor-pointer hover:opacity-90"
      />

      {/* Noms des régions */}
      {hoveredRegion && (
        <g className="pointer-events-none">
          <rect
            x="250"
            y="520"
            width="300"
            height="30"
            rx="4"
            fill="hsl(var(--card))"
            className="shadow-sm"
          />
          <text
            x="400"
            y="540"
            textAnchor="middle"
            className="text-[14px] fill-current"
          >
            {getRegionData(hoveredRegion)?.name} ({getRegionData(hoveredRegion)?.percentage}%)
          </text>
        </g>
      )}
    </svg>
  );
}