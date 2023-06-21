import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

async function fetchGitHubActivity(req: NextApiRequest, res: NextApiResponse) {
  const days = Number(req.query.days);

  const currentDate = new Date();
  const daysAgo = new Date();
  daysAgo.setDate(currentDate.getDate() - days);

  try {
    const user = process.env.NEXT_PUBLIC_GH_USER || "VargaElod23";
    const response = await axios.get(
      `https://api.github.com/users/${user}/events?since=${daysAgo}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    const activity = response.data;
    const relevantDetails = activity.map((item: any) => {
      const type = item.type;
      const actor = item.actor.login;
      const repo = item.repo.url;
      let commitMessages;
      if (item.payload.commits === undefined) {
        if (item.payload.action !== undefined) {
          let url;
          if (item.payload.pull_request !== undefined) {
            url = item.payload.pull_request.url;
          } else {
            url = item.payload.issue.url;
          }
          commitMessages = [`${item.payload.action} ${url}`];
        } else {
          commitMessages = [
            `Created ${item.payload.ref_type} ${
              item.payload.ref ? item.payload.ref : ""
            }`,
          ];
        }
      } else {
        commitMessages = item.payload.commits
          .filter(
            (commit) => commit.author.name.toLowerCase() === user.toLowerCase()
          )
          .map((commit) => commit.message);
      }
      let org;
      if (item.org === undefined) {
        org = "";
      } else {
        org = item.org.url;
      }
      const returnObject = {
        type,
        actor,
        repo,
        commitMessages,
        org,
      };
      return returnObject;
    });
    res.json(relevantDetails);
    // Further processing or handling of the activity data
    // ...
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);
  }
}
export default fetchGitHubActivity;
