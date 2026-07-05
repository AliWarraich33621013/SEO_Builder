import * as _seo_builder_core from '@seo-builder/core';
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
    data: _seo_builder_core.SeoScoreResult;
}>>;

export { POST };
