import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import {
  questionAnswerPrompt,
  conceptExplainPrompt,
} from "../utils/prompts.js";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// @desc    Generate interview questions and answers using Gemini
// @route   POST /api/ai/generate-questions
// @access  Private
export const generateInterviewQuestions = async (req, res) => {
  try {
    //  console.log("Request Body:", req.body);
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
    
    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }
    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions,
    );
    // console.log(prompt)
    const response = await genAI.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });
    // console.log(response)
    const rawText = response.text;
    // console.log("========== GEMINI RESPONSE ==========");
    // console.log(rawText);
    // console.log("=====================================");

    // Clean it: Remove ```json and ``` from beginning and end
    const cleanedText = rawText
      .replace(/^```json\s*/, "") // remove starting ```json
      .replace(/```$/, "") // remove ending ```
      .trim(); // remove extra spaces

    // Now safe to parse
    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
      stack: error.stack,
    });
  }
};

// @desc    Generate explains a interview question
// @route   POST /api/ai/generate-explanation
// @access  Private
export const generateConceptExplaination = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const prompt = conceptExplainPrompt(question);

    const response = await genAI.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });

    let rawText = response.text;

    // Clean it: Remove ```json and ``` from beginning and end
    const cleanedText = rawText
      .replace(/^```json\s*/, "") // remove starting ```json
      .replace(/```$/, "") // remove ending ```
      .trim(); // remove extra spaces

    // Now safe to parse
    const data = JSON.parse(cleanedText);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};
