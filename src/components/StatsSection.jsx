import React from 'react';
import { motion } from 'framer-motion';
import { Search, Target, Zap, CheckCircle } from 'lucide-react';

const stats = [
  {
    value: "Get Listed on Our Platforms",
    label: "Step 1",
    description: "Add your business to TopTours.ai, ArubaBuddies, and other platforms. Travelers discover you when they're actively planning their trip.",
    icon: <Search className="w-8 h-8 text-[#09294c]" />
  },
  {
    value: "Track Where Guests Come From",
    label: "Step 2",
    description: "Use BiteReserve to see which sources actually send diners. Know what works instead of guessing.",
    icon: <Target className="w-8 h-8 text-[#09294c]" />
  },
  {
    value: "Optimize Your Online Presence",
    label: "Step 3",
    description: "MyGoProfile helps you manage and optimize your Google Business Profile for better local search visibility.",
    icon: <CheckCircle className="w-8 h-8 text-[#09294c]" />
  },
  {
    value: "See Results & Make Decisions",
    label: "Step 4",
    description: "All products work together to give you visibility, tracking, and optimization. You see what's working and can focus on what matters.",
    icon: <Zap className="w-8 h-8 text-[#09294c]" />
  }
];

const StatsSection = () => {
  return null;
};

export default StatsSection;
