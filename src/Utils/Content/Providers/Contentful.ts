import { createClient } from 'contentful';
import { Document } from '@contentful/rich-text-types';

// 配置 dotenv
const blogModel = import.meta.env.VITE_CONTENTFUL_BLOG_MODEL || '';
const itemsLimit = parseInt(import.meta.env.VITE_BLOG_ITEMS_PER_PAGE) || 10;
const i18n: boolean = import.meta.env.VITE_I18N === 'true';

// 修改 selectShape 类型，支持 sys.createdAt
type selectShape = (
    | "fields.blogTitle"
    | "fields.blogDescription"
    | "fields.blogSlug"
    | "fields.publishedTime"
    | "fields.isPinned"
    | "fields.blogContent"
    | "sys.createdAt"
)[];

// 创建 Contentful 客户端
const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_DELIVERY_TOKEN,
});

// 获取置顶文章
export const getPinnedPosts = async () => {
    // 默认值修改为 -sys.createdAt
    const orderType = import.meta.env.VITE_CONTENTFUL_BLOG_ORDER_TYPE || '-sys.createdAt';
    const res = await client.getEntries({
        content_type: blogModel,
        order: [orderType],
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
        isPinned?: boolean;
    }[];
    total: number;
}

export const getPostsList = async (offset: number, locale?: string | "zh-hans"): Promise<getPostsListShape> => {

    const rawOrderType = import.meta.env.VITE_CONTENTFUL_BLOG_ORDER_TYPE || 'createdAt';
    const orderType = rawOrderType === 'createdAt' ? '-sys.createdAt' : '-fields.publishedTime';

    const selectedFields: selectShape = [
        'fields.blogTitle',
        'fields.blogDescription',
        'fields.blogSlug',
        rawOrderType === 'createdAt' ? 'sys.createdAt' : 'fields.publishedTime',
        'fields.isPinned',
    ];

    const validOffset = Number.isFinite(offset) ? offset : 0;
    const validItemsLimit = Number.isFinite(itemsLimit) ? itemsLimit : 10;

    const res = await client.getEntries({
        content_type: blogModel,
        order: [orderType], // 将字符串包装为数组
        limit: validItemsLimit,
        skip: validOffset * validItemsLimit,
        select: selectedFields,
        ...(i18n && { locale: locale }),
    });

    return {
        items: res.items.map((item) => ({
            title: typeof item.fields.blogTitle === 'string' ? item.fields.blogTitle : '',
            description: typeof item.fields.blogDescription === 'string' ? item.fields.blogDescription : '',
            slug: typeof item.fields.blogSlug === 'string' ? item.fields.blogSlug : '',
            publishedTime: rawOrderType === 'createdAt' ? item.sys.createdAt.toString() : item.fields.publishedTime!.toString(),

            isPinned: typeof item.fields.isPinned === 'boolean' ? item.fields.isPinned : false,
        })),
        total: res.total,
    };
};

// 获取文章内容
interface getPostsContentShape {
    title: string;
    content: Document;
    publishedTime: string;
    isPinned?: boolean;
}

export const getPostsContent = async (slug: string, locale?: string | "zh-hans"): Promise<getPostsContentShape> => {

    const res = await client.getEntries({
        content_type: blogModel,
        'fields.blogSlug': slug,
        limit: 1,
        ...(i18n && { locale: locale }),
    });

    if (res.items.length === 0) {
        throw new Error('Content not found');
    }

    const item = res.items[0];

    return {
        title: typeof item.fields.blogTitle === 'string' ? item.fields.blogTitle : '',
        content: item.fields.blogContent as Document,
        publishedTime: typeof item.fields.publishedTime === 'string'
            ? item.fields.publishedTime
            : typeof item.fields.publishedTime === 'number'
                ? item.fields.publishedTime.toString()
                : '',
        isPinned: typeof item.fields.isPinned === 'boolean' ? item.fields.isPinned : false,
    };
};