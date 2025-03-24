"use client";

import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import AppLayout from "./components/layouts/AppLayout";
import Button from "./components/Button/Button";
import Card from "./components/Card/Card";

const HeroSection = styled.div`
  padding: var(--space-6) 0;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-gray-900);
  margin-bottom: var(--space-4);
`;

const Subtitle = styled.p`
  font-size: var(--font-size-lg);
  color: var(--color-gray-700);
  margin-bottom: var(--space-5);
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: var(--space-3);
  justify-content: center;
  margin-bottom: var(--space-8);
`;

const FeaturesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-5);
  margin-bottom: var(--space-8);
`;

const FeatureCard = styled(Card)`
  padding: var(--space-4);
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FeatureIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius-md);
  background-color: var(--color-primary-10);
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--space-3);
  font-size: var(--font-size-xl);
`;

const FeatureTitle = styled.h3`
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin-bottom: var(--space-2);
`;

const FeatureDescription = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  line-height: 1.5;
  flex-grow: 1;
`;

export default function Home() {
  const router = useRouter();

  const handleStartChat = () => {
    router.push("/chat");
  };

  return (
    <AppLayout>
      <HeroSection>
        <Title>Almondo RAG チャットアシスタント</Title>
        <Subtitle>
          データベース内のドキュメントやナレッジベースを活用し、
          <br />
          より正確で根拠に基づいた回答を提供するAIアシスタント
        </Subtitle>
        <ButtonGroup>
          <Button size={Button.SIZES.LARGE} onClick={handleStartChat}>
            チャットを始める
          </Button>
        </ButtonGroup>

        <FeaturesSection>
          <FeatureCard>
            <FeatureIcon>🔍</FeatureIcon>
            <FeatureTitle>ドキュメント検索</FeatureTitle>
            <FeatureDescription>
              質問に関連するドキュメントを自動的に検索し、
              根拠となる情報を見つけ出します。引用と出典を明確に提示し、
              情報の信頼性を確保します。
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🤖</FeatureIcon>
            <FeatureTitle>AI生成回答</FeatureTitle>
            <FeatureDescription>
              最新のAI技術を活用して、検索結果に基づいた正確な回答を生成します。
              事実に基づいた応答を提供し、幻覚（誤った情報の生成）を防ぎます。
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>📚</FeatureIcon>
            <FeatureTitle>ナレッジベース拡張</FeatureTitle>
            <FeatureDescription>
              管理者はナレッジベースにドキュメントを追加し、
              AIが参照できる情報の範囲を継続的に拡大できます。
              PDFやテキストなど様々な形式のドキュメントに対応しています。
            </FeatureDescription>
          </FeatureCard>
        </FeaturesSection>
      </HeroSection>
    </AppLayout>
  );
}
