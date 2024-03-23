module.exports = {
  clearMocks: true,
  roots: ['<rootDir>/src'],
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
  testRegex: ".*\\/.*spec\\.ts$",
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  coverageDirectory: 'coverage',
  coverageReporters: ['cobertura', 'html', 'lcov', 'text', 'clover', 'text-summary'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/core/application/dto/**',
    '!src/**/*.module.ts',
    '!src/core/domain/entities/**',
    '!src/main.ts',
    '!src/infrastructure/adapters/gateway/mocks/**',
    '!src/infrastructure/adapters/gateway/entity/**'
  ],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 40,
      lines: 40,
      statements: 40,
    },
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1'
  },
  reporters: ['default', ['jest-sonar', {
    outputDirectory: 'coverage',
    outputName: 'test-report.xml',
    reportedFilePath: 'relative'
  }]],
}