export enum Conditions {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export interface TriggerEntry {
  id: number;
  webhook: string;
  conditions: Conditions;
}

export type NewTriggerEntry = Omit<TriggerEntry, "id">;
