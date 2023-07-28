/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import Hello from "../../components/blocks/Hello";
import Messages from "../../components/blocks/Messages";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/");
    }
  }, []);

  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [generateClicked, setGenerateClicked] = useState("");

  const handleTopicChange = (topic) => {
    if (!localStorage.getItem("user")) {
      router.push("/");
    } else {
      setTopic(topic);
    }
  };

  const handleKeywordsChange = (keywords) => {
    if (!localStorage.getItem("user")) {
      router.push("/");
    } else {
      setKeywords(keywords);
    }
  };

  const handleGenerateClicked = (click) => {
    if (!localStorage.getItem("user")) {
      router.push("/");
    } else {
      setGenerateClicked(click);
    }
  };

  return (
    <main>
      <Hello
        onTopicChange={handleTopicChange}
        onKeywordsChange={handleKeywordsChange}
        onGenerateClicked={handleGenerateClicked}
      />
      <div className="messages">
        <Messages
          isText={true}
          topic={topic}
          keywords={keywords}
          generateClicked={generateClicked}
          setGenerateClicked={setGenerateClicked}
        />
      </div>
    </main>
  );
};

export default page;
