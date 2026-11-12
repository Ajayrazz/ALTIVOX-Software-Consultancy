import {
  Box, Stethoscope, GraduationCap, ShoppingBag, Receipt, Target, Bot, Truck, Building2, CalendarCheck,
  Workflow, Smartphone, LayoutTemplate, Code2, Globe, BrainCircuit, Sparkles, Layers, PlugZap, Cloud,
  PenTool, Compass, HeartPulse, ShoppingCart, Landmark, Store, Rocket, Briefcase, type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  box: Box, stethoscope: Stethoscope, "graduation-cap": GraduationCap, "shopping-bag": ShoppingBag,
  receipt: Receipt, target: Target, bot: Bot, truck: Truck, "building-2": Building2,
  "calendar-check": CalendarCheck, workflow: Workflow, smartphone: Smartphone,
  "layout-template": LayoutTemplate, "code-2": Code2, code: Code2, globe: Globe,
  "brain-circuit": BrainCircuit, sparkles: Sparkles, layers: Layers, "plug-zap": PlugZap, cloud: Cloud,
  "pen-tool": PenTool, compass: Compass, "heart-pulse": HeartPulse, "shopping-cart": ShoppingCart,
  landmark: Landmark, store: Store, rocket: Rocket, briefcase: Briefcase, building: Building2,
};

export function Icon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  const C = icons[name] ?? Box;
  return <C size={size} className={className} aria-hidden="true" />;
}
