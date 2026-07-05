import { z } from 'zod';

declare const seoScoreSchema: z.ZodObject<{
    post: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    siteSettings: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    post?: Record<string, unknown> | undefined;
    siteSettings?: Record<string, unknown> | undefined;
}, {
    post?: Record<string, unknown> | undefined;
    siteSettings?: Record<string, unknown> | undefined;
}>;

export { seoScoreSchema };
