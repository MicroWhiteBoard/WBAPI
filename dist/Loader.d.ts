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
export declare class WhiteboardModuleView implements WhiteboardModule {
    private iframe;
    render(params: Params): Promise<void>;
    setAuthToken(accessToken: string): void;
    dispose(): Promise<void>;
}
export {};
