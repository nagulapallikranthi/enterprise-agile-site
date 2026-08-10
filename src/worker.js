const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { "content-type": "application/json; charset=utf-8" }
});

export default {
  async fetch(request, env, context) {
    const url = new URL(request.url);
    if (url.pathname !== "/api/events" || request.method !== "POST") {
      return env.ASSETS.fetch(request);
    }

    let event;
    try {
      event = await request.json();
    } catch {
      return json({ accepted: false }, 400);
    }

    const safeEvent = {
      action: String(event.action || "unknown").slice(0, 80),
      label: String(event.label || "unlabelled").slice(0, 120),
      page: String(event.page || "/").slice(0, 240),
      target: event.target ? String(event.target).slice(0, 300) : null,
      referrer: event.referrer ? String(event.referrer).slice(0, 300) : null,
      sessionId: String(event.sessionId || "anonymous").slice(0, 80),
      occurredAt: String(event.occurredAt || new Date().toISOString()).slice(0, 40)
    };

    if (env.NOTIFICATION_WEBHOOK_URL) {
      context.waitUntil(fetch(env.NOTIFICATION_WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          text: `${safeEvent.label} on ${safeEvent.page} at ${safeEvent.occurredAt}. Visitor: Anonymous.`,
          event: safeEvent
        })
      }));
    }

    return json({ accepted: true });
  }
};
