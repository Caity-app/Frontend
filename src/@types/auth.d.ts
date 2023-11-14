export type AuthContextType {
    token: string | null;
    updateToken: (token: string) => void;
    handleLogout: () => void;
}