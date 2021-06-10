export function checkObjectHasProperty<T extends Record<string, any>>(
  obj: any,
  props: (keyof T)[]
) {
  return props.every((p) => obj[p] != undefined);
}
