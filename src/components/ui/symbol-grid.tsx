"use client";

import React, { JSX } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { useStore } from "@/lib/store";
import { useSpeech } from "@/hooks/useSpeech";
import { useCollection } from "@/components/providers/collection-provider";
import type { Symbol } from "@/types/symbols";
import { isIconSymbol, isImageSymbol } from "@/types/symbols";
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
  Beef,
  Fish,
  Wine,
} from "lucide-react";

// Icon mapping for symbols
const iconMap: Record<string, React.ComponentType<any>> = {
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
  Beef,
  Fish,
  Wine,
};

interface SymbolGridProps {
  symbols: Symbol[];
  showLabels?: boolean;
  symbolSize?: "small" | "medium" | "large";
  className?: string;
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
}: SymbolGridProps) {
  const { addSymbolToMessage } = useCollection();
  const settings = useStore((state) => state.settings);
  const { speak } = useSpeech();

  const handleSymbolClick = (symbol: Symbol) => {
    addSymbolToMessage(symbol);
    speak(symbol.text);
  };

  const renderSymbolContent = (symbol: Symbol, size: number): JSX.Element => {
    if (isIconSymbol(symbol)) {
      const IconComponent = iconMap[symbol.icon];

      if (!IconComponent) {
        // Fallback for unknown icons - displays first letter
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
          <img
            src={symbol.imageUrl}
            alt={symbol.text}
            className="w-full h-full object-contain rounded-md"
          />
        </div>
      );
    }

    // Fallback for unknown symbol types
    return (
      <div className="flex items-center justify-center bg-muted rounded-md w-full h-full">
        <span className="text-sm text-center px-2">
          {(symbol as Symbol).text}
        </span>
      </div>
    );
  };

  return (
    <div className={cn("grid w-full", sizeClasses[symbolSize], className)}>
      {symbols.map((symbol) => (
        <Card
          key={symbol.id}
          className={cn(
            "flex flex-col items-center justify-center p-2 cursor-pointer hover:border-primary transition-colors"
          )}
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
      ))}
    </div>
  );
}
