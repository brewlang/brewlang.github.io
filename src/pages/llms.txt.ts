// llms.txt describes the language, so it lives in the brewlang repo next to this one
import llms from "../../../brewlang/docs/llms.txt?raw";

export const GET = () => new Response(llms, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
