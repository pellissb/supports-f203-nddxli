import {LogTests} from "./outils";

type MAP_FILTER<T1> = (e: T1, i: number, tab: T1[]) => boolean;

function monFilter<T1>(tab: T1[], f: MAP_FILTER<T1>): T1[] {
  const tabFiltre: T1[] = [];
  for(let i = 0; i < tab.length; i++) {
    const e = tab[i];
    if ( f(e, i, tab) ) {
      tabFiltre.push( e );
    }
  }
  return tabFiltre;
}










LogTests("Ma fonction de filtre", monFilter, [
    {tab: [17, 27, 187], f: (x, i) => i % 2 === 0 },
    {tab: [17, -27, -187], f: x => false},
    {tab: [0, 1, 2, 3, 4, -5, -7], f: x => x < 0 },
    {tab: [], f: x => true},
    {tab: [1, 2, 3], f: (x, i, t) => t.length > 0},
].map( ({tab, f}) => ({
  args: [tab, f],
  expectedResult: tab.filter(f)
}))

);
