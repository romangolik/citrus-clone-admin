export enum AvailabilityStatus {
  AVAILABLE = "AVAILABLE",
  UNAVAILABLE = "UNAVAILABLE",
  EXPECTED = "EXPECTED",
  SOON = "SOON",
  CAN_BUY = "CAN_BUY",
}

export const AvailabilityStatusLabel: Record<AvailabilityStatus, string> = {
  [AvailabilityStatus.AVAILABLE]: "Є в наявності",
  [AvailabilityStatus.EXPECTED]: "Очікується",
  [AvailabilityStatus.SOON]: "Скоро у продажу",
  [AvailabilityStatus.UNAVAILABLE]: "Немає в наявності",
  [AvailabilityStatus.CAN_BUY]: "Наявність уточнює менеджер",
};