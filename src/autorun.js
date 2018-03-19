import { dependences } from "./dependencesCollector";

export const autorun = (func) => {
  dependences.dependencesCollectStart(func);
  func();
  dependences.dependencesCollectEnd();
};