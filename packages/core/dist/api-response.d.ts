import { NextResponse } from 'next/server';

type ApiErrorBody = {
    success: false;
    error: {
        code: string;
        message: string;
    };
};
type ApiSuccessBody<T> = {
    success: true;
    provider?: string;
    model?: string;
    data: T;
};
declare function apiErrorResponse(error: unknown): NextResponse<{
    success: false;
    error: {
        code: string;
        message: string;
    };
}>;
declare function apiSuccessResponse<T>(data: T, meta?: {
    provider?: string;
    model?: string;
}): NextResponse<{
    success: true;
    provider: string | undefined;
    model: string | undefined;
    data: T;
}>;
declare const aiErrorResponse: typeof apiErrorResponse;
declare const aiSuccessResponse: typeof apiSuccessResponse;

export { type ApiErrorBody, type ApiSuccessBody, aiErrorResponse, aiSuccessResponse, apiErrorResponse, apiSuccessResponse };
