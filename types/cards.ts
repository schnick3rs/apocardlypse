
export interface AbstractCard {

  id: number;

  layout: string;

  name: string;
  cost: number;
  text: string;

  tags: string[];

  stats: {
    ang: number | null;
    int: number | null;
    fok: number | null;
    aus: number | null;
  } | null;

  planning: number | null;

  sourceName: string;
  sourceLevel: number;
  sourceType: string;

  imageUrl: string;

}
