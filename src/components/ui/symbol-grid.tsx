// src/components/ui/symbol-grid.tsx
"use client";

import React, { JSX } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import { useSpeech } from "@/hooks/useSpeech";
import { useCollection } from "@/components/providers/collection-provider";
import type { Symbol, LayoutConfig, PositionedSymbol } from "@/types/symbols";
import {
  isIconSymbol,
  isImageSymbol,
  isPositionedSymbol,
} from "@/types/symbols";
import {
  Utensils,
  Coffee,
  Bath,
  Moon,
  HeartPulse,
  HelpCircle,
  Check,
  X,
  User,
  Users,
  Heart,
  School,
  UserCheck,
  Clock,
  Smile,
  Frown,
  AlertCircle,
  Angry,
  Brain,
  Battery,
  CircleDot,
  FlaskConical,
  Wine,
} from "lucide-react";

// Icon mapping for symbols
const iconMap: Record<
  string,
  React.ComponentType<{ size: number; className?: string }>
> = {
  Utensils,
  Coffee,
  Bath,
  Moon,
  HeartPulse,
  HelpCircle,
  Check,
  X,
  User,
  Users,
  Heart,
  School,
  UserCheck,
  Clock,
  Smile,
  Frown,
  AlertCircle,
  Angry,
  Brain,
  Battery,
  CircleDot,
  FlaskConical,
  Wine,
};

interface SymbolGridProps {
  symbols: Symbol[] | PositionedSymbol[];
  showLabels?: boolean;
  symbolSize?: "small" | "medium" | "large";
  className?: string;
  layout?: LayoutConfig;
}

const sizeClasses = {
  small: "grid-cols-6 gap-2",
  medium: "grid-cols-4 gap-4",
  large: "grid-cols-3 gap-6",
};

const symbolSizeClasses = {
  small: "h-16 w-16",
  medium: "h-24 w-24",
  large: "h-32 w-32",
};

const iconSizeMap = {
  small: 24,
  medium: 32,
  large: 48,
};

export function SymbolGrid({
  symbols,
  className,
  showLabels,
  symbolSize = "medium",
  layout,
}: SymbolGridProps) {
  const { addSymbolToMessage } = useCollection();
  const settings = useStore((state) => state.settings);
  const { speak } = useSpeech();

  // Helper function to determine if we're working with positioned symbols
  const hasPositionedSymbols =
    symbols.length > 0 && isPositionedSymbol(symbols[0]);

  // Get grid classes based on whether we have positioned symbols or not
  const getGridClasses = () => {
    if (hasPositionedSymbols && layout) {
      return `grid gap-2 grid-cols-${layout.columns}`;
    }
    return cn("grid w-full", sizeClasses[symbolSize], className);
  };

  const handleSymbolClick = (symbol: Symbol | PositionedSymbol) => {
    addSymbolToMessage(symbol);
    speak(symbol.text);
  };

  const renderSymbolContent = (
    symbol: Symbol | PositionedSymbol,
    size: number
  ): JSX.Element => {
    if (isIconSymbol(symbol)) {
      const IconComponent = iconMap[symbol.icon];

      if (!IconComponent) {
        return (
          <div
            className={cn(
              "flex items-center justify-center bg-muted rounded-md w-full h-full"
            )}
          >
            <span className="text-2xl font-bold">
              {symbol.text.charAt(0).toUpperCase()}
            </span>
          </div>
        );
      }

      return (
        <div className="flex items-center justify-center w-full h-full">
          <IconComponent size={size} className="text-primary" />
        </div>
      );
    }

    if (isImageSymbol(symbol)) {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <Image
            src={symbol.imageUrl}
            alt={symbol.text}
            width={size}
            height={size}
            className="object-contain rounded-md"
          />
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center bg-muted rounded-md w-full h-full">
        <span className="text-sm text-center px-2">
          {(symbol as Symbol).text}
        </span>
      </div>
    );
  };

  return (
    <div className={getGridClasses()}>
      {symbols.map((symbol) => {
        const style = isPositionedSymbol(symbol)
          ? {
              gridColumn: `span ${symbol.position.width}`,
              gridRow: `span ${symbol.position.height}`,
              gridColumnStart: symbol.position.x + 1,
              gridRowStart: symbol.position.y + 1,
            }
          : undefined;

        return (
          <Card
            key={symbol.id}
            className={cn(
              "flex flex-col items-center justify-center p-2 cursor-pointer hover:border-primary transition-colors"
            )}
            style={style}
            onClick={() => handleSymbolClick(symbol)}
          >
            <div
              className={cn(
                "relative flex items-center justify-center",
                symbolSizeClasses[symbolSize]
              )}
            >
              {renderSymbolContent(symbol, iconSizeMap[symbolSize])}
            </div>
            {(showLabels ?? settings.showLabels) && (
              <span className="mt-2 text-sm text-center font-medium">
                {symbol.text}
              </span>
            )}
          </Card>
        );
      })}
    </div>
  );
}
