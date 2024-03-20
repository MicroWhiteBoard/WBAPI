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
export declare function createWhiteboard(parameters: WhiteboardParameters): Promise<Whiteboard>;
export declare class WhiteboardLoader {
    render(parameters: WhiteboardParameters): Promise<Whiteboard>;
}
export {};
