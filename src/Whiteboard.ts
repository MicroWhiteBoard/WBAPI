interface WhiteboardParameters {
  container: HTMLElement;
  baseUrl: string;
  boardId: string;
  userToken: string;
}

interface Whiteboard {
  updateUserToken(userToken: string): void;
  dispose(): void;
}

export function createWhiteboard(
  parameters: WhiteboardParameters
): Promise<Whiteboard> {
  const iframe: HTMLIFrameElement = document.createElement("iframe");
  iframe.sandbox.add("allow-same-origin");
  iframe.sandbox.add("allow-scripts");
  iframe.src = `${parameters.baseUrl}/boards/${encodeURIComponent(
    parameters.boardId
  )}`;
  iframe.width = "100%";
  iframe.height = "100%";
  iframe.style.border = "none";
  iframe.style.margin = "0";
  iframe.style.padding = "0";

  const whiteboard = {
    updateUserToken: (userToken: string) => {
      iframe.contentWindow?.postMessage(
        {
          type: "updateUserToken",
          userToken: userToken,
        },
        "*"
      );
    },
    dispose: () => {
      if (iframe) {
        parameters.container.removeChild(iframe);
      }
    },
  };

  parameters.container.appendChild(iframe);

  return new Promise<Whiteboard>((resolve, reject) => {
    function loadHandler() {
      setupKeyboardEventTunnel(parameters.container, iframe);
      iframe.removeEventListener("load", loadHandler);
      resolve(whiteboard);
    }

    iframe.addEventListener("load", loadHandler);
  });
}

export class WhiteboardLoader {
  async render(parameters: WhiteboardParameters): Promise<Whiteboard> {
    return createWhiteboard(parameters);
  }
}

function setupKeyboardEventTunnel(
  container: HTMLElement,
  iframe: HTMLIFrameElement
): void {
  function keyboardEventHandler(event: KeyboardEvent) {
    iframe.contentWindow?.postMessage(serializeKeyboardEvent(event), "*");
  }

  document.addEventListener("keydown", keyboardEventHandler);
  document.addEventListener("keyup", keyboardEventHandler);

  window.addEventListener("message", (event: MessageEvent) => {
    if (
      event.source === iframe.contentWindow &&
      event.data?.type === "keyboardEvent"
    ) {
      const keyboardEvent = new KeyboardEvent(
        event.data.eventType,
        event.data.eventData
      );
      container.dispatchEvent(keyboardEvent);
    }
  });
}

function serializeKeyboardEvent(event: KeyboardEvent) {
  return {
    type: "keyboardEvent",
    eventType: event.type,
    eventData: {
      key: event.key,
      code: event.code,
      ctrlKey: event.ctrlKey,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      metaKey: event.metaKey,
      repeat: event.repeat,
    },
  };
}
