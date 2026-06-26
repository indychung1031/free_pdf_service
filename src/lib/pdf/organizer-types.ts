export type OrganizerPage = {
  id: string;
  /** 0-based index in the original uploaded PDF */
  sourcePageIndex: number;
  rotation: 0 | 90 | 180 | 270;
};

export function createOrganizerPages(pageCount: number): OrganizerPage[] {
  return Array.from({ length: pageCount }, (_, index) => ({
    id: crypto.randomUUID(),
    sourcePageIndex: index,
    rotation: 0,
  }));
}

export function rotateClockwise(current: OrganizerPage["rotation"]): OrganizerPage["rotation"] {
  return ((current + 90) % 360) as OrganizerPage["rotation"];
}
