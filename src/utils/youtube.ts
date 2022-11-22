export function parseYouTubeURL(url: string):
  | {
      videoId: string;
      startTime?: string;
    }
  | undefined {
  if (!url) {
    return undefined;
  }

  try {
    const parsedURL = new URL(url);

    if (
      (parsedURL.hostname === "www.youtube.com" ||
        parsedURL.hostname === "www.youtube.com") &&
      parsedURL.searchParams.get("v") != null
    ) {
      return {
        videoId: parsedURL.searchParams.get("v") as string,
        startTime: parsedURL.searchParams.get("start") || undefined,
      };
    }

    if (parsedURL.hostname === "youtu.be" && parsedURL.pathname != null) {
      return {
        videoId: parsedURL.pathname.split("/").pop() as string,
        startTime: parsedURL.searchParams.get("t") || undefined,
      };
    }

    return undefined;
  } catch (_err) {
    return undefined;
  }
}
