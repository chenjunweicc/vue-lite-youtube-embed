"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/LiteYouTubeEmbed.ts
var import_vue_demi2 = require("vue-demi");

// src/utils.ts
var import_vue_demi = require("vue-demi");
function adaptOnsV3(ons) {
  if (!ons)
    return null;
  return Object.entries(ons).reduce((ret, [key, handler]) => {
    key = key.charAt(0).toUpperCase() + key.slice(1);
    key = `on${key}`;
    return { ...ret, [key]: handler };
  }, {});
}
function h(type, options = {}, children) {
  if (import_vue_demi.isVue2)
    return (0, import_vue_demi.h)(type, options, children);
  const { props, domProps, on, attrs, ...extraOptions } = options;
  const ons = adaptOnsV3(on);
  const params = { ...extraOptions, ...props, ...domProps, ...ons, ...attrs };
  return (0, import_vue_demi.h)(type, params, children);
}
var utils_default = h;

// src/LiteYouTubeEmbed.ts
function runCommand(iframe, func) {
  if (iframe === null)
    throw new Error("iframe element not instantiated.");
  iframe.contentWindow?.postMessage(`{"event":"command","func":"${func}","args":""}`, "*");
}
function linkPreconnect(href) {
  return utils_default("link", {
    attrs: { rel: "preconnect", href }
  });
}
var LiteYouTubeEmbed_default = (0, import_vue_demi2.defineComponent)({
  props: {
    announce: {
      type: String,
      required: false,
      default: "Watch"
    },
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    activatedClass: {
      type: String,
      required: false,
      default: "lyt-activated"
    },
    adNetwork: {
      type: Boolean,
      required: false,
      default: true
    },
    iframeClass: {
      type: String,
      required: false,
      default: ""
    },
    cookie: {
      type: Boolean,
      required: false,
      default: false
    },
    params: {
      type: String,
      required: false,
      default: ""
    },
    playerClass: {
      type: String,
      required: false,
      default: "lty-playbtn"
    },
    playlist: {
      type: Boolean,
      required: false,
      default: false
    },
    playlistCoverId: {
      type: String,
      required: false,
      default: ""
    },
    poster: {
      type: String,
      required: false,
      default: "hqdefault"
    },
    wrapperClass: {
      type: String,
      required: false,
      default: "yt-lite"
    },
    muted: {
      type: Boolean,
      required: false,
      default: false
    },
    thumbnail: {
      type: String,
      required: false
    },
    webp: {
      type: Boolean,
      required: false,
      default: false
    },
    rel: {
      type: String,
      required: false,
      default: "preload"
    },
    aspectHeight: {
      type: Number,
      required: false,
      default: 9
    },
    aspectWidth: {
      type: Number,
      required: false,
      default: 16
    },
    autoplay: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  emits: ["iframeAdded"],
  setup(props, { emit, expose }) {
    const preconnected = (0, import_vue_demi2.ref)(false);
    const iframe = (0, import_vue_demi2.ref)(false);
    const iframeElement = (0, import_vue_demi2.ref)(null);
    const videoId = (0, import_vue_demi2.computed)(() => encodeURIComponent(props.id));
    const paramsImp = (0, import_vue_demi2.computed)(() => `&${props.params}` || "");
    const mutedImp = (0, import_vue_demi2.computed)(() => props.muted ? "&mute=1" : "");
    const format = (0, import_vue_demi2.computed)(() => props.webp ? "webp" : "jpg");
    const vi = (0, import_vue_demi2.computed)(() => props.webp ? "vi_webp" : "vi");
    const videoPlaylistCoverId = (0, import_vue_demi2.computed)(() => typeof props.playlistCoverId === "string" ? encodeURIComponent(props.playlistCoverId) : null);
    const posterUrl = (0, import_vue_demi2.computed)(() => {
      return props.thumbnail || (!props.playlist ? `https://i.ytimg.com/${vi.value}/${videoId.value}/${props.poster}.${format.value}` : `https://i.ytimg.com/${vi.value}/${videoPlaylistCoverId.value}/${props.poster}.${format.value}`);
    });
    const ytUrl = (0, import_vue_demi2.computed)(() => props.cookie ? "https://www.youtube.com" : "https://www.youtube-nocookie.com");
    const iframeSrc = (0, import_vue_demi2.computed)(() => !props.playlist ? `${ytUrl.value}/embed/${videoId.value}?autoplay=${props.autoplay ? 1 : 0}&enablejsapi=1&state=1${mutedImp.value}${paramsImp.value}` : `${ytUrl.value}/embed/videoseries?autoplay=${props.autoplay ? 1 : 0}&enablejsapi=1&list=${videoId.value}${mutedImp.value}${paramsImp.value}`);
    function addIframe() {
      if (iframe.value)
        return;
      iframe.value = true;
      emit("iframeAdded");
    }
    function warmConnections() {
      if (preconnected.value)
        return;
      preconnected.value = true;
    }
    expose({
      getPlayerInstance() {
        return iframeElement.value;
      },
      stopVideo() {
        runCommand(iframeElement.value, "stopVideo");
      },
      pauseVideo() {
        runCommand(iframeElement.value, "pauseVideo");
      },
      playVideo() {
        runCommand(iframeElement.value, "playVideo");
      },
      warmConnections,
      addIframe
    });
    const vnodeList = () => [
      utils_default("link", {
        attrs: {
          rel: props.rel,
          href: posterUrl.value,
          as: "image"
        }
      }),
      preconnected.value ? linkPreconnect(ytUrl.value) : null,
      preconnected.value ? linkPreconnect("https://www.google.com") : null,
      props.adNetwork ? linkPreconnect("https://static.doubleclick.net") : null,
      props.adNetwork ? linkPreconnect("https://googleads.g.doubleclick.net") : null,
      utils_default(
        "article",
        {
          on: {
            pointerover: warmConnections,
            click: addIframe
          },
          class: `${props.wrapperClass} ${iframe.value ? props.activatedClass : ""}`,
          attrs: { "data-title": props.title },
          style: {
            "backgroundImage": `url(${posterUrl.value})`,
            "--aspect-ratio": `${props.aspectHeight / props.aspectWidth * 100}%`
          }
        },
        [
          // Play button
          utils_default("button", {
            class: props.playerClass,
            attrs: {
              "type": "button",
              "aria-label": `${props.announce} ${props.title}`
            }
          }),
          // Iframe
          iframe.value ? utils_default("iframe", {
            ref: iframeElement,
            class: props.iframeClass,
            attrs: {
              title: props.title,
              width: 560,
              height: 315,
              frameborder: 0,
              allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
              allowfullscreen: true,
              src: iframeSrc.value
            }
          }) : null
        ]
      )
    ];
    if (import_vue_demi2.isVue2)
      return () => utils_default("Fragment", {}, vnodeList());
    return () => vnodeList();
  }
});

// src/index.ts
var src_default = LiteYouTubeEmbed_default;
/*!
 * Original code by Ibrahim Cesar
 * MIT Licensed, Copyright 2022 Ibrahim Cesar, see https://github.com/ibrahimcesar/react-lite-youtube-embed/blob/main/LICENSE for details
 *
 * Credits to the team:
 * https://github.com/ibrahimcesar/react-lite-youtube-embed/blob/main/src/lib/index.tsx
 */
//# sourceMappingURL=index.cjs.map