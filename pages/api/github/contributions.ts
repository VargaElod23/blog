import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { contributionsQuery } from "./queries";

async function fetchGeneralContributions(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
    const response = await axios.post(
      url,
      { query: contributionsQuery, variables },
      {
        headers: {
          Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );
    const activity =
      response.data.data.user.contributionsCollection.contributionCalendar
        .totalContributions;
    res.json(activity);
    // Further processing or handling of the activity data
    // ...
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);
  }
}
export default fetchGeneralContributions;
