import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import openai from "../../../utils/openai";

async function summarizeOrgGitHubActivity(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Cache-Control", "s-maxage=86400");
  const activity = await axios.get(
    `${process.env.HOST}${
      process.env.PORT ? `:${process.env.PORT}` : ""
    }/api/github/orga`
  );

  const chunks: string[][] = [];
  chunks[0] = [];
  let chunkCharCount = 0;
  let i = 0;
  for (const item of activity.data) {
    const chunk = JSON.stringify(item);
    const charCount = chunk.length;
    const MAX_CHARACTERS = 10000;
    if (chunkCharCount + charCount < MAX_CHARACTERS) {
      chunks[i].push(chunk);
      chunkCharCount += charCount;
    } else {
      console.log(`Chunk ${i} reached ${MAX_CHARACTERS} characters`);
      i++;
      chunks[i] = [];
      chunks[i].push(chunk);
      chunkCharCount = charCount;
    }
  }
  console.log(`Created ${i} chunks`);

  const summaries = [];
  for (let j = 0; j <= i; j++) {
    const chunk = chunks[j].join("\n");
    console.log(
      `Creating summary ${j}. Pushing ${chunk.length} characters to OpenAI`
    );
    try {
      const summary = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Understand the GitHub activity of the orga ${
              process.env.NEXT_PUBLIC_GH_ORGA
            }  from the GitHub API input above: \n ${JSON.stringify(
              chunk
            )}. If there are multiple actions for the same repo please group them accordingly. Understand the features the team worked on and and deliver the updates in an essay form that is easily tweetable and introduce it with: "This week at Taraxa: "`,
          },
        ],
      });
      summaries.push(summary.data.choices[0].message);
      console.log(summary.data.choices[0].message);
      console.log(`Created summary ${j}`);
    } catch (e) {
      console.error(e.message);
      res.status(500).json({ error: e.message });
    }
  }
  res.json(summaries);
}
export default summarizeOrgGitHubActivity;
