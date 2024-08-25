export interface AuthFlowInterface {
  validateUser(email: string, password: string): Promise<any>;
  login(user: any): Promise<{ accessToken: string }>;
  validateToken(token: string): Promise<any>;
}
