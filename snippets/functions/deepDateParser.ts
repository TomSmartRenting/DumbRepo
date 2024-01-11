function isObjectNotDate(value: any): value is Record<string, unknown> {
  return (
    typeof value === "object" && value !== null && !(value instanceof Date)
  );
}
export function convertIsoDateStrings<T>(data: T): T {
  // Handle the case where data is a string and might be an ISO date
  if (typeof data === "string") {
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/.test(data)) {
      return new Date(data) as T;
    }

    return data;
  }

  // Handle the case where data is an array
  if (Array.isArray(data)) {
    return data.map((item) => convertIsoDateStrings(item)) as T;
  }

  // Handle the case where data is an object but not null or a Date instance
  if (isObjectNotDate(data)) {
    const newData = {} as any;
    Object.keys(data).forEach((key) => {
      const value = data[key];
      newData[key] = convertIsoDateStrings(value);
    });

    return newData as T;
  }

  // Return data as is for other types like number, null, etc.
  return data;
}
