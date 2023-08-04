/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import Hello from "../../components/blocks/Hello";
import Messages from "../../components/blocks/Messages";
import { useRouter } from "next/navigation";
import Card from "../../components/Card";
import styles from "../../styles/Generate.module.scss";
import Ideas from "../../components/blocks/Ideas";

const page = () => {
  const router = useRouter();
  const [isBack, setIsBack] = useState(true);
  const [isPost, setIsPost] = useState(false);
  const [isIdea, setIsIdea] = useState(false);
  const [isDescription, setIsDescription] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/");
    }
  }, []);

  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [ideas, setIdeas] = useState("")
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

  const handleIdeasChange = (ideas) => {
    if (!localStorage.getItem("user")) {
      router.push("/");
    } else {
      setIdeas(ideas)
    }
  }

  const handleGenerateClicked = (click) => {
    if (!localStorage.getItem("user")) {
      router.push("/");
    } else {
      setGenerateClicked(click);
    }
  };
  

  const handleBackClicked = () => {
    setIsBack(true);
  };

  const handlePostClicked = () => {
    setIsPost(true);
    setIsBack(false);
  };

  const handleIdeaClicked = () => {
    setIsIdea(true);
    setIsBack(false);
  };

  const handleDescriptionClicked = () => {
    setIsDescription(true);
    setIsBack(false);
  };

  return (
    <main>
      {isBack && (
        <div>
          <h2 className={styles.title}>Что хотите сгенерировать?</h2>
          <div className={styles.cardsContainer}>
            <Card
              title={"Пост"}
              imageUrl={"/assets/icons/instagram-post.png"}
              onClick={handlePostClicked}
              onBack={handleBackClicked}
            />
            <Card
              title={"Идеи"}
              imageUrl={"/assets/icons/idea.png"}
              onClick={handleIdeaClicked}
              onBack={handleBackClicked}
            />
            <Card
              title={"Описание профиля"}
              imageUrl={"/assets/icons/profile-description.png"}
              onClick={handleDescriptionClicked}
              onBack={handleBackClicked}
            />
          </div>
        </div>
      )}

      {isPost && (
        <div>
          <Hello
            onTopicChange={handleTopicChange}
            onKeywordsChange={handleKeywordsChange}
            onGenerateClicked={handleGenerateClicked}
            setIsPost={setIsPost}
            handleBackClicked={handleBackClicked}
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
        </div>
      )}

      {isIdea && (
        <div>
          <Ideas
            onGenerateClicked={handleGenerateClicked}
            setIsIdea={setIsIdea}
            handleBackClicked={handleBackClicked}
          />
        </div>
      )}

      {isDescription && <div>Coming soon...</div>}
    </main>
  );
};

export default page;
