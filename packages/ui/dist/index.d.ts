import * as react from 'react';
import { ReactNode } from 'react';
import { SeoBuilderConfig } from '@seo-builder/core/config';
export { seoBuilderCssVars } from './theme.js';

declare function SeoBuilderThemeProvider({ config, children, }: {
    config: SeoBuilderConfig;
    children: ReactNode;
}): react.JSX.Element;

type JsonLdProps = {
    data: Record<string, unknown> | Record<string, unknown>[] | null;
};
declare function JsonLd({ data }: JsonLdProps): react.JSX.Element | null;
declare function BlogHeader({ title, description }: {
    title: string;
    description?: string;
}): react.JSX.Element;
declare function Breadcrumbs({ items }: {
    items: {
        label: string;
        href?: string;
    }[];
}): react.JSX.Element;
declare function Pagination({ currentPage, totalPages, basePath, }: {
    currentPage: number;
    totalPages: number;
    basePath: string;
}): react.JSX.Element | null;
declare function FAQSection({ items, }: {
    items: {
        question?: string | null;
        answer?: string | null;
    }[];
}): react.JSX.Element | null;
declare function AuthorBox({ author, }: {
    author: {
        name?: string | null;
        bio?: string | null;
        jobTitle?: string | null;
        avatar?: unknown;
        slug?: string | null;
    };
}): react.JSX.Element;
declare function PostCard({ post, blogPath, }: {
    post: {
        slug?: string | null;
        title?: string | null;
        excerpt?: string | null;
        publishedAt?: string | null;
        featuredImage?: unknown;
        author?: unknown;
        categories?: unknown;
    };
    blogPath?: string;
}): react.JSX.Element;
declare function PostList({ children }: {
    children: ReactNode;
}): react.JSX.Element;
declare function RichText({ content }: {
    content: unknown;
}): react.JSX.Element | null;

declare function BlogCTA({ title, description, buttonText, buttonUrl, }: {
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
}): react.JSX.Element;
declare function RelatedPosts({ posts, blogPath, }: {
    posts: Parameters<typeof PostCard>[0]['post'][];
    blogPath?: string;
}): react.JSX.Element | null;

export { AuthorBox, BlogCTA, PostCard as BlogCard, BlogHeader, PostList as BlogList, Breadcrumbs, FAQSection as FAQBlock, FAQSection, JsonLd, Pagination, PostCard, PostList, RelatedPosts, RichText, SeoBuilderThemeProvider };
