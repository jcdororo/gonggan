"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

interface Props {
  children?: React.ReactNode;
}

export const NextProvider = ({ children }: Props) => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RecoilRoot>
  );
};
