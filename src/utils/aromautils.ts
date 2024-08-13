import { AromaProps, AromaLabels, AromaName, Aroma } from '@/types/Aroma';

export function createAromaList(selectedAromas: AromaName[] = []): AromaProps[] {
  return Object.entries(AromaLabels).map(([eng, kor]) => ({
    name: {
      eng: eng as AromaName,
      kor: kor,
    },
    selected: selectedAromas.includes(eng as AromaName),
  }));
}

/*
{
  name {
    eng : "cherry",
    kor : "체리",
  }
    selected : false,
}
*/
