import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useToast } from '@/hooks/useToast';
import { CircleXIcon } from 'lucide-react';
import { TOAST } from '@/constants/toast';
import { getErrorMessage } from '@/utils/getErrorMessage';

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
        refetchInterval: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        throwOnError: true,
      },
      mutations: {
        throwOnError: false,
        onError: (error: unknown) => {
          console.error(error);
          const errorMessage = getErrorMessage(error);

          if (isAxiosError(error)) {
            toast({
              title: errorMessage,
              icon: <CircleXIcon />,
              className: TOAST.error,
            });
          }
        },
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
