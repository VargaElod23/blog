import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import Container from "../../components/container";
import Layout from "../../components/layout";
import TextPlaceholder from "../../components/textPlaceholder";
import useLoader from "../../hooks/useLoader";
import ErrorContainer from "../../components/error";

const GitHubSummary = () => {
  const [timeframe, setTimeframe] = useState<number>(0);
  const [forksCount, setForksCount] = useState<number>(5);
  const [commitCount, setCommitCount] = useState<number>(5);
  const [prCount, setPrCount] = useState<number>(5);
  const [commentCount, setCommentCount] = useState<number>(5);
  const [issueCount, setIssueCount] = useState<number>(5);
  const [summary, setSummary] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const { isLoading, setIsLoading } = useLoader();
  const [showSearch, setShowSearch] = useState<boolean>(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSearch(false);
    getSummary();
  };

  const getSummary = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(false);
      const response = await axios.get(`/api/openai/summary?days=${timeframe}`);
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
          {showSearch && (
            <div className="flex flex-col items-center justify-center">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center"
              >
                <div className="mb-4">
                  <label htmlFor="days" className="text-lg">
                    Amount of days to summarize:
                  </label>
                  <input
                    type="number"
                    id="days"
                    value={timeframe}
                    onChange={(e) => setTimeframe(Number(e.target.value))}
                    className="border border-gray-400 rounded px-2 py-1 ml-2 dark:text-black"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-green-600 disabled:hover:bg-gray-400"
                  onClick={handleSubmit}
                  disabled={!timeframe}
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
                  <div className="flex flex-row flex-wrap space-y-4 gap-4 w-full space-x-4 justify-between mb-12">
                    <div className="dark:bg-slate-800 bg-gray-200 p-4 rounded-lg  mt-4">
                      <h3 className="text-lg font-semibold">
                        Total Number of Commits
                      </h3>
                      <p
                        className={`text-3xl font-bold  ${
                          timeframe >= commitCount ? "text-green-800" : ""
                        } text-center`}
                      >
                        26
                      </p>
                    </div>

                    <div className="dark:bg-slate-800 bg-gray-200 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold">
                        Number of PRs Created and Closed
                      </h3>
                      <p
                        className={`text-3xl font-bold ${
                          timeframe / 2 >= prCount ? "text-green-800" : ""
                        }`}
                      >
                        12
                      </p>
                    </div>

                    <div className="dark:bg-slate-800 bg-gray-200 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold">
                        Number of Comments
                      </h3>
                      <p
                        className={`text-3xl font-bold ${
                          timeframe >= commentCount ? "text-green-800" : ""
                        }`}
                      >
                        48
                      </p>
                    </div>

                    <div className="dark:bg-slate-800 bg-gray-200 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold">
                        Number of Issues Created/Resolved
                      </h3>
                      <p
                        className={`text-3xl font-bold ${
                          timeframe / 2 >= issueCount ? "text-green-800" : ""
                        }`}
                      >
                        20
                      </p>
                    </div>

                    {forksCount > 0 && (
                      <div className="dark:bg-slate-800 bg-gray-200 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold">
                          Number of Forks
                        </h3>
                        <p
                          className={`text-3xl font-bold ${
                            timeframe / 2 >= forksCount ? "text-green-800" : ""
                          }`}
                        >
                          {forksCount}
                        </p>
                      </div>
                    )}
                  </div>
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
