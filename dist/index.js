// src/LiteYouTubeEmbed.ts
import { computed, defineComponent, isVue2 as isVue22, ref } from "vue-demi";

// src/utils.ts
import { h as hDemi, isVue2 } from "vue-demi";
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
  if (isVue2)
    return hDemi(type, options, children);
  const { props, domProps, on, attrs, ...extraOptions } = options;
  const ons = adaptOnsV3(on);
  const params = { ...extraOptions, ...props, ...domProps, ...ons, ...attrs };
  return hDemi(type, params, children);
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
var LiteYouTubeEmbed_default = defineComponent({
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
    const preconnected = ref(false);
    const iframe = ref(false);
    const iframeElement = ref(null);
    const videoId = computed(() => encodeURIComponent(props.id));
    const paramsImp = computed(() => `&${props.params}` || "");
    const mutedImp = computed(() => props.muted ? "&mute=1" : "");
    const format = computed(() => props.webp ? "webp" : "jpg");
    const vi = computed(() => props.webp ? "vi_webp" : "vi");
    const videoPlaylistCoverId = computed(() => typeof props.playlistCoverId === "string" ? encodeURIComponent(props.playlistCoverId) : null);
    const posterUrl = computed(() => {
      return props.thumbnail || (!props.playlist ? `https://i.ytimg.com/${vi.value}/${videoId.value}/${props.poster}.${format.value}` : `https://i.ytimg.com/${vi.value}/${videoPlaylistCoverId.value}/${props.poster}.${format.value}`);
    });
    const ytUrl = computed(() => props.cookie ? "https://www.youtube.com" : "https://www.youtube-nocookie.com");
    const iframeSrc = computed(() => !props.playlist ? `${ytUrl.value}/embed/${videoId.value}?autoplay=${props.autoplay ? 1 : 0}&enablejsapi=1&state=1${mutedImp.value}${paramsImp.value}` : `${ytUrl.value}/embed/videoseries?autoplay=${props.autoplay ? 1 : 0}&enablejsapi=1&list=${videoId.value}${mutedImp.value}${paramsImp.value}`);
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
    if (isVue22)
      return () => utils_default("Fragment", {}, vnodeList());
    return () => vnodeList();
  }
});

// src/index.ts
var src_default = LiteYouTubeEmbed_default;
export {
  src_default as default
};
/*!
 * Original code by Ibrahim Cesar
 * MIT Licensed, Copyright 2022 Ibrahim Cesar, see https://github.com/ibrahimcesar/react-lite-youtube-embed/blob/main/LICENSE for details
 *
 * Credits to the team:
 * https://github.com/ibrahimcesar/react-lite-youtube-embed/blob/main/src/lib/index.tsx
 */
//# sourceMappingURL=index.js.map