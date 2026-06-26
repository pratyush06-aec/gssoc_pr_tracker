"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export function LiveClock() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    // Format the date like "26 Jun, 10:42 pm"
    const updateTime = () => {
      const now = new Date();
      
      const day = now.getDate();
      const month = now.toLocaleString("en-GB", { month: "short" }); // e.g., "Jun"
      
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const minsStr = minutes < 10 ? `0${minutes}` : minutes.toString();
      
      setTimeStr(`${day} ${month}, ${hours}:${minsStr} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 60); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden xl:flex items-center gap-2 text-xs text-muted-steel mr-2">
      <Clock className="w-3.5 h-3.5" />
      <span>{timeStr || "Live Sync"}</span>
    </div>
  );
}
