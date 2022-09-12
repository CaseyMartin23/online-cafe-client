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
