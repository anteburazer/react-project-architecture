import { RestClient } from 'core/restClients';
import { ApiResponsePayload, SignInRequest, SignInResponse } from 'core/models';
import Config from 'core/Config';

class AuthRestClient extends RestClient {
  login = (credentials: SignInRequest) => (
    this.post<SignInRequest, ApiResponsePayload<SignInResponse>>(
      `${this._apiUrl}${Config.routes.login}`,
      credentials,
    )
  );
}

export const authRestClient = new AuthRestClient({});