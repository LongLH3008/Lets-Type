import { Difficult, TypingMode } from "./control__enums";
import { StatsTypedWord } from "./stats__types";
import { TypedWord } from "./typing__types";

export interface ControlState {
    keyboard: boolean
    mode: TypingMode;
    timer: number,
    totalWords: number;
    difficult: Difficult
    typing: boolean
    backspace: boolean
}

export interface TypingState {
    typed: TypedWord[];
    scrollToViewWordIndex: number;
}

export interface StatsState extends StatsTypedWord {
    wpmRecords: {
        wpm: string;
        rawWpm: string;
    }[]
    started: number;
    ended: number;
    backspace: number
}

export interface AuthState {
    openAuthBox: boolean;
    session: SupabaseSessionAuthState | null
}

export interface SupabaseSessionAuthState {
    access_token: string;
    token_type: string;
    expires_in: number;
    expires_at: number;
    refresh_token: string;
    user: {
        id: string;
        aud: string;
        role: string;
        email: string;
        email_confirmed_at: string;
        phone: string;
        confirmation_sent_at: string;
        confirmed_at: string;
        recovery_sent_at: string;
        last_sign_in_at: string;
        app_metadata: {
            provider: string;
            providers: string[];
        };
        user_metadata: {
            avatar_url: string;
            email: string;
            email_verified: boolean;
            full_name: string;
            iss: string;
            name: string;
            phone_verified: boolean;
            picture: string;
            preferred_username: string;
            provider_id: string;
            sub: string;
            user_name: string;
        };
        identities: {
            identity_id: string;
            id: string;
            user_id: string;
            identity_data: {
                avatar_url?: string;
                email: string;
                email_verified: boolean;
                full_name?: string;
                iss?: string;
                name?: string;
                phone_verified: boolean;
                picture?: string;
                provider_id?: string;
                sub: string;
            };
            provider: string;
            last_sign_in_at: string;
            created_at: string;
            updated_at: string;
            email: string;
        }[];
    };
    role: string;
    aal: string;
    amr: {
        method: string;
        timestamp: number;
    }[];
    session_id: string;
    is_anonymous: boolean;
}
