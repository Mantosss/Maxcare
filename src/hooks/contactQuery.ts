import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseclint"; // Ensure this path matches your supabase client location

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  text: string;
}

export const useSubmitContact = () => {
  return useMutation({
    mutationFn: async (formData: ContactFormData) => {
      const { data, error } = await supabase
        .from("contact")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            text: formData.text,
          },
        ])
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};