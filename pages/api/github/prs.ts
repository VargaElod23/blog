import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { prsQuery } from "./queries";

async function fetchPRContributions(req: NextApiRequest, res: NextApiResponse) {
  const since = req.query.since;
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - Number(since));
  try {
    const user = process.env.NEXT_PUBLIC_GH_USER || "VargaElod23";

    const url = `https://api.github.com/graphql`;
    const variables = {
      username: user,
      since: currentDate.toISOString(),
    };
    console.log(variables);
    const response = await axios.post(
      url,
      { query: prsQuery, variables },
      {
        headers: {
          Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );
    console.log(response.data);
    const activity =
      response.data.data.user.contributionsCollection
        .totalPullRequestContributions +
      response.data.data.user.contributionsCollection
        .totalPullRequestReviewContributions;
    res.json(activity);
    // Further processing or handling of the activity data
    // ...
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);
  }
}
export default fetchPRContributions;
