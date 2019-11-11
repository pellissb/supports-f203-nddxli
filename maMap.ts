import {LogTests} from "./outils";

type MAP_FCT<T1, T2> = (e: T1, i: number, tab: T1[]) => T2;

function maMap<T1, T2>(tab: T1[], f: MAP_FCT<T1, T2>): T2[] {
  let tabMap: T2[] = [];
  tab.forEach((e, i, t) => tabMap[i] = f(e, i, t));
  // Ou bien :
  // tab.forEach( (e, i, t) => tabMap.push( f(e, i, t) ) );
  return tabMap;
}





















LogTests("Ma fonction de map", maMap, [
    {tab: [17, 27, 187], f: Math.abs},
    {tab: [17, -27, -187], f: Math.abs},
    {tab: [0, 1, 2, 3, 4, -5, -7], f: x => x * x},
    {tab: [], f: x => x * x},
].map( ({tab, f}) => ({
  args: [tab, f],
  expectedResult: tab.map(f)
}))

);
