import { createMachine, assign, DoneInvokeEvent } from 'xstate';

export interface AppContext {
  token?: string;
}

export type AppState =
  | {
      value: 'Idle';
      context: AppContext & {
        token: undefined;
      };
    }
  | {
      value: 'Loading';
      context: AppContext;
    }
  | {
    value: 'Authenticated';
    context: AppContext & { token: string };
  }
  | {
    value: 'NotAuthenticated';
    context: AppContext & { token: undefined };
  }

export type AppEvent =
  | { type: 'LOGIN'; data: Object }
  | { type: 'LOGOUT'; data: Object };

export const appMachine = createMachine<AppContext, AppEvent, AppState>(
  {
    initial: 'Idle',
    context: {
      token: undefined,
    },
    states: {
      Idle: {
        id: 'Idle',
        on: {
          LOGIN: {
            actions: 'assignToken',
            target: 'Loading'
          },
        },
      },
      Loading: {
        id: 'Loading'
      },
      Authenticated: {
        id: 'Authenticated'
      },
      NotAuthenticated: {
        id: 'NotAuthenticated'
      }
    }
  },
  {
    actions: {
      assignToken: assign<AppContext, AppEvent>({
        token: (context: AppContext, event: AppEvent) => (event.data as any).token
      })
    }
  }
);