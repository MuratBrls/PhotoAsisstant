import { GoogleGenAI, Type } from "@google/genai";
import { CompatibilityResult, ShootPlan, PackingListResponse } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to check if API key is present (basic check)
export const hasApiKey = () => !!apiKey;

export const getGearCompatibility = async (cameraModel: string): Promise<CompatibilityResult> => {
  const model = "gemini-2.5-flash";
  
  const response = await ai.models.generateContent({
    model,
    contents: `Şu kamera modelini analiz et: ${cameraModel}. Uyumlu lensleri (prime ve zoom), temel aksesuarları (bataryalar, flaş) ve önerilen medyayı (SD/CFexpress) listele. Lens yuvası (mount) ve sensör boyutunu belirt.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          cameraName: { type: Type.STRING },
          mountType: { type: Type.STRING, description: "Örn: E-mount, RF-mount" },
          sensorSize: { type: Type.STRING, description: "Örn: Full Frame, APS-C" },
          lenses: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                type: { type: Type.STRING, description: "Örn: Prime, Zoom, Makro" },
                priceRange: { type: Type.STRING },
                reason: { type: Type.STRING, description: "Türkçe açıklama" }
              }
            }
          },
          accessories: {
             type: Type.ARRAY,
             items: {
               type: Type.OBJECT,
               properties: {
                 name: { type: Type.STRING },
                 type: { type: Type.STRING },
                 reason: { type: Type.STRING, description: "Türkçe açıklama" }
               }
             }
          },
          media: {
             type: Type.ARRAY,
             items: {
               type: Type.OBJECT,
               properties: {
                 name: { type: Type.STRING },
                 type: { type: Type.STRING },
                 reason: { type: Type.STRING, description: "Türkçe açıklama" }
               }
             }
          }
        }
      }
    }
  });

  if (!response.text) throw new Error("No response from AI");
  return JSON.parse(response.text) as CompatibilityResult;
};

export const getShootPlan = async (
  shootType: string,
  location: string,
  timeOfDay: string,
  weather: string
): Promise<ShootPlan> => {
  const model = "gemini-2.5-flash";
  
  const prompt = `${shootType} türünde bir çekim için fotoğrafçılık planı oluştur.
  Konum: ${location}.
  Zaman: ${timeOfDay}.
  Hava Durumu: ${weather}.
  Özel kamera ayarları, gerekli ekipmanlar, aydınlatma tavsiyeleri ve kompozisyon ipuçları ekle. Yanıtlar Türkçe olsun.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          lightingSetup: { type: Type.STRING, description: "Detaylı aydınlatma tavsiyesi (Türkçe)" },
          cameraSettings: {
            type: Type.OBJECT,
            properties: {
              aperture: { type: Type.STRING, description: "Diyafram" },
              shutterSpeed: { type: Type.STRING, description: "Enstantane" },
              iso: { type: Type.STRING },
              whiteBalance: { type: Type.STRING, description: "Beyaz Dengesi" },
              focusMode: { type: Type.STRING, description: "Odak Modu" },
            }
          },
          gearList: { type: Type.ARRAY, items: { type: Type.STRING } },
          compositionTips: { type: Type.ARRAY, items: { type: Type.STRING } },
          goldenHourNote: { type: Type.STRING, description: "Altın saat notu" }
        }
      }
    }
  });

  if (!response.text) throw new Error("No response from AI");
  return JSON.parse(response.text) as ShootPlan;
};

export const getPackingList = async (
  destination: string,
  duration: string,
  activity: string
): Promise<PackingListResponse> => {
  const model = "gemini-2.5-flash";
  
  const prompt = `${duration} süreliğine ${destination} konumuna yapılacak bir gezi için fotoğrafçılık çanta hazırlama listesi oluştur. Ana aktivite: ${activity}. Hava durumunu ve yedek ekipmanları dikkate al. Yanıtlar Türkçe olsun.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tripName: { type: Type.STRING },
          weatherWarning: { type: Type.STRING, description: "Hava durumu uyarısı" },
          categories: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                categoryName: { type: Type.STRING },
                items: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      item: { type: Type.STRING },
                      essential: { type: Type.BOOLEAN },
                      notes: { type: Type.STRING }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  if (!response.text) throw new Error("No response from AI");
  return JSON.parse(response.text) as PackingListResponse;
};

export const getSettingsAdvice = async (naturalLanguageQuery: string): Promise<string> => {
  const model = "gemini-2.5-flash";
  const response = await ai.models.generateContent({
    model,
    contents: `Sen uzman bir fotoğrafçılık mentorusun. Kamera ayarları veya teknikleriyle ilgili şu soruyu kısa, öz ve yardımsever bir şekilde Türkçe cevapla: "${naturalLanguageQuery}"`,
  });
  
  return response.text || "Tavsiye oluşturulamadı.";
};