import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://eeqwvattovquyfclsuhk.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlcXd2YXR0b3ZxdXlmY2xzdWhrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjY2MjQ4OSwiZXhwIjoyMDg4MjM4NDg5fQ.ajAsO_GpBipYXWHZPibGCIgiaVCpRT3l0dMwNXDFVaA"

export const supabase = createClient(supabaseUrl, supabaseKey)