type Params = {
  container: HTMLElement;
  baseUrl: string;
  boardId: string;
  userToken: string;
  width?: string;
  height?: string;
};

interface WhiteboardModule {
  render(params: Params): Promise<void>;
  dispose(): Promise<void>;
  setAuthToken(accessToken: string): void;
}

export class WhiteboardModuleView implements WhiteboardModule {
  private iframe: HTMLIFrameElement | undefined;

  render(params: Params): Promise<void> {
    return new Promise((resolve) => {
      const { container, baseUrl, boardId } = params;
      this.iframe = document.createElement("iframe");
      this.iframe.src = `${baseUrl}/boards/${boardId}`;
      this.iframe.id = "iframe";
      this.iframe.width = params.width || "100%";
      this.iframe.height = params.height || "100%";
      this.iframe.sandbox.add("allow-same-origin", "allow-scripts");
      container.appendChild(this.iframe);
    });
  }

  setAuthToken(accessToken: string): void {
    const message = {
      pattern: "setAuthToken",
      payload: {
        accessToken,
      },
    };
    this.iframe?.contentWindow?.postMessage(message, "*");
  }

  async dispose(): Promise<void> {
    if (this.iframe) {
      const container = this.iframe.parentNode;
      if (container) {
        container.removeChild(this.iframe);
      }
    }
  }
}
