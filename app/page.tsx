import React from "react";
import ChatInterface from "./components/ChatInterface";

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        padding: "20px",
        backgroundColor: "var(--color-gray-50)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          height: "100%",
          margin: "0 auto",
        }}
      >
        <ChatInterface title="Almondo RAG チャットアシスタント" />
      </div>
    </main>
  );
}
