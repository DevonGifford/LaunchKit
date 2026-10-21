# Background video

Two sections can play a decorative video behind or beside their copy: the
video hero (`hero-video`) and the split call to action (`cta-split`, in place
of its photo). Both use one small client component,
`src/components/sections/background-video.tsx`. This page covers what it
does, and how the sample video was prepared so you can prepare your own.

## Using it

Both sections take the same `video` object:

```ts
{
  id: 'hero',
  type: 'hero-video',
  variant: 'card', // or 'overlay', the default
  title: 'Start every website on proven ground.',
  video: {
    src: '/marketing/videos/office-timelapse.mp4',
    // Optional: a lighter file for screens narrower than 768px.
    mobileSrc: '/marketing/videos/office-timelapse-mobile.mp4',
    // Optional, but recommended: the first frame as a still.
    poster: '/marketing/videos/office-timelapse-poster.webp',
  },
}
```

A split call to action takes an `image` or a `video`, not both; the content
tests reject a section with both.

## How it plays

- **Decorative only.** The video is muted, loops, plays inline, has no
  controls and is hidden from assistive technology. Use it for atmosphere,
  never for information the copy doesn't also give.
- **A pause button** sits in its corner. A video that moves for more than
  five seconds needs one (WCAG 2.2.2), and it's the only control.
- **Reduced motion.** When the visitor asks for less motion, the video never
  starts or downloads: the poster stands in, and the button offers to play it.
- **The poster first.** The poster is a `next/image` under the video, so it is
  resized for each screen. The video stays transparent until its first frame
  plays, then fades in over it. A slow network, a blocked autoplay (iOS Low
  Power Mode) or no JavaScript leaves the poster in place. Without a poster,
  the section's surface colour shows.
- **Only on screen.** Nothing is downloaded until the video is about to play
  (`preload="none"`), and it plays only while visible. A video further down
  the page loads when it is reached and stops when it scrolls away.
- **Contrast.** The overlay hero lays a wash of the emphasis colour over the
  video that keeps its copy at AA even over a white frame: 75% under 1024px,
  and a gradient from then that thins away from the copy. The card hero puts
  its copy on the surface colour instead, so its wash is light. The split call
  to action never puts copy on the video.

## Preparing a video

Decorative video should be short, silent and small. The sample in
`public/marketing/videos/` came from a 12-second, 3840×2024 VP9 WebM with a
stereo audio track, 15 MB in all. That's far more than a background needs,
and WebM with VP9 doesn't play everywhere, so it was re-encoded with
[ffmpeg](https://ffmpeg.org/) (a tool on your machine, not a dependency of
the site):

| File                           | Size    | Contents                                           |
| ------------------------------ | ------- | -------------------------------------------------- |
| `office-timelapse.mp4`         | 3.0 MB  | 1920×1012, H.264 High, 25 fps, about 2 Mbit/s      |
| `office-timelapse-mobile.mp4`  | 1.4 MB  | 720×1280 portrait crop from the centre, 0.9 Mbit/s |
| `office-timelapse-poster.webp` | 0.15 MB | The first frame, 1920×1012                         |

```sh
SRC=source.webm
OUT=public/marketing/videos
X='-an -c:v libx264 -preset veryslow -profile:v high -level:v 4.0 -pix_fmt yuv420p -crf 32 -movflags +faststart'

# Wide screens: 1920px wide, the height kept in proportion (and even).
ffmpeg -i $SRC -vf 'scale=1920:-2:flags=lanczos' $X $OUT/office-timelapse.mp4

# Phones: a 9:16 crop from the centre of the 3840×2024 frame, as object-fit:
# cover would show it, at 720×1280.
ffmpeg -i $SRC -vf 'crop=1138:2024:1351:0,scale=720:1280:flags=lanczos' $X $OUT/office-timelapse-mobile.mp4

# The poster: the first frame, so the handover to the video doesn't jump.
ffmpeg -i $SRC -frames:v 1 -vf 'scale=1920:-2:flags=lanczos' -c:v libwebp -quality 80 $OUT/office-timelapse-poster.webp
```

Why these settings:

- **H.264 in MP4** plays in every current browser, and muted autoplay is
  allowed for it everywhere. One format keeps the markup to a single source.
- **No audio** (`-an`). The video is always muted, so a sound track is only
  wasted bytes.
- **1920px wide** is enough for a full-screen hero at desktop sizes. 4K
  would cost several times the bytes for detail the wash hides.
- **CRF 32** at `veryslow`. Time-lapse footage, full of motion blur, is
  expensive to encode: in trial runs at `-preset slow`, CRF 28 came to 5.4 MB
  and CRF 24 to 8.3 MB, while CRF 32 looked the same at full size and is
  softened further by the wash. A light denoise saved little, so there is none.
- **`+faststart`** moves the index to the front of the file, so playback can
  begin before the download ends.
- **A portrait file for phones** saves more than half the download on
  cellular connections, and is sharper there than the wide file cropped by the
  browser. It is cut from the centre, the part `object-fit: cover` would show,
  so it matches the poster.
- **The default keyframe interval.** A loop never seeks, so more keyframes
  would only add size.

For your own footage, aim for under 4 MB on wide screens and under 2 MB on
phones, and keep loops short (10–15 seconds). Check the result with
`ffprobe -v error -show_entries stream=codec_name,width,height,bit_rate file.mp4`.
Keep source footage out of `public/`: everything there is deployed.
