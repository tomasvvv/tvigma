import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "tvigma-api";
import { QueryClient } from "react-query";

export const trpc = createReactQueryHooks<AppRouter>();

export const queryClient = new QueryClient();