type UseFetchOptionsType = Omit<RequestInit, 'body'> | undefined;

export const handleFetchRequest = async (url: string, options?: UseFetchOptionsType, body?: any) => {
  let loading = false;
  let data: any;
  let error: Error | null = null;
  let defaultOptions: RequestInit = {
    ...options,
    method: options?.method ? options?.method : "GET",
    headers: {
      ...options?.headers,
      ["Content-Type"]: "application/json",
    },
  }

  if (body) {
    defaultOptions = {
      ...defaultOptions,
      body: JSON.stringify(body),
    };
  }

  try {
    loading = true;
    const fetchResponse = await fetch(url, defaultOptions);
    const parsedResponse = await fetchResponse.json();
    if (parsedResponse.statusCode && parsedResponse.message) {
      throw new Error(parsedResponse.message);
    }
    if (!parsedResponse.success && parsedResponse.error) {
      throw new Error(parsedResponse.error.message);
    }
    data = parsedResponse.data;
  } catch (err) {
    error = err as Error;
  } finally {
    loading = false;
  }

  return { loading, data, error };
}

const makeFetchRequest = async (url: string, options: RequestInit, loading: boolean, data: any, error: Error | null) => {
  try {
    loading = true;
    const fetchResponse = await fetch(url, options);
    const parsedResponse = await fetchResponse.json()
    if (parsedResponse.statusCode && parsedResponse.message) {
      throw new Error(parsedResponse.message);
    }
    if (!parsedResponse.success && parsedResponse.error) {
      throw new Error(parsedResponse.error.message);
    }
    data = parsedResponse.data;
  } catch (err) {
    error = err as Error;
  } finally {
    loading = false;
  }
}

export const stringListToArray = (stringList: string | string[] | undefined) => {
  if (stringList) {
    if (Array.isArray(stringList)) return stringList;
    const arrayOfStrings = stringList.split(",");
    const singlelistItem = [stringList];
    return stringList.includes(",") ? arrayOfStrings : singlelistItem;
  } else {
    return [];
  }
};

export const notArrayAndTruthy = (
  value: string | string[] | undefined,
  replacementValue: string
) => (value && !Array.isArray(value) ? value : replacementValue);

type ObjectType = {
  [key: string]: any;
}

export const isObjectsDeepEqual = (objectOne: ObjectType, objectTwo: ObjectType): boolean => {
  if(!objectOne || !objectTwo) return false;
  const objectOneKeys = Object.keys(objectOne);
  const objectTwoKeys = Object.keys(objectTwo);
  if (objectOneKeys.length !== objectTwoKeys.length) return false;
  for (const key of objectOneKeys) {
    const objectOneValue = objectOne[key];
    const objectTwoValue = objectTwo[key];
    if (objectTwoValue === null || objectTwoValue === undefined) return false;
    if (isPrimitive(objectOneValue, objectTwoValue) && objectOneValue !== objectTwoValue) return false;
    if (isObjects(objectOneValue, objectTwoValue) && !isObjectsDeepEqual(objectOneValue, objectTwoValue)) return false;
    if (isArrays(objectOneValue, objectTwoValue) && !isArraysDeepEqual(objectOneValue, objectTwoValue)) return false;
  }
  return true;
}

const isArraysDeepEqual = (arrayOne: any, arrayTwo: any): boolean => {
  if (!isArrays(arrayOne, arrayTwo)) return false;
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let idx = 0; idx < arrayOne.length; idx++) {
    const arrayOneValue = arrayOne[idx];
    const arrayTwoValue = arrayTwo[idx];
    if (isPrimitive(arrayOneValue, arrayTwoValue) && !arrayOne.includes(arrayTwoValue)) return false;
    if (isObjects(arrayOneValue, arrayTwoValue) && !isObjectsDeepEqual(arrayOneValue, arrayTwoValue)) return false;
    if (isArrays(arrayOneValue, arrayTwoValue) && !isArraysDeepEqual(arrayOneValue, arrayTwoValue)) return false;
  }
  return true;
}

const isArrays = (valueOne: any, valueTwo: any) => Array.isArray(valueOne) && Array.isArray(valueTwo);
const isObjects = (valueOne: any, valueTwo: any) => !isArrays(valueOne, valueTwo) && typeof valueOne === "object" && typeof valueTwo === "object";
const isPrimitive = (valueOne: any, valueTwo: any) => !isArrays(valueOne, valueTwo) && !isObjects(valueOne, valueTwo);