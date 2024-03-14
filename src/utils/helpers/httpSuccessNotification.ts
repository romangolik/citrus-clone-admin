import { toast } from "react-toastify";
import { MutationLifecycleApi } from "@reduxjs/toolkit/dist/query/endpointDefinitions";

export const httpSuccessNotification =
  (successMessage = "Операція виконана успішно") =>
    async <Arg>(arg: Arg, api: MutationLifecycleApi<Arg, any, any, string>) => {
      try {
        await api.queryFulfilled;
        toast.success(successMessage);
      } catch { }
    };
    