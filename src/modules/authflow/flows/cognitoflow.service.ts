// src/modules/authflow/flows/cognito.authflow.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  CognitoIdentityProviderClient,
  AdminInitiateAuthCommand,
  GetUserCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { AuthFlowInterface } from '../authflow.interface';

@Injectable()
export class CognitoAuthService implements AuthFlowInterface {
  private client: CognitoIdentityProviderClient;

  constructor() {
    this.client = new CognitoIdentityProviderClient({
      region: process.env.COGNITO_REGION,
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const command = new AdminInitiateAuthCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    try {
      const response = await this.client.send(command);
      return response.AuthenticationResult;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async login(user: any): Promise<{ accessToken: string }> {
    return { accessToken: user.AccessToken };
  }

  async validateToken(token: string): Promise<any> {
    const command = new GetUserCommand({
      AccessToken: token,
    });

    try {
      const response = await this.client.send(command);
      return response;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
