import { jest } from '@jest/globals';

jest.useFakeTimers('modern');
jest.spyOn(global, 'setTimeout');
