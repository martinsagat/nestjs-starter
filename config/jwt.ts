interface JwtConfig {
  jwt: {
    secretKey: string;
    expiresIn: string;
  };
}

export default (): JwtConfig => ({
    jwt: {
      secretKey: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.JWT_EXPIRES_IN
    }
});