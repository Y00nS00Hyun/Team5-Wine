import { AromaProps, AromaLabels, AromaName } from '@/types/Aroma';

export function createAromaList(selectedAromas: AromaName[] = []): AromaProps[] {
  return Object.entries(AromaLabels).map(([eng, kor]) => ({
    name: {
      eng: eng as AromaName,
      kor,
    },
    selected: selectedAromas.includes(eng as AromaName),
  }));
}
