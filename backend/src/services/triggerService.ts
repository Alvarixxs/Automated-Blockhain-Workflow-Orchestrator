import { TriggerEntry } from "../types";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://idcvusacxhmbawjsrkph.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const getEntries = (): TriggerEntry[] => {
  return [];
};

export default {
  getEntries,
};
