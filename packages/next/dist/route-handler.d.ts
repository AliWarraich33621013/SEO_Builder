import * as next_server from 'next/server';
import { AIGeneratorResult } from '@seo-builder/core/ai';

declare function withAiRoute<T>(request: Request, task: string, handler: () => Promise<AIGeneratorResult<T>>): Promise<next_server.NextResponse<{
    success: true;
    provider: string | undefined;
    model: string | undefined;
    data: T;
}> | next_server.NextResponse<{
    success: false;
    error: {
        code: string;
        message: string;
    };
}>>;
declare function withAiRouteSimple<T>(request: Request, task: string, handler: () => Promise<T>): Promise<next_server.NextResponse<{
    success: false;
    error: {
        code: string;
        message: string;
    };
}> | next_server.NextResponse<{
    success: true;
    provider: string | undefined;
    model: string | undefined;
    data: Awaited<T>;
}>>;

export { withAiRoute, withAiRouteSimple };
