// src/components/ui/meeting-button.jsx
import React from 'react';
import { cn } from "@/lib/utils";

const MeetingButton = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-8 py-3",
        "bg-[#0F172A] text-white hover:bg-[#1E293B] active:bg-[#0F172A]",
        "transition-colors duration-200",
        "text-sm font-medium",
        "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

MeetingButton.displayName = "MeetingButton";

export default MeetingButton ;