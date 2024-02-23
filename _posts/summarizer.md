---
title: "Create a GitHub Activity Summarizer using OpenAI API(gpt-3.5-turbo) and GitHub API"
excerpt: "Do you like to follow what your favorite developers are doing? Stay informed and focused on their GitHub activity with GAS, the GitHub Activity Summarizer powered by the OpenAI API (gpt-3.5-turbo)."
coverImage: "/assets/blog/github-summarizer/cover.png"
date: "2023-06-20T11:35:07.322Z"
author:
  name: 0xElod
  picture: "/0xelod_logo_white.svg"
ogImage:
  url: "/assets/blog/github-summarizer/cover.png"
---

Do you like to follow what your favorite developers are doing? Stay informed and focused on their GitHub activity with the GitHub Activity Summarizer powered by the OpenAI API (gpt-3.5-turbo). This powerful tool leverages OpenAI's cutting-edge language model to generate concise summaries of your GitHub activity, including commits, pull requests, and issue discussions. With its advanced natural language processing capabilities, the GitHub Activity Summarizer provides clear and condensed updates, saving you valuable time and effort, oh, and you don't need to read all that technical nonsense that you don't understand anyway. Customize your preferences and receive tailored summaries that highlight the most important updates across your repositories. Stay up to date without getting overwhelmed – start using the GitHub Activity Summarizer today to unlock a more efficient and productive GitHub experience.

## How I did it

In this blog post, we will explore how to create a GitHub Activity Summarizer using Axios and Next.js. This tool allows you to fetch and summarize the GitHub activity of a user within the past seven days. With the summarized activity data, you can easily get an overview of the user's commits, pull requests, and issue discussions. Let's dive into the code and see how it works.

## Fetching GitHub Activity

To fetch the GitHub activity, we will use the Axios library, which allows us to make HTTP requests. The fetchGitHubActivity function is an asynchronous function that takes in the NextApiRequest and NextApiResponse objects from Next.js.

First, we define the date range for the activity retrieval. We then make a GET request to the GitHub API using the provided user's username and the date range as query parameters.

```JavaScript
try {
  const user = process.env.NEXT_PUBLIC_GH_USER;
  const response = await axios.get(
    `https://api.github.com/users/${user}/events?since=${daysAgo}`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    }
  );
  const activity = response.data;
  // Further processing or handling of the activity data
  // ...
} catch (error) {
  console.error("Error fetching GitHub activity:", error);
}
```

It is important to note that there are several GitHub APIs you can fetch for a user's activity. For example, you can fetch the user's public events, public gists, and more. In this example, we are fetching the user's public events as it has the most granular data about the user's actions as well as commits and their messages.

**Note**: You can do the same wia the GraphQL API too, and it might be even more efficient.

### Cleaning the Activity Data

Once we have retrieved the GitHub activity data, we need to parse and extract the relevant details for our summary. We use the map function to iterate over each activity item and extract the necessary information such as type, actor, repository URL, commit messages, and organization URL. At the end, we're going to feed this into a LLM that has rate limits so our end goal is to extract the most important information and we end up having a list of objects that look like this for every action:

```JavaScript
const returnObject = {
    type,
    actor,
    repo,
    commitMessages,
    org,
  };
```

At this point, we have the parsed relevant details stored in the returnObject array. You can further process or handle this data according to your requirements. For example, you could generate a summary report, display the activity in a dashboard, or store it in a database for analysis.

## Prompting is the key

Now comes the soul of it all. Most of us are certainly laughing when we see "Prompt Engineer" positions out there but trust me, this is the most important part of the whole process. Writing a clear and conscise prompt enables our LLM to return us relevant summaries in the format we desire. I have tried many different prompts and I have found that the following one works best for me:

```JavaScript
  const summary = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Summarize in an unordered list the entries of the next GitHub activity of the user ${
          process.env.NEXT_PUBLIC_GH_USER
        } in a clear, non-technical manner in a single sentence. Try to understand what is he implementing or reviewing with these changes: \n ${JSON.stringify(
          activity.data
        )}`,
      },
    ],
  });
```

## Displaying the Summary

Finally, but most importantly, we need a nice way of displaying the summary to our readers. Note that queries to the OpenAI API take some time, especially if your activity is long so you might wanna integrate a skeleton or a loader to make the experience more pleasant. I have used the following code to display the summary:

```JavaScript
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
```

As you can see, the TypingText compoenent simply emulates the parallel typing-out of the results. I have used TailwindCSS for styling but you can use whatever you want. And voila, we have our summary!

---

## Conclusion

In this blog post, we explored how to create a GitHub Activity Summarizer using Axios and Next.js. By leveraging the GitHub API and parsing the relevant details, we can generate concise summaries of a user's GitHub activity within the past seven days. This tool can be further extended and customized to fit your specific needs. Feel free to experiment and enhance it based on your requirements.

---

Happy coding!
