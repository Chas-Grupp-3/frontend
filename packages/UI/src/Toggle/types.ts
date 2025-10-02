import type { IconName } from "../iconMap";

export interface ToggleOption {
  value: string;
  icon: IconName;
  label?: string;
  count?: number;
}
