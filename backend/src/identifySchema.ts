import { z } from 'zod';
import { MATERIALS } from '../../shared/types';
import type { IdentifyResult } from '../../shared/types';

export const identifyResultSchema = z.object({
  items: z.array(z.object({
    material: z.enum(MATERIALS as [string, ...string[]]),
    itemType: z.string(),
    estimatedGrams: z.number(),
    recyclable: z.boolean(),
    rinseNeeded: z.boolean(),
    confidence: z.number().min(0).max(1),
  }) as unknown as z.ZodType<IdentifyResult>)
});

// OpenAI strict JSON schema format
export const OPENAI_IDENTIFY_SCHEMA = {
  name: "identify_recyclable_items",
  strict: true,
  schema: {
    type: "object",
    properties: {
      items: {
        type: "array",
        description: "List of recyclable or non-recyclable items found in the image. Maximum 4 items.",
        items: {
          type: "object",
          properties: {
            material: {
              type: "string",
              enum: MATERIALS,
              description: "The material of the item."
            },
            itemType: {
              type: "string",
              description: "A short, descriptive name for the item (e.g., '330ml drink can')."
            },
            estimatedGrams: {
              type: "number",
              description: "Estimated weight of the item in grams."
            },
            recyclable: {
              type: "boolean",
              description: "Whether the item is recyclable in Singapore's blue bins."
            },
            rinseNeeded: {
              type: "boolean",
              description: "Whether the item needs to be rinsed before recycling."
            },
            confidence: {
              type: "number",
              description: "Confidence score between 0.0 and 1.0."
            }
          },
          required: ["material", "itemType", "estimatedGrams", "recyclable", "rinseNeeded", "confidence"],
          additionalProperties: false
        }
      }
    },
    required: ["items"],
    additionalProperties: false
  }
};
