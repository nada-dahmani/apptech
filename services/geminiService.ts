import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

// Initialize only if key exists to prevent errors during render if missing
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const sendMessageToGemini = async (message: string, context: string): Promise<string> => {
  if (!ai) {
    return "Désolé, je ne suis pas connecté au serveur d'IA (Clé API manquante).";
  }

  try {
    const model = ai.models;
    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: `Tu es CyberBot, l'assistant expert de CyberTech, une boutique de matériel informatique haut de gamme.
        Ta mission est d'aider les clients à choisir des composants PC, des périphériques ou des ordinateurs portables.
        
        Contexte des produits disponibles: ${context}
        
        Règles:
        1. Réponds toujours en Français.
        2. Sois concis, technique mais accessible, et enthousiaste (ton "Gamer").
        3. Si l'utilisateur cherche un produit spécifique, vérifie s'il est dans le contexte fourni.
        4. Tu peux expliquer les termes techniques (DPI, Taux de rafraîchissement, Ray Tracing).
        5. Ne mentionne pas de produits concurrents non listés dans le magasin si possible, concentre-toi sur ce que nous avons.
        `,
      }
    });

    return response.text || "Je n'ai pas pu générer de réponse.";
  } catch (error) {
    console.error("Erreur Gemini:", error);
    return "Une erreur est survenue lors de la communication avec l'IA. Veuillez réessayer.";
  }
};