"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Trophy, GitPullRequest, CheckCircle2, BookMarked, Flame } from "lucide-react";
import type { PRTrackerData } from "@/types/pr-tracker";

interface Props {
  data: PRTrackerData;
}

export function StatsGrid({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const stats = [
    {
      title: "TOTAL POINTS",
      value: data.totalPoints.toLocaleString(),
      subtitle: data.rank,
      icon: Trophy,
      iconColor: "text-green-500",
      accentColor: "border-l-green-500",
    },
    {
      title: "MERGED PRS",
      value: data.totalMergedGSSoC,
      subtitle: "GSSoC merged",
      icon: GitPullRequest,
      iconColor: "text-purple-500",
      accentColor: "border-l-purple-500",
    },
    {
      title: "APPROVED",
      value: data.totalApproved,
      subtitle: "gssoc:approved",
      icon: CheckCircle2,
      iconColor: "text-emerald-500",
      accentColor: "border-l-emerald-500",
    },
    {
      title: "REPOS",
      value: data.uniqueRepos,
      subtitle: "contributed to",
      icon: BookMarked,
      iconColor: "text-amber-500",
      accentColor: "border-l-amber-500",
    },
    {
      title: "STREAK",
      value: data.streak,
      subtitle: data.streak === 1 ? "day" : "days",
      icon: Flame,
      iconColor: "text-red-500",
      accentColor: "border-l-red-500",
    }
  ];

  const collapseCards = contextSafe(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".stat-card");
    if (!containerRef.current || cards.length === 0) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerCenterX = containerRect.width / 2;
    const containerCenterY = containerRect.height / 2;

    cards.forEach((card, i) => {
      // Temporarily remove transform to measure pure grid layout position
      gsap.set(card, { x: 0, y: 0, scale: 1 });
      
      const cardRect = card.getBoundingClientRect();
      // Calculate center of this specific card relative to the container
      const cardCenterX = (cardRect.left - containerRect.left) + cardRect.width / 2;
      const cardCenterY = (cardRect.top - containerRect.top) + cardRect.height / 2;
      
      const dx = containerCenterX - cardCenterX;
      const dy = containerCenterY - cardCenterY;
      
      const zIndex = 50 - i;
      const scale = 1 - (i * 0.06); // More prominent scale down
      const yOffset = i * 16; // Push down much more
      const xOffset = i * 8; // Slight horizontal offset to fan them out
      const rotate = i * (i % 2 === 0 ? -2 : 2); // Alternate rotation slightly
      
      gsap.to(card, {
        x: dx + xOffset,
        y: dy + yOffset,
        scale: scale,
        rotation: rotate,
        opacity: 1 - (i * 0.12),
        zIndex: zIndex,
        duration: 0.6,
        ease: "power3.inOut"
      });
    });
  });

  const expandCards = contextSafe(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".stat-card");
    gsap.to(cards, {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0, // Reset rotation back to straight grid
      opacity: 1,
      zIndex: 1,
      stagger: 0.03, // slight stagger for a cascading feel
      duration: 0.5, // slower duration for better feel
      ease: "back.out(1.1)"
    });
  });

  // Handle initialization and window resize for the collapsed state
  useGSAP(() => {
    if (isExpanded) {
      expandCards();
    } else {
      collapseCards();
    }
    
    const handleResize = () => {
      if (!isExpanded) collapseCards();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded]);

  const handleInteraction = () => {
    setIsExpanded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Set auto-collapse timer for 7 seconds
    timerRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 7000);
  };

  const handleMouseLeave = () => {
    // We only want it to collapse 7 seconds after interaction.
    // Do we reset on leave? "If within those 7seconds, the user don't hover again... pileup again"
    // Keeping the timer running. The interaction reset handles hovering again.
    // If they leave, the timer is already ticking. We can just let it run.
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      onMouseEnter={handleInteraction}
      onMouseLeave={handleMouseLeave}
      // For mobile tap
      onClick={handleInteraction} 
      // relative and min-h-[160px] to ensure the container doesn't collapse 
      // if all cards are position:absolute (though they aren't, they are just transformed)
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16 cursor-pointer relative"
    >
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div 
            key={idx} 
            className={`stat-card bg-pure-surface border border-whisper-border border-l-[3px] ${stat.accentColor} rounded-xl p-5 flex flex-col justify-between shadow-lg transition-shadow hover:shadow-xl group`}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1 rounded bg-canvas-night/50 border border-whisper-border">
                <Icon className={`w-3.5 h-3.5 ${stat.iconColor}`} />
              </div>
              <span className="font-mono text-[10px] font-bold text-muted-steel uppercase tracking-widest">{stat.title}</span>
            </div>
            <div>
              <h2 className="font-display text-4xl font-extrabold text-ghost-white mb-1.5">{stat.value}</h2>
              <span className="font-mono text-[11px] text-muted-steel block">{stat.subtitle}</span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
