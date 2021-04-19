import React from 'react';
import { useForm  } from "react-hook-form";
import { useMachine } from '@xstate/react';
import { formMachine } from 'core/machines/FormMachine';
import { getValidationRules } from './Utils';
import { SignInRequest } from 'core/models';
import { authRestClient } from 'core/restClients'

export const Login: React.FC = () => {
  const { handleSubmit, formState: { errors }, register } = useForm();
  const rules = getValidationRules();
  const [state, send] = useMachine(formMachine, {
    services: {
      submit: (context, event) => authRestClient.login(event.data as SignInRequest)
    }
  });

  const submit = (data: SignInRequest) => send('SUBMIT', { data });

  return (
    <div className="text-center mb-5">
      <h1 className="mb-4 px-3">Sign in to your account</h1>

      <form onSubmit={handleSubmit(submit)}>
        <div className="input-group input-group-lg mb-5">
          <input
            className={`form-control rounded-lg shadow ${errors.email && 'form-input-error'}`}
            placeholder="Email"
            disabled={state.matches('Submitting')}
            {...register("email", { ...rules.email })}
          />

          <div className="form-error-label mt-2 pl-2">
            {errors.email && errors.email.message}
          </div>
        </div>

        <div className="input-group input-group-lg mb-5">
          <input
            className={`form-control rounded-lg shadow ${errors.email && 'form-input-error'}`}
            type="password"
            placeholder="Password"
            disabled={state.matches('Submitting')}
            {...register("password", { ...rules.passwordRequired, ...rules.passwordFormat })}
          />

          <div className="form-error-label mt-2 pl-2">
            {errors.password && errors.password.message}
          </div>
        </div>

        <div className="mt-5 mb-0 text-center">
          <button
            className={`btn btn-primary btn-lg}`}
            type="submit"
            disabled={state.matches('Submitting')} 
          >
            <u>Submit</u>
          </button>
        </div>
      </form>
    </div>
  );
};