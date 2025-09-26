import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showSparkles?: boolean;
}

export const ProgressBar = ({ value, max = 100, className, showSparkles = false }: ProgressBarProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(value);
    }, 100);

    return () => clearTimeout(timer);
  }, [value]);

  const percentage = Math.min((animatedValue / max) * 100, 100);

  return (
    <div className={cn("relative w-full bg-muted rounded-full overflow-hidden", className)}>
      <div
        className="h-full bg-gradient-to-r from-primary to-profile-glow transition-all duration-1000 ease-out relative"
        style={{ width: `${percentage}%` }}
      >
        {showSparkles && percentage > 10 && (
          <Sparkles className="absolute right-1 top-1/2 transform -translate-y-1/2 h-3 w-3 text-white sparkle-animation" />
        )}
      </div>
    </div>
  );
};