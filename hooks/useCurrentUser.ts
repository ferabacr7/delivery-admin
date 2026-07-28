"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";

type UserProfile = {
  id: string;
  full_name: string | null;
  role: string | null;
};

type CurrentUser = {
  id: string;
  email: string;
  fullName: string;
  role: string | null;
  initial: string;
};

type UseCurrentUserResult = {
  currentUser: CurrentUser | null;
  isLoading: boolean;
  error: string | null;
};

function buildCurrentUser(
  user: User,
  profile: UserProfile | null,
): CurrentUser {
  const email = user.email ?? "";
  const emailName = email.split("@")[0] || "Admin";

  const fullName = profile?.full_name?.trim() || emailName;

  const initial =
    fullName.charAt(0).toUpperCase() ||
    email.charAt(0).toUpperCase() ||
    "A";

  return {
    id: user.id,
    email,
    fullName,
    role: profile?.role ?? null,
    initial,
  };
}

export function useCurrentUser(): UseCurrentUserResult {
  const supabase = useMemo(() => createClient(), []);

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCurrentUser() {
      try {
        setIsLoading(true);
        setError(null);

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          throw userError;
        }

        if (!user) {
          if (isMounted) {
            setCurrentUser(null);
          }

          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("id, full_name, role")
          .eq("id", user.id)
          .maybeSingle<UserProfile>();

        if (profileError) {
          throw profileError;
        }

        if (isMounted) {
          setCurrentUser(buildCurrentUser(user, profile));
        }
      } catch (caughtError) {
        console.error("CURRENT USER ERROR:", caughtError);

        if (isMounted) {
          setCurrentUser(null);
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : "No se pudo cargar el usuario autenticado.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadCurrentUser();

    return () => {
      isMounted = false;
    };
  }, [supabase]);

  return {
    currentUser,
    isLoading,
    error,
  };
}