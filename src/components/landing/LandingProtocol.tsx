import React from "react";
import { LANDING_PROTOCOL } from "@/data/mockData";

export interface LandingProtocolProps {}

export function LandingProtocol({}: Readonly<LandingProtocolProps>) {
  return (
    <section className="py-16 bg-white border-y border-whisper-border">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <h2 className="font-display text-[32px] font-bold mb-4 text-on-background leading-[1.2]">
              Deployment Protocol
            </h2>
            <p className="text-muted-steel font-sans text-base">
              Three stages to formalize your participation in the program.
            </p>
          </div>
          <div className="md:w-2/3 space-y-16">
            {LANDING_PROTOCOL.map((step, index) => (
              <div key={step.step} className="flex gap-8 group">
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-12 h-12 flex items-center justify-center font-display text-2xl font-bold shrink-0 transition-colors ${
                      index === 0 
                        ? "border border-primary text-primary group-hover:bg-primary group-hover:text-white" 
                        : "border border-whisper-border text-on-surface group-hover:border-primary group-hover:text-primary"
                    }`}
                  >
                    {step.step}
                  </div>
                  {index < LANDING_PROTOCOL.length - 1 && (
                    <div className="w-[1px] h-full bg-whisper-border my-2"></div>
                  )}
                </div>
                <div className={index < LANDING_PROTOCOL.length - 1 ? "pb-8" : ""}>
                  <h4 className="font-display text-[32px] font-bold mb-2 text-on-background leading-[1.2]">{step.title}</h4>
                  <p className="text-muted-steel max-w-md font-sans text-base leading-[1.6]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
