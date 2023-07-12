import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import openai from "../../../utils/openai";

async function summarizeGitHubActivity(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Cache-Control", "s-maxage=86400");
  const { since } = req.query;
  const activity = await axios.get(
    `${process.env.HOST}${
      process.env.PORT ? `:${process.env.PORT}` : ""
    }/api/github/activity?since=${since}`
  );

  const summary = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Summarize in an unordered list the entries of the next GitHub activity of the user ${
          process.env.NEXT_PUBLIC_GH_USER
        } in a clear, non-technical manner in a single sentence. Try to understand what is he implementing or reviewing with these changes: \n ${JSON.stringify(
          activity.data
        )}`,
      },
    ],
  });
  res.json({ summary: summary.data.choices[0].message });
}
export default summarizeGitHubActivity;
