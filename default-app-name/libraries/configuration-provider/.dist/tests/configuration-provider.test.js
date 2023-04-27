"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const configurationProvider = __importStar(require("../index"));
describe('getValue function', () => {
    beforeEach(() => {
        configurationProvider.reset();
    });
    test('When a default value exist in the schema, then get this value in response', () => {
        configurationProvider.initialize({
            port: {
                format: 'Number',
                default: 3000,
            },
        });
        const receivedValue = configurationProvider.getValue('port');
        expect(receivedValue).toBe(3000);
    });
    test('When a key does not exist, then an exception should be thrown', () => {
        configurationProvider.initialize({
            port: {
                format: 'Number',
            },
        });
        const functionUnderTest = configurationProvider.getValue.bind(null, 'none-existing-key');
        expect(functionUnderTest).toThrow();
    });
    test('When there is default but ENV VAR override exists, then the ENV VAR value is returned', () => {
        process.env.LOGGER_LEVEL = 'the-new-value';
        configurationProvider.initialize({
            logLevel: {
                format: 'String',
                default: 'the-default-value',
                env: 'LOGGER_LEVEL',
            },
        });
        const receivedValue = configurationProvider.getValue('logLevel');
        expect(receivedValue).toBe('the-new-value');
        delete process.env.LOGGER_LEVEL;
    });
    test('When trying to get before initializing, then an exception should be thrown', () => {
        const functionUnderTest = configurationProvider.getValue.bind(null, 'existing-key');
        expect(functionUnderTest).toThrow();
    });
});
describe('initialize function', () => {
    test('When initializing without config data, then an exception should be thrown', () => {
        expect(configurationProvider.initialize.bind(null, null)).toThrow();
    });
    test('When a non-null key without default value is null, then an exception should be thrown', () => {
        const configWithNullMandatoryKey = {
            port: {
                format: 'Number',
                nullable: false,
                default: null,
            },
        };
        const functionUnderTest = configurationProvider.initialize.bind(null, configWithNullMandatoryKey);
        expect(functionUnderTest).toThrow();
    });
    test('When a numerical value has string, then an exception should be thrown', () => {
        process.env.PORT = 'Im-a-string-not-number';
        const configWithTypeMismatch = {
            port: {
                format: 'int',
                env: 'PORT',
                default: null,
            },
        };
        const functionUnderTest = configurationProvider.initialize.bind(null, configWithTypeMismatch);
        expect(functionUnderTest).toThrow();
        delete process.env.PORT;
    });
});
