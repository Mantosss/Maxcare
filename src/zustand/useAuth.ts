import { supabase } from "@/lib/supabaseclint";
import { create } from "zustand";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

type AuthState = {
  loading: boolean;
  error: string | null;
  token: string | null;
  success: boolean;
  user: any | null;
  role: string | null;
  registerUser: (data: any) => Promise<any>;
  loginUser: (data: any) => Promise<any>;
  logoutUser: () => Promise<any>;
};

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,
  success: false,
  token: (getCookie("token") as string) || null,
  user: getCookie("user") ? JSON.parse(getCookie("user") as string) : null,
  role: (getCookie("role") as string) || null,

  registerUser: async (data) => {
    // console.log("data comming from zustand", data)
    // return {
    //     success: true,
    //     message : "Registration Successfull"
    // }
    console.log("comming data from zustand", data);
    set({ loading: true });
    try {
      // supabase account create
      const { data: authData, error: acCreateError } =
        await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });
      if (acCreateError) throw acCreateError;
      console.log("accouant create", authData);
      const userID = authData.user?.id;
      // const userID = "49013beb-a2cf-4a40-9740-8440ba0054b3"

      // supabase image upload
      //   let imageURL: string | null = null;

      //   if (data.image) {
      //     const fileExt =
      //       data.image.name.split(".").pop() ||
      //       data.image.type.split("/")[1] ||
      //       "png";
      //     const fileName = `${crypto.randomUUID()}/${fileExt}`;

      //     const { error: uploadError } = await supabase.storage
      //       .from("registration-image")
      //       .upload(fileName, data.image);

      //     if (uploadError) throw uploadError;

      //     const { data: imageData } = supabase.storage
      //       .from("registration-image")
      //       .getPublicUrl(fileName);
      //     console.log("get image data", imageData);

      //     imageURL = imageData.publicUrl;
      //   }
      //   console.log("uploaded image url", imageURL);

      const { data: registration, error: registrationError } = await supabase
        .from("signup")
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
          role: data.role,
          //   image: imageURL,
          auth_id: userID,
        });
      console.log("registration compleated ", registration);
      if (registrationError) throw registrationError;

      set({
        loading: false,
        success: true,
      });
      return {
        success: true,
        message: "Registration Successfull",
      };
    } catch (error: any) {
      console.log(error);
      set({ loading: false, error: error.message || "failed" });
      return {
        success: false,
        message: error.message || "Faild to register",
      };
    } finally {
      set({ loading: false });
    }
  },

  loginUser: async (data) => {
    console.log("data coming in zustand", data);
    set({ loading: true });
    try {
      set({ loading: true, success: true });
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });
      console.log("auth return", authData);
      if (authError) throw authError;
      const { data: profile, error: profileError } = await supabase
        .from("signup")
        .select("*")
        .eq("auth_id", authData.user.id)
        .single();
      console.log("profile details", profile);
      if (profileError) throw profileError;

      setCookie("token", authData?.session?.access_token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      setCookie("role", profile.role, { maxAge: 60 * 60 * 24 * 7, path: "/" });

      setCookie("user", JSON.stringify(profile), {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      set({
        token: authData?.session?.access_token,
        user: profile,
        role: profile.role,
        loading: false,
      });
      return {
        success: true,
        message: "Registration Successfull",
      };
    } catch (error: any) {
      console.log(error);
      set({ loading: false, error: error.message || "failed" });
      return {
        success: false,
        message: error.message || "Faild to register",
      };
    } finally {
      set({ loading: false });
    }
  },

  logoutUser: async () => {
    try {
      set({ loading: true });

      await supabase.auth.signOut();

      deleteCookie("token");
      deleteCookie("role");
      deleteCookie("user");

      set({
        token: null,
        user: null,
        role: null,
        loading: false,
      });

      return {
        success: true,
        message: "Logged out successfully",
      };
    } catch (error: any) {
      set({ loading: false });

      return {
        success: false,
        message: error.message || "Logout failed",
      };
    }
  },
}));
