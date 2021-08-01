export type idsMap = 'SB' | 'LD' | 'DS';

export type Coords = [number, number];

export type Map = {
  id: idsMap;
  image: {
    width: number;
    height: number;
    path: string;
  };
  levels: {
    org: number;
    max: number;
    min: number;
    default: number;
  };
  width: number;
  height: number;
  center: Coords;
  padding: number;
};
