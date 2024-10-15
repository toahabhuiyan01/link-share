// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deepCompare(value1: any, value2: any): boolean {
  // Check if both are strictly equal (covers primitives and reference equality)
  if (value1 === value2) {
    return true;
  }

  // Check if either value is null or not an object (primitives that are not strictly equal)
  if (value1 === null || value2 === null || typeof value1 !== 'object' || typeof value2 !== 'object') {
    return false;
  }

  // Handle Date comparison
  if (value1 instanceof Date && value2 instanceof Date) {
    return value1.getTime() === value2.getTime();
  }

  // Handle Array comparison
  if (Array.isArray(value1) && Array.isArray(value2)) {
    if (value1.length !== value2.length) {
      return false;
    }
    return value1.every((item, index) => deepCompare(item, value2[index]));
  }

  // Handle Object comparison
  const keys1 = Object.keys(value1);
  const keys2 = Object.keys(value2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  return keys1.every(key => value2.hasOwnProperty(key) && deepCompare(value1[key], value2[key]));
}
