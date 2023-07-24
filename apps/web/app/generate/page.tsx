/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import Hello from "../../components/blocks/Hello";
import Messages from "../../components/blocks/Messages";

const page = () => {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [generateClicked, setGenerateClicked] = useState('');

  const handleTopicChange = (topic) => {
    setTopic(topic);
  };

  const handleKeywordsChange = (keywords) => {
    setKeywords(keywords);
  };

  const handleGenerateClicked = (click) => {
    setGenerateClicked(click);
  }

  return (
    <main>
      <Hello
        onTopicChange={handleTopicChange}
        onKeywordsChange={handleKeywordsChange}
        onGenerateClicked={handleGenerateClicked}
      />
      <div className="messages">
        <Messages isText={true} topic={topic} keywords={keywords} generateClicked={generateClicked} setGenerateClicked={setGenerateClicked}/>
      </div>
    </main>
  );
};

export default page;
