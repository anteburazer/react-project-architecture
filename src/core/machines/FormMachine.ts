import { createMachine, assign, DoneInvokeEvent } from 'xstate';

export interface FormContext {
  formData?: Object;
  errorMessage?: string;
}

export type FormState =
  | {
      value: 'Idle';
      context: FormContext & {
        formData: undefined;
        errorMessage: undefined;
      };
    }
  | {
      value: 'Submitting';
      context: FormContext;
    }
  | {
    value: 'Resolved';
    context: FormContext & { formData: Object; error: undefined };
  }
  | {
    value: 'Failed';
    context: FormContext & { formData: undefined; error: string };
  }

export type FormEvent = { type: 'SUBMIT'; data: Object };

export const assignData = assign<FormContext, FormEvent>({
  formData: (context: FormContext, event: FormEvent) => event.data
});

export const assignErrorMessage = assign<FormContext, DoneInvokeEvent<FormEvent>>({
  errorMessage: (context: FormContext, event: DoneInvokeEvent<FormEvent>) => 
    (event.data as any).response ? (event.data as any).response.data.reason : 'Request failed'
});

export const clearErrorMessage = assign<FormContext, DoneInvokeEvent<FormEvent>>({
  errorMessage: () => undefined
});

export const formMachine = createMachine<FormContext, FormEvent, FormState>(
  {
    initial: 'Idle',
    context: {
      formData: undefined,
      errorMessage: undefined
    },
    states: {
      Idle: {
        on: {
          SUBMIT: {
            actions: assignData,
            target: 'Submitting'
          },
        },
      },
      Submitting: {
        invoke: {
          src: 'submit',
          onDone: {
            actions: clearErrorMessage,
            target: 'Resolved'
          },
          onError: {
            actions: assignErrorMessage,
            target: 'Failed',            
          },
        },
      },
      Resolved: {
        invoke: {
          src: 'handleSuccess'
        }
      },
      Failed: {
        on: {
          SUBMIT: {
            actions: assignData,
            target: 'Submitting'
          },
        },
        invoke: {
          src: 'showError'
        }
      },
    },
  },
  {
    services: {
      submit: () => () => {},
      showError: (context: FormContext) => () => {},
      handleSuccess: () => () => {}
    },
  },
)