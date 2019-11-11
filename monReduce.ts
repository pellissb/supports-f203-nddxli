import {LogTests} from "./outils";

type REDUCE_FCT<T1, T2> = (acc: T2, e: T1, i: number, tab: T1[]) => T2;

function monReduce1<T1>(tab: T1[], f: REDUCE_FCT<T1, T1>): T1 {
  // Utilisez l'instruction throw pour lancer une erreur le cas échéant
  if (tab.length === 0) {
    throw "TypeError: Reduce of empty array with no initial value";
  }
  let acc = tab[0];
  for (let i = 1; i < tab.length; i++) {
    const e = tab[i];
    acc = f(acc, e, i, tab);
  }
  return acc;
}
function monReduce2<T1, T2>(tab: T1[], f: REDUCE_FCT<T1, T2>, init: T2): T2 {
  let acc = init;
  for (let i = 0; i < tab.length; i++) {
    const e = tab[i];
    acc = f(acc, e, i, tab);
  }
  return acc;
}


function monReduce<T1>    (tab: T1[], f: REDUCE_FCT<T1, T1>): T1;
function monReduce<T1>    (tab: T1[], f: REDUCE_FCT<T1, T1>, init: T1): T1;
function monReduce<T1, T2>(tab: T1[], f: REDUCE_FCT<T1, T2>, init: T2): T2;
function monReduce<T1, T2>(tab: T1[], f: REDUCE_FCT<T1, T1> | REDUCE_FCT<T1, T2> , init?: T2) {
  return typeof init === 'undefined' ? monReduce1(tab, f as REDUCE_FCT<T1, T1>) : monReduce2(tab, f as REDUCE_FCT<T1, T2>, init);
}







LogTests("Ma fonction de reduce", monReduce, [
    {tab: [17, 27, 187], f: (acc, x) => acc + x},
    {tab: [17, -27, -187], f: (acc, x) => `${acc}${x}`, init: ''},
    {tab: [0, 1, 2, 3, 4, -5, -7], f: (acc, x) => acc + x * x},
    {tab: [], f: x => x * x, init: ''},
    {tab: [], f: x => x * x},
    {tab: [1, 2, 3], f: (acc, x) => [...acc, [1, 2, 3]], init: []},
    {tab: [0, 1, 2, 3], f: (acc, x, i, t) => [...acc, i % 2 ? t : i], init: []},
].map( ({tab, f, init}) => {
  let res; let errorExpected: boolean;
  try {
    res = typeof init === 'undefined' ? tab.reduce(f) : tab.reduce(f, init);
    errorExpected = false;
  } catch (err) {
    res = err.toString();
    errorExpected = true;
  }
  return {
    args: [tab, f, init],
    expectedResult: res,
    errorExpected
  }
})

);
