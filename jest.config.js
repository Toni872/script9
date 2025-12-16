import 'dotenv/config';
import dotenv from 'dotenv';
import nextJest from 'next/jest.js';

dotenv.config({ path: '.env.test' });

const createJestConfig = nextJest({
    dir: './',
});

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.(test|spec).(ts|tsx|js|jsx)',
        '<rootDir>/src/**/*.(test|spec).(ts|tsx|js|jsx)',
        '<rootDir>/tests/**/*.(test|spec).(ts|tsx|js|jsx)',
    ],
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/*.stories.{js,jsx,ts,tsx}',
        '!src/**/__tests__/**',
    ],
};

export default createJestConfig(customJestConfig);