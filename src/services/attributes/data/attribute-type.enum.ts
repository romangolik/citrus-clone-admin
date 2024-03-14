export enum AttributeType {
  COMBOBOX = "COMBOBOX",
  LIST = "LIST",
  SHORT_TEXT = "SHORT_TEXT",
  LONG_TEXT = "LONG_TEXT",
}

export const AttributeTypeTitles: Record<AttributeType, string> = {
  [AttributeType.COMBOBOX]: "ComboBox",
  [AttributeType.LIST]: "List",
  [AttributeType.SHORT_TEXT]: "ShortText",
  [AttributeType.LONG_TEXT]: "LongText",
}