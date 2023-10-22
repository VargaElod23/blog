import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

async function fetchGitHubActivity(req: NextApiRequest, res: NextApiResponse) {
  const days = Number(req.query.since);

  const currentDate = new Date();
  const daysAgo = new Date();
  daysAgo.setDate(currentDate.getDate() - days);

  try {
    const orga = process.env.NEXT_PUBLIC_GH_ORGA || "Taraxa-project";
    const activityOfLastWeek = [];
    let page = 1;
    let passedLastWeek = false;
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    while (!passedLastWeek) {
      const url = `https://api.github.com/orgs/${orga}/events?page=${page}&per_page=100`;
      const response = await axios.get(url, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      });
      console.log(`Fetching page ${page}`);
      const activities = response.data;
      if (
        activities.length === 0 ||
        new Date(activities[0].created_at) < lastWeek
      ) {
        console.log(
          `Activities reached last week. Last activity: ${new Date(
            activityOfLastWeek[activityOfLastWeek.length - 1].createdAt
          ).toLocaleString()}`
        );
        passedLastWeek = true;
        break;
      }
      const relevantDetails = [];
      for (const item of activities) {
        const creationDate = new Date(item.created_at);
        if (creationDate > lastWeek) {
          const type = item.type;
          if (type === "DeleteEvent") {
            continue;
          }
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
            commitMessages = item.payload.commits.map(
              (commit) => commit.message
            );
          }
          const returnObject = {
            type,
            actor,
            repo,
            commitMessages,
            createdAt: item.created_at,
          };
          relevantDetails.push(returnObject);
        }
      }
      console.log(`Added ${relevantDetails.length} activities`);
      activityOfLastWeek.push(...relevantDetails);
      page++;
    }
    res.json(activityOfLastWeek);
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);
  }
}
export default fetchGitHubActivity;
