export const statsQuery = `query ($username: String!, $since: DateTime!) {
        user(login: $username) {
            contributionsCollection(from: $since) {
                totalCommitContributions
                totalPullRequestContributions
                totalPullRequestReviewContributions
                totalIssueContributions 
                contributionCalendar {
                    totalContributions
                }
            }
        }
    }
`;

export const contributionsQuery = `query ($username: String!, $since: DateTime!) {
        user(login: $username) {
            contributionsCollection(from: $since) {
            contributionCalendar {
                totalContributions
                }
            }
        }
    }
`;

export const commitsQuery = `
  query ($username: String!, $since: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $since) {
        totalCommitContributions
      }
    }
  }
`;

export const prsQuery = `
  query ($username: String!, $since: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $since) {
        totalPullRequestContributions
        totalPullRequestReviewContributions
      }
    }
  }
`;
