interface BaseConfig {
  port: number;
}

export default (): BaseConfig => ({
  port: parseInt(process.env.PORT) || 3000,
});