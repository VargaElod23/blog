import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { statsQuery } from "./queries";

async function fetchStats(req: NextApiRequest, res: NextApiResponse) {
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
    const body = { query: statsQuery, variables };
    const response = await axios.post(url, body, {
      headers: {
        Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      },
    });
    const { data } = response;
    if (data.errors !== undefined) {
      res.status(500).json({ error: data.errors[0].message });
    }
    const commits =
      data.data.user.contributionsCollection.totalCommitContributions;
    const prs =
      data.data.user.contributionsCollection.totalPullRequestContributions +
      data.data.user.contributionsCollection
        .totalPullRequestReviewContributions;
    const contributions =
      data.data.user.contributionsCollection.contributionCalendar
        .totalContributions;
    const issues =
      data.data.user.contributionsCollection.totalIssueContributions;
    res.json({ commits, prs, contributions, issues });
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);
  }
}
export default fetchStats;
