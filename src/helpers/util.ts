type ValueOf<T> = T[keyof T]

export function excludeByFirstLetter<T extends object>(
  arr: T[],
  excludes: string[],
  filterBy: keyof T
): T[] {
  if (!arr.every((item) => Object.keys(item).includes(filterBy as string)))
    throw new Error("filterBy key is not valid in this Object");
  const exclusion = arr.filter((item: T) => {
    return excludes.some(
      (pattern) =>
        (item as any)[filterBy][0].toLowerCase() === pattern.toLowerCase()
    );
  });
  const filtered = arr.filter((val) => !exclusion.includes(val));
  return filtered;
}
export function regexID(url: string) {
  const regexMatch = url.match(/\/people\/(\d+)\//);
  if (regexMatch) {
    const ID: unknown = regexMatch?.[0] as unknown;
    return ID;
  }
}
export function countMatches<T extends object>(
  arr: T[],
  param: ValueOf<T>,
  filterBy: keyof T
): number {
  const count = arr.filter((item: T) => item[filterBy] === param).length;
  return count;
}
