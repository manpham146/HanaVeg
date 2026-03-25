"use server";

import translate from "google-translate-api-x";

interface TranslateResult {
  en: string;
  zh: string;
}

/**
 * Dịch text tiếng Việt sang English + 中文 bằng Google Translate.
 * Không cần API key. Trả về { en, zh }.
 */
export async function translateText(text: string): Promise<TranslateResult> {
  if (!text.trim()) {
    return { en: "", zh: "" };
  }

  try {
    const [enResult, zhResult] = await Promise.all([
      translate(text, { from: "vi", to: "en" }),
      translate(text, { from: "vi", to: "zh-CN" }),
    ]);

    return {
      en: enResult.text || "",
      zh: zhResult.text || "",
    };
  } catch (error) {
    console.error("Translation error:", error);
    return { en: "", zh: "" };
  }
}

/**
 * Dịch text tiếng Việt sang 1 ngôn ngữ đích.
 * @param to - mã ngôn ngữ: "en" hoặc "zh-CN"
 */
export async function translateSingle(
  text: string,
  to: string,
  from: string = "vi"
): Promise<string> {
  if (!text.trim()) return "";
  try {
    const result = await translate(text, { from, to });
    return result.text || "";
  } catch (error) {
    console.error("Translation error:", error);
    return "";
  }
}
