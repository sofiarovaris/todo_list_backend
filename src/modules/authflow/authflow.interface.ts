export interface AuthFlowInterface {
  /**
   * Validates the user credentials.
   * @param email - The email of the user.
   * @param password - The password of the user.
   * @returns A promise that resolves to the user object if validation is successful.
   */
  validateUser(email: string, password: string);

  /**
   * Logs in the user and returns an access token.
   * @param user - The user object.
   * @returns A promise that resolves to an object containing the access token.
   */
  login(user: any);

  /**
   * Validates the provided token.
   * @param token - The token to validate.
   * @returns A promise that resolves to the user object if the token is valid.
   */
  validateToken(token: string);
}
