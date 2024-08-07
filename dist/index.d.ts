import * as vue_demi from 'vue-demi';
import { PropType } from 'vue-demi';

type ImageResolution = 'default' | 'mqdefault' | 'hqdefault' | 'sddefault' | 'maxresdefault';
declare const _default: vue_demi.DefineComponent<{
    announce: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    id: {
        type: StringConstructor;
        required: true;
    };
    title: {
        type: StringConstructor;
        required: true;
    };
    activatedClass: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    adNetwork: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    iframeClass: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    cookie: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    params: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    playerClass: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    playlist: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    playlistCoverId: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    poster: {
        type: PropType<ImageResolution>;
        required: false;
        default: string;
    };
    wrapperClass: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    muted: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    thumbnail: {
        type: StringConstructor;
        required: false;
    };
    webp: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    rel: {
        type: PropType<"prefetch" | "preload">;
        required: false;
        default: string;
    };
    aspectHeight: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    aspectWidth: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    autoplay: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}, (() => vue_demi.VNode<vue_demi.RendererNode, vue_demi.RendererElement, {
    [key: string]: any;
}>) | (() => any[]), unknown, {}, {}, vue_demi.ComponentOptionsMixin, vue_demi.ComponentOptionsMixin, "iframeAdded"[], "iframeAdded", vue_demi.PublicProps, Readonly<vue_demi.ExtractPropTypes<{
    announce: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    id: {
        type: StringConstructor;
        required: true;
    };
    title: {
        type: StringConstructor;
        required: true;
    };
    activatedClass: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    adNetwork: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    iframeClass: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    cookie: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    params: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    playerClass: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    playlist: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    playlistCoverId: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    poster: {
        type: PropType<ImageResolution>;
        required: false;
        default: string;
    };
    wrapperClass: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    muted: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    thumbnail: {
        type: StringConstructor;
        required: false;
    };
    webp: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    rel: {
        type: PropType<"prefetch" | "preload">;
        required: false;
        default: string;
    };
    aspectHeight: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    aspectWidth: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    autoplay: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}>> & {
    onIframeAdded?: ((...args: any[]) => any) | undefined;
}, {
    announce: string;
    activatedClass: string;
    adNetwork: boolean;
    iframeClass: string;
    cookie: boolean;
    params: string;
    playerClass: string;
    playlist: boolean;
    playlistCoverId: string;
    poster: ImageResolution;
    wrapperClass: string;
    muted: boolean;
    webp: boolean;
    rel: "prefetch" | "preload";
    aspectHeight: number;
    aspectWidth: number;
    autoplay: boolean;
}, {}>;

export { _default as default };
