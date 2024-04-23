module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy', // Para arquivos de estilo
    '\\.(jpg|jpeg|png|gif|webp|svg|ico|pdf)$': '<rootDir>/__mocks__/fileMock.js', // Para arquivos de imagem e estáticos
  },
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  transformIgnorePatterns: [
    // Ignorar node_modules exceto para os módulos que precisam ser transpilados pelo Babel
    '/node_modules/(?!algum-modulo-especifico).+\\.(js|jsx|ts|tsx)$',
  ],
};