import { ControlState } from "@/common/types/redux_initialstate_types";
import { supabaseClient } from "@/supabase/client";

export const getWordsFromClient = async (payload: ControlState) => {
    const { difficult, totalWords } = payload
    let { data, error } = await supabaseClient
        .rpc('generate_random_words', {
            difficult_words: difficult,
            limit_words: totalWords
        })
    if (error) console.log(error)
    return data;
}

export const getQuoteFromClient = async (payload: ControlState) => {
    const { difficult } = payload
    let { data, error } = await supabaseClient
        .rpc('generate_random_quote', {
            difficult_quote: difficult,
        })
    if (error) console.log(error)
    return data;
}