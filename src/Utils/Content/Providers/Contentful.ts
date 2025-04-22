import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

// 配置 dotenv
const modelPrefix = import.meta.env.VITE_CONTENTFUL_MODEL_PREFIX || '';
const itemsLimit = parseInt(import.meta.env.VITE_BLOG_ITEMS_PER_PAGE) || 10;
type selectShape = ("fields.blogTitle" | "fields.blogDescription" | "fields.blogSlug" | "fields.publishedTime" | "fields.isPinned" | "fields.blogContent")[];

// 创建 Contentful 客户端
const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN,
});

// 获取置顶文章
export const getPinnedPosts = async (model: string) => {
    const orderType = import.meta.env.VITE_CONTENTFUL_BLOG_ORDER_TYPE || '-fields.publishedTime';
    const res = await client.getEntries({
        content_type: `${modelPrefix}${model}`,
        order: orderType,
    });
    return res.items.map((item) => item.fields);
}

// 获取文章列表
interface getPostsListShape {
    items: {
        title: string;
        description: string;
        slug: string;
        publishedTime: string;
        isPinned: boolean;
    }[];
    total: number;
}

export const getPostsList = async (model: string, offset: number): Promise<getPostsListShape> => {
    const orderType = import.meta.env.VITE_CONTENTFUL_BLOG_ORDER_TYPE || '-fields.publishedTime';
    const selectedFields: selectShape = [
        'fields.blogTitle',
        'fields.blogDescription',
        'fields.blogSlug',
        'fields.publishedTime',
        'fields.isPinned',
    ];
    const res = await client.getEntries({
        content_type: `${modelPrefix}${model}`,
        order: orderType,
        limit: itemsLimit,
        skip: offset * itemsLimit,
        select: selectedFields,
    });

    return {
        items: res.items.map((item) => ({
            title: typeof item.fields.blogTitle === 'string' ? item.fields.blogTitle : '',
            description: typeof item.fields.blogDescription === 'string' ? item.fields.blogDescription : '',
            slug: typeof item.fields.blogSlug === 'string' ? item.fields.blogSlug : '',
            publishedTime: typeof item.fields.publishedTime === 'string' ? item.fields.publishedTime : '',
            isPinned: typeof item.fields.isPinned === 'boolean' ? item.fields.isPinned : false,
        })),
        total: res.total,
    };
};


// 获取文章内容
interface getPostsContentShape {
    title: string,
    content: Document,
    publishedTime: string,
    isPinned: boolean
}

export const getPostsContent = async (model: string, slug: string): Promise<getPostsContentShape> => {

    const res = await client.getEntries({
        content_type: `${modelPrefix}${model}`,
        'fields.blogSlug': slug,
        limit: 1,
    });

    if (res.items.length === 0) {
        throw new Error('Content not found');
    }

    const item = res.items[0];

    return {
        title: typeof item.fields.blogTitle === 'string' ? item.fields.blogTitle : '',
        content: item.fields.blogContent as Document,
        publishedTime: typeof item.fields.publishedTime === 'string' ? item.fields.publishedTime : '',
        isPinned: typeof item.fields.isPinned === 'boolean' ? item.fields.isPinned : false,
    };
};