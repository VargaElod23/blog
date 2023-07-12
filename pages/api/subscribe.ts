import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

async function summarizeGitHubActivity(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);
  console.log(body);
  const email = body.email;
  const created_at = body.created_at;
  console.log(email);
  console.log(created_at);
  const { rows } =
    await sql`INSERT INTO subscribers (email, created_at) VALUES (${email}, to_timestamp(${created_at})) RETURNING *`;
  if (rows[0] === undefined) {
    res.json({ summary: "You are already subscribed!" });
    return;
  }
  res.status(201).json({ summary: "You have been subscribed!" });
}
export default summarizeGitHubActivity;
