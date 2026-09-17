export type StudioTab = "templates" | "text" | "shapes" | "uploads" | "elements";

export interface LayerInfo {
  id: string;
  name: string;
  type: string;
  visible: boolean;
  locked: boolean;
  selected: boolean;
}

/** Snapshot of the currently-selected object's editable properties, driving the right-hand panel. */
export interface SelectedObjectProps {
  id: string;
  type: string;
  isText: boolean;
  isShape: boolean;
  isImage: boolean;
  // Text
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string | number;
  fontStyle?: string;
  underline?: boolean;
  textAlign?: string;
  // Shared
  fill?: string;
  opacity?: number;
  // Shapes
  stroke?: string;
  strokeWidth?: number;
}
