"use client";

import Toast from "@/components/Toast";
import { useState, useEffect } from "react";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const [title, setTitle] = useState("");
  // const [summary, setSummary] = useState("");
  const [blog, setBlog] = useState("");
  const [article, setArticle] = useState("");
  const [flowchart, setFlowchart] = useState("");
  const [resources, setResources] = useState("");
  const [showBlog, setShowBlog] = useState(false);
  const [showArticle, setShowArticle] = useState(false);
  const [showFlowchart, setShowFlowchart] = useState(false);
  const [showResources, setShowResources] = useState(false);

  const parser = async (markdown: string) => {
    const { content } = matter(markdown);
    const processedContent = await remark().use(html).process(content);
    return processedContent.toString();
  };

  const result = async () => {
    setLoading(true);
    setShowBlog(true);
    setShowArticle(false);
    setShowFlowchart(false);
    setShowResources(false);
    try {
      const response = await fetch("http://127.0.0.1:5000/video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ video_url: url }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.text();
      const parsedResponse = JSON.parse(responseData);

      console.log(parsedResponse);

      // setTitle(parsedResponse.title);
      // setSummary(parsedResponse.summary);
      setBlog(parsedResponse.blog);
      setArticle(parsedResponse.article);
      setFlowchart(parsedResponse.flowchart);
      setResources(parsedResponse.resources);

      const parsedBlog = await parser(parsedResponse.blog);
      setBlog(parsedBlog);
      const parsedArticle = await parser(parsedResponse.article);
      setArticle(parsedArticle);
      const parsedFlowchart = await parser(parsedResponse.flowchart);
      setFlowchart(parsedFlowchart);
      const parsedResources = await parser(parsedResponse.resources);
      setResources(parsedResources);
    } catch (err) {
      setError("Failed to generate content. Please try again.", err);
    }
    setLoading(false);
  };

  const Blog = () => (
    <div className="prose prose-invert">
      <div dangerouslySetInnerHTML={{ __html: blog }} />
    </div>
  );

  const Article = () => (
    <div className="prose prose-invert">
      <div dangerouslySetInnerHTML={{ __html: article }} />
    </div>
  );

  const Flowchart = () => (
    <div className="prose prose-invert">
      <div dangerouslySetInnerHTML={{ __html: flowchart }} />
    </div>
  );

  const Resources = () => (
    <div className="prose prose-invert">
      <div dangerouslySetInnerHTML={{ __html: resources }} />
    </div>
  );

  return (
    <div className="w-full bg-[#111111] font-sans flex items-center justify-center tracking-tight h-screen">
      {error && <Toast message={error} />}
      <div className="w-[60%] h-full flex items-center justify-center flex-col gap-4">
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="font-semibold text-8xl tracking-tighter">Cognify</h1>
          <h3 className="text-lg font-regular">Get more from YouTube videos</h3>
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-4">
          <input
            type="text"
            name=""
            id=""
            className="w-full p-4 border-4 border-[#363636] rounded-xl outline-none"
            placeholder="YouTube URL"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          />
          <button
            className={`${
              url
                ? "bg-[#1969FF] hover:bg-[#1984ff] cursor-pointer"
                : "bg-[#5481d6] cursor-not-allowed"
            } w-full p-4 rounded-xl transition-all
            ${loading && "bg-[#5481d6] cursor-not-allowed"}
            `}
            onClick={() => {
              if (url === "") {
                setError("Please enter a valid YouTube URL");
                return;
              }

              // Check if the URL is a valid YouTube link
              const youtubeRegex =
                /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
              if (!youtubeRegex.test(url)) {
                setError("Please enter a valid YouTube URL");
                return;
              }

              setError("");
              result();
            }}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            className={`${
              showBlog && "bg-[#1969FF] hover:bg-[#1969FF]"
            } rounded-full px-4 py-2 bg-[#3D3D3D] text-sm font-regular cursor-pointer hover:bg-[#2D2D2D] transition-all`}
            onClick={() => {
              setShowBlog(true);
              setShowArticle(false);
              setShowFlowchart(false);
              setShowResources(false);
            }}
          >
            Blog
          </button>
          <button
            className={`${
              showArticle && "bg-[#1969FF] hover:bg-[#1969FF]"
            } rounded-full px-4 py-2 bg-[#3D3D3D] text-sm font-regular cursor-pointer hover:bg-[#2D2D2D] transition-all`}
            onClick={() => {
              setShowBlog(false);
              setShowArticle(true);
              setShowFlowchart(false);
              setShowResources(false);
            }}
          >
            Article
          </button>
          <button
            className={`${
              showFlowchart && "bg-[#1969FF] hover:bg-[#1969FF]"
            } rounded-full px-4 py-2 bg-[#3D3D3D] text-sm font-regular cursor-pointer hover:bg-[#2D2D2D] transition-all`}
            onClick={() => {
              setShowBlog(false);
              setShowArticle(false);
              setShowFlowchart(true);
              setShowResources(false);
            }}
          >
            Flowchart
          </button>
          <button
            className={`${
              showResources && "bg-[#1969FF] hover:bg-[#1969FF]"
            } rounded-full px-4 py-2 bg-[#3D3D3D] text-sm font-regular cursor-pointer hover:bg-[#2D2D2D] transition-all`}
            onClick={() => {
              setShowBlog(false);
              setShowArticle(false);
              setShowFlowchart(false);
              setShowResources(true);
            }}
          >
            Resources
          </button>
        </div>

        {showBlog || showArticle || showFlowchart || showResources ? (
          <div className="flex flex-col items-center justify-center w-full">
            {loading && (
              <div className="w-full h-full bg-[#1e1e1e] p-4 rounded-xl mt-4 flex items-center justify-center">
                <p className="text-sm font-regular">
                  Hang on tight we are fighting dragons...
                </p>
              </div>
            )}
            {!loading && (
              <div className="w-full h-[50vh] overflow-y-scroll bg-[#1e1e1e] p-6 rounded-xl mt-4 word-wrap">
                {showBlog && <Blog />}
                {showArticle && <Article />}
                {showFlowchart && <Flowchart />}
                {showResources && <Resources />}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
