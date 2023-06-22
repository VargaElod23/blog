import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

async function fetchCommitCountOfLanguage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const since = req.query.since;
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - Number(since));
  try {
    const user = process.env.NEXT_PUBLIC_GH_USER || "VargaElod23";
    const response = await axios.get(
      `https://api.github.com/users/${user}/events?since=${currentDate}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    const activity = response.data;
    const relevantDetails = activity.map((item: any) => {
      let commitMessages = [];
      if (item.payload.commits !== undefined) {
        console.log(item.payload.commits.length);
        commitMessages = item.payload.commits
          .filter(
            (commit) => commit.author.name.toLowerCase() === user.toLowerCase()
          )
          .map((commit) => commit.message);
      }
      return commitMessages.length;
    });
    res.json(relevantDetails.reduce((a, b) => a + b, 0));
    // Further processing or handling of the activity data
    // ...
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);
  }
}
export default fetchCommitCountOfLanguage;
