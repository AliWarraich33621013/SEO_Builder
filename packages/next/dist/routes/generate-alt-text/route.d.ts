import * as next_server from 'next/server';

declare function POST(request: Request): Promise<next_server.NextResponse<{
    success: false;
    error: {
        code: string;
        message: string;
    };
}> | next_server.NextResponse<{
    success: true;
    provider: string | undefined;
    model: string | undefined;
    data: {
        altText: string;
    };
}>>;

export { POST };
