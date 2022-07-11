import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { trpc } from './services/trpc';

import { App } from './App';
import { store } from './store';

import './index.css';
import { queryClient } from './services/trpc';
import { QueryClientProvider } from 'react-query';

const container = document.getElementById('root');
const root = createRoot(container!);

const Root = () => {
  const [trpcClient] = useState(() => trpc.createClient({ url: 'http://localhost:8080/api'}));

  return <StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </trpc.Provider>
  </StrictMode>
}

root.render(<Root />);
