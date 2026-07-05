import * as next_server from 'next/server';
import * as _seo_builder_core from '@seo-builder/core';

declare function GET(): Promise<next_server.NextResponse<{
    success: true;
    provider: string | undefined;
    model: string | undefined;
    data: {
        provider: _seo_builder_core.AIProviderName;
        providerLabel: string;
        model: string;
    };
}>>;

export { GET };
