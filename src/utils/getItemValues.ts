type FormValues = {
  name: string;
  quantity: string;
  price: string;
  [key: string]: string;
};

const getItemValues = (obj: any) => {

  const allFormItemValues = Object.keys(obj)
    .filter(
      (fieldName) =>
        fieldName.startsWith("name") ||
        fieldName.startsWith("quantity") ||
        fieldName.startsWith("price")
    )
    .reduce((filteredValues: Record<string, string>, fieldName) => {
      filteredValues[fieldName] = obj[fieldName];
      return filteredValues;
    }, {});

  const itemValuesArray = Array.from(
    {
      length:
        Math.max(
          ...Object.keys(allFormItemValues).map((key) =>
            parseInt(key.split("_")[1], 10)
          )
        ) + 1,
    },
    () => ({ name: "", quantity: "", price: "" } as FormValues)
  );

  for (const key in allFormItemValues) {
    const [fieldName, number] = key.split("_");
    const index = parseInt(number, 10);
    itemValuesArray[index][fieldName] = allFormItemValues[key];
  }
  return itemValuesArray;
};

export default getItemValues;
