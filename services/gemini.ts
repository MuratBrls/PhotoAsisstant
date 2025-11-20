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
    contents: `Analyze the camera model: ${cameraModel}. Provide compatible lenses (prime and zoom), essential accessories (batteries, flash), and recommended media (SD/CFexpress).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          cameraName: { type: Type.STRING },
          mountType: { type: Type.STRING },
          sensorSize: { type: Type.STRING },
          lenses: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                type: { type: Type.STRING, description: "e.g., Prime, Zoom, Macro" },
                priceRange: { type: Type.STRING },
                reason: { type: Type.STRING }
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
                 reason: { type: Type.STRING }
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
                 reason: { type: Type.STRING }
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
  
  const prompt = `Create a photography shoot plan for a ${shootType} shoot.
  Location: ${location}.
  Time: ${timeOfDay}.
  Weather: ${weather}.
  Include specific settings, gear, lighting advice, and composition tips.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          lightingSetup: { type: Type.STRING, description: "Detailed lighting advice" },
          cameraSettings: {
            type: Type.OBJECT,
            properties: {
              aperture: { type: Type.STRING },
              shutterSpeed: { type: Type.STRING },
              iso: { type: Type.STRING },
              whiteBalance: { type: Type.STRING },
              focusMode: { type: Type.STRING },
            }
          },
          gearList: { type: Type.ARRAY, items: { type: Type.STRING } },
          compositionTips: { type: Type.ARRAY, items: { type: Type.STRING } },
          goldenHourNote: { type: Type.STRING }
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
  
  const prompt = `Create a photography packing list for a trip to ${destination} for ${duration}. Primary activity: ${activity}. Consider weather and backups.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tripName: { type: Type.STRING },
          weatherWarning: { type: Type.STRING },
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
    contents: `You are an expert photography mentor. Answer this question about camera settings or technique concisely but helpfully: "${naturalLanguageQuery}"`,
  });
  
  return response.text || "Could not generate advice.";
};
