import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import Container from "../../components/container";
import Layout from "../../components/layout";
import TextPlaceholder from "../../components/textPlaceholder";
import useLoader from "../../hooks/useLoader";
import ErrorContainer from "../../components/error";
import { RangePicker } from "../../components/rangePicker";

const GitHubSummary = () => {
  const [timeframe, setTimeframe] = useState<number>(0);
  const [stats, setStats] = useState<{
    commits: number;
    prs: number;
    contributions: number;
    issues: number;
  }>({ commits: 0, prs: 0, contributions: 0, issues: 0 });
  const [summary, setSummary] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const { isLoading, setIsLoading } = useLoader();
  const [showSearch, setShowSearch] = useState<boolean>(true);

  const handleSummarySubmit = (e) => {
    e.preventDefault();
    setShowSearch(false);
    getSummary();
  };

  const getStats = useCallback(async () => {
    try {
      const response = await axios.get(`/api/github/stats?since=${timeframe}`);
      setStats({
        commits: response.data.commits,
        prs: response.data.prs,
        contributions: response.data.contributions,
        issues: response.data.issues,
      });
    } catch (error) {
      console.error("Error fetching GitHub stats");
    }
  }, [timeframe]);

  useEffect(() => {
    if (timeframe > 0) {
      getStats();
    }
  }, [timeframe]);

  const getSummary = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);
      const response = await axios.get(
        `/api/openai/summary?since=${timeframe}`
      );
      const cleanedSummary = response.data.summary.content
        .replace("+", "")
        .replace("'", "");
      setSummary(cleanedSummary.split("\n"));
      setIsLoading(false);
      console.log({ summary: cleanedSummary.split("\n") });
    } catch (error) {
      console.error("Error fetching GitHub summary:", error);
      setError(true);
    }
  }, [timeframe]);
  const user = process.env.NEXT_PUBLIC_GH_USER;
  return (
    <Layout>
      <Container>
        <div className="container mx-auto p-4 pt-16">
          <h1 className="text-3xl font-bold mb-4 text-black dark:text-white dark:bg-black bg-white">
            {`GitHub Summary of ${user} powered by GAS`}
          </h1>
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/assets/blog/github-summarizer/gas.png"
              alt={`Github Activity Summarizer`}
              className="shadow-sm my-8 object-contain hover:shadow-lg transition-shadow duration-200 max-w-1/2 max-h-1/5"
              width={650}
              height={500}
            />
          </div>
          <RangePicker days={timeframe} fetchStats={setTimeframe} />
          {stats.commits > 0 && (
            <div className="flex flex-row flex-wrap space-y-4 gap-4 w-full space-x-4 justify-between mb-12 xs:justify-center">
              <div className="dark:bg-slate-800 bg-gray-200 p-4 rounded-lg  mt-4 sm:w-full">
                <h3 className="text-lg font-semibold">
                  Total Number of Contributions
                </h3>
                <p
                  className={`text-3xl font-bold  ${
                    timeframe <= stats.contributions ? "text-green-800" : ""
                  } text-center`}
                >
                  {stats.contributions}
                </p>
              </div>
              <div className="dark:bg-slate-800 bg-gray-200 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Number of Commits</h3>
                <p
                  className={`text-3xl font-bold ${
                    timeframe <= stats.commits ? "text-green-800" : ""
                  } text-center`}
                >
                  {stats.commits}
                </p>
              </div>

              {stats.prs > 0 ? (
                <div className="dark:bg-slate-800 bg-gray-200 p-4 rounded-lg sm:min-w-full">
                  <h3 className="text-lg font-semibold">
                    Number of PRs Created and Closed
                  </h3>
                  <p
                    className={`text-3xl font-bold ${
                      timeframe / 5 <= stats.prs ? "text-green-800" : ""
                    } text-center`}
                  >
                    {stats.prs}
                  </p>
                </div>
              ) : (
                <></>
              )}

              {stats.issues > 0 ? (
                <div className="dark:bg-slate-800 bg-gray-200 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold">
                    Number of Issues Created/Resolved
                  </h3>
                  <p
                    className={`text-3xl font-bold ${
                      timeframe / 2 <= stats.issues ? "text-green-800" : ""
                    } text-center`}
                  >
                    {stats.issues}
                  </p>
                </div>
              ) : (
                <></>
              )}
            </div>
          )}
          {showSearch && (
            <div className="flex flex-col items-center justify-center">
              <form
                onSubmit={handleSummarySubmit}
                className="flex flex-col items-center"
              >
                <div className="mb-4">
                  <label htmlFor="days" className="text-lg">
                    Generate a summary of my GitHub activity:
                  </label>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-green-600 disabled:hover:bg-gray-400"
                  onClick={handleSummarySubmit}
                >
                  Generate Summary
                </button>
              </form>
            </div>
          )}
          <div className="grid gap-2">
            {isLoading ? (
              <>
                <TextPlaceholder />
              </>
            ) : error ? (
              <ErrorContainer />
            ) : (
              !showSearch && (
                <>
                  {summary.map((item, index) => (
                    <TypingText key={index} text={item} />
                  ))}
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-green-600 max-w-xs text-center mx-auto"
                    onClick={() => setShowSearch(true)}
                  >
                    Regenerate
                  </button>
                </>
              )
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
};

const TypingText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  const typingDelay = 50;

  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      setDisplayedText((prevText) => prevText + text[currentIndex]);

      currentIndex++;

      if (currentIndex === text.length - 1) {
        clearInterval(typingInterval);
      }
    }, typingDelay);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text]);

  return (
    <div className="bg-gray-200 dark:bg-slate-800 text-black dark:text-white p-4 rounded-md">
      {displayedText}
    </div>
  );
};

export default GitHubSummary;
