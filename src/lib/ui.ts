/** Shared "press" feedback used on every clickable element in the design
 * (buttons, chips, tabs, list rows): a quick opacity dip + tiny scale-down. */
export const pressable =
  "transition-[transform,opacity] duration-150 active:scale-[0.99] active:opacity-[0.78] disabled:pointer-events-none disabled:opacity-50";
