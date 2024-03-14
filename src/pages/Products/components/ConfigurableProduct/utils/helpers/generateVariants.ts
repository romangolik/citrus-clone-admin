import {
  ProductOptionDto,
  ProductVariantDto,
  ProductOptionValueDto,
} from "@services/products";

function getOptionCombinations(
  options: ProductOptionDto[]
): ProductOptionValueDto[][] {
  const optionsValues = options.map(({ values }) =>
    values.map((optionValue) => ({
      name: optionValue.name,
      value: optionValue.value,
    }))
  ) as ProductOptionValueDto[][];
  if (0 === optionsValues.length) return [];
  if (1 === optionsValues.length) return optionsValues[0].map((item) => [item]);
  const [firstValue, ...restValues] = optionsValues;
  const a = getOptionCombinations(
    restValues.map((e) => ({
      id: null,
      name: "",
      type: null,
      values: e,
    }))
  );
  return 0 === firstValue.length
    ? a.map((e) => e.filter((e) => Boolean(e)))
    : firstValue.flatMap((e) =>
        (function (e, n) {
          if (0 === n.length) return [[e]];
          return n.map((n) => [e, ...n]);
        })(e, a)
      );
}

function findVariant(
  variants: ProductVariantDto[],
  optionCombination: ProductOptionValueDto[]
) {
  return variants.find((variant) => {
    if (variant.optionValues.length !== optionCombination.length) {
      return false;
    }

    return (
      [...variant.optionValues.map(({ name }) => name)].sort().join("_") ===
      [...optionCombination.map(({ name }) => name)].sort().join("_")
    );
  });
}

function getVariantName(
  defaultVariantName: string,
  optionCombination: ProductOptionValueDto[]
) {
  const combinationName = optionCombination.map(({ name }) => name).join(" | ");

  return defaultVariantName.length > 0
    ? defaultVariantName + " - " + combinationName
    : combinationName;
}

function getVariantSlug(
  defaultVariantSlug: string,
  optionCombination: ProductOptionValueDto[]
) {
  const combinationSlug = optionCombination
    .map(({ name }) => name.toLocaleLowerCase().replace(/\s/g, ""))
    .join("-");

  return defaultVariantSlug.length > 0
    ? defaultVariantSlug + "-" + combinationSlug
    : combinationSlug;
}

export function generateVariants({
  newVariantDefaultData,
  oldVariants,
  options,
  reOrder,
}: {
  newVariantDefaultData: ProductVariantDto;
  oldVariants: ProductVariantDto[];
  options: ProductOptionDto[];
  reOrder: boolean;
}): ProductVariantDto[] {
  const generatedVariants: ProductVariantDto[] = [];
  const optionCombinations = getOptionCombinations(options);

  optionCombinations.forEach((optionCombination) => {
    const variant = findVariant(oldVariants, optionCombination);

    if ((reOrder && !variant)) return;

    !variant
      ? generatedVariants.push({
          ...newVariantDefaultData,
          name: getVariantName(newVariantDefaultData.name, optionCombination),
          slug: getVariantSlug(newVariantDefaultData.slug, optionCombination),
          ...variant,
          optionValues: optionCombination.map((item) => ({
            ...item,
          })),
        })
      : generatedVariants.push({
          ...variant,
          optionValues: optionCombination.map((item) => ({
            ...item,
          })),
        });
  });

  return generatedVariants;
}
