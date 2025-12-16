declare module 'aws-sdk-client-mock' {
    import { Command } from '@aws-sdk/types';
    import { SinonStub } from 'sinon';

    export type AnyCommand = Command<unknown, unknown, unknown, unknown, unknown>;

    export interface AwsClientStub {
        reset(): void;
        on(command: unknown, matcher?: unknown): { resolves: (value?: unknown) => void };
        onAnyCommand(): void;
        commandCalls(command: unknown): Array<unknown>;
    }

    export function mockClient<TClient extends object>(client: TClient | { prototype: TClient }): AwsClientStub;

    export { };
}

