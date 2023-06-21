import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

async function fetchCommitCountOfLanguage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const language = req.query.language;
  const currentDate = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(currentDate.getDate() - 7);
  let totalCommits = 0;
  try {
    const user = process.env.NEXT_PUBLIC_GH_USER || "VargaElod23";
    const searchResponse = await axios.get(
      `https://api.github.com/search/commits?q=author:${user}`
    );

    // Step 2: Process the search results
    const commits = searchResponse.data.items;
    // Step 4: Filter commits by language
    console.log(commits[0]);

    // Step 5: Add the number of commits to the total
    totalCommits += commits.length;
    res.json({ totalCommits });
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);
  }
}
export default fetchCommitCountOfLanguage;
