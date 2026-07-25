import { Session } from "../models/Session.js";
import { Question } from "../models/Question.js";

export const createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } =
      req.body;

    const userId = req.user.id;

    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });

        return question;
      }),
    );

    session.questions = questionDocs;
    await session.save();

    res.status(201).json({
      success: true,
      session,
    });
  } catch (error) {
    console.error("Server Error", error);
    process.exit(1);
  }
};

export const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({
      user: req.user.id,
    })
      .sort({ createdAt: -1 })
      .populate("questions");

    res.status(200).json(sessions);
  } catch (error) {
    console.error("Server Error", error);
    process.exit(1);
  }
};

export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: {
          sort: {
            isPinned: -1,
            createdAt: 1,
          },
        },
      })
      .exec();

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    res.status(200).json({
      success: true,
      session,
    });
  } catch (error) {
    console.error("Server Error", error);
    process.exit(1);
  }
};

export const deleteSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    // Check if the logged-in user owns this session
    if (session.user.toString() !== req.user.id) {
      return res.status(401).json({
        message: "Not authorized to delete this session",
      });
    }

    // Delete all questions linked to this session
    await Question.deleteMany({
      session: session._id,
    });

    // Delete the session
    await session.deleteOne();

    res.status(200).json({
      message: "Session deleted successfully",
    });
  } catch (error) {
    console.error("Server Error", error);
    process.exit(1);
  }
};
