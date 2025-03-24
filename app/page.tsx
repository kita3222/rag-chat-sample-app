"use client";

import React, { useState } from "react";
import ChatInterface from "./features/rag-chat/components/ChatInterface";
import ChatLayout from "./components/layouts/ChatLayout";

export default function Home() {
  const [conversations, setConversations] = useState([
    {
      id: "1",
      title: "新しい会話",
      date: "2023年3月24日",
      isActive: true,
    },
  ]);

  const handleNewConversation = () => {
    const newConversation = {
      id: `conv_${Date.now()}`,
      title: "新しい会話",
      date: new Date().toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      isActive: true,
    };

    // 以前のアクティブな会話をアクティブでなくする
    const updatedConversations = conversations.map((conv) => ({
      ...conv,
      isActive: false,
    }));

    setConversations([newConversation, ...updatedConversations]);
  };

  const handleConversationSelect = (id: string) => {
    setConversations(
      conversations.map((conv) => ({
        ...conv,
        isActive: conv.id === id,
      }))
    );
  };

  return (
    <ChatLayout
      conversations={conversations}
      onConversationSelect={handleConversationSelect}
      onNewConversation={handleNewConversation}
      headerTitle="Almondo RAG チャットアシスタント"
      onSettingsClick={() => {}}
    >
      <ChatInterface
        title="Almondo RAG チャットアシスタント"
        initialMessages={[]}
        onNewMessage={() => {}}
        onReset={() => {}}
        onSettingsClick={() => {}}
      />
    </ChatLayout>
  );
}
