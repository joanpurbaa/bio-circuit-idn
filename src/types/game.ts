export interface Organ {
  id: string;
  name: string;
  icon: string;
  zoneId: string;
  description: string;
}

export interface DropZone {
  id: string;
  x: number;
  y: number;
  label: string;
}

export interface LevelConnection {
  from: string;
  to: string;
  label: string;
}

export interface LevelEducation {
  title: string;
  description: string;
  facts: string[];
}

export interface Level {
  id: number;
  name: string;
  description: string;
  systemColor: string;
  icon: string;
  organs: Organ[];
  zones: DropZone[];
  connections: LevelConnection[];
  education: LevelEducation;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface LevelResult {
  stars: number;
  bestTime: number;
}
