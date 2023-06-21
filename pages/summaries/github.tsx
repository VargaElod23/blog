import { useEffect, useState } from "react";
import axios from "axios";
import Container from "../../components/container";
import Layout from "../../components/layout";
import TextPlaceholder from "../../components/textPlaceholder";
import useLoader from "../../hooks/useLoader";

const GitHubSummary = () => {
  const [summary, setSummary] = useState<string[]>([]);
  const { isLoading, setIsLoading } = useLoader();

  useEffect(() => {
    const fetchGitHubSummary = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/openai/summary?days=14"); // Change the API route path as per your setup
        const cleanedSummary = response.data.summary.content
          .replace("+", "")
          .replace("'", "");
        setSummary(cleanedSummary.split("\n"));
        setIsLoading(false);
        console.log({ summary: cleanedSummary.split("\n") });
      } catch (error) {
        console.error("Error fetching GitHub summary:", error);
      }
    };

    fetchGitHubSummary();
  }, []);
  const user = process.env.NEXT_PUBLIC_GH_USER;
  return (
    <Layout>
      <Container>
        <div className="container mx-auto p-4 pt-16">
          <h1 className="text-3xl font-bold mb-4 text-black dark:text-white dark:bg-black bg-white">
            {`GitHub Summary of ${user}`}
          </h1>
          <div className="grid gap-2">
            {isLoading ? (
              <>
                <TextPlaceholder />
              </>
            ) : (
              summary.map((item, index) => (
                <TypingText key={index} text={item} />
              ))
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
