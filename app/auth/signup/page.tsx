"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useAuth } from "../AuthProvider";
import AppLayout from "../../components/layouts/AppLayout";

const SignupContainer = styled.div`
  max-width: 400px;
  margin: 40px auto;
  width: 100%;
`;

const SignupCard = styled(Card)`
  margin-top: var(--space-6);
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: var(--space-4);
`;

const FormTitle = styled.h1`
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-gray-900);
  margin-bottom: var(--space-2);
`;

const FormDescription = styled.p`
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
`;

const FormActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
`;

const FormFooter = styled.div`
  text-align: center;
  margin-top: var(--space-4);
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
`;

const ErrorMessage = styled.div`
  color: var(--color-error);
  font-size: var(--font-size-sm);
  padding: var(--space-2);
  background-color: var(--color-error-10);
  border-radius: var(--border-radius-sm);
  margin-bottom: var(--space-3);
`;

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { signup, user, error, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError("パスワードが一致しません");
      return false;
    }

    if (password.length < 8) {
      setPasswordError("パスワードは8文字以上にしてください");
      return false;
    }

    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    await signup(name, email, password);
  };

  return (
    <AppLayout>
      <SignupContainer>
        <SignupCard variant={Card.VARIANTS.ELEVATED}>
          <FormHeader>
            <FormTitle>新規アカウント登録</FormTitle>
            <FormDescription>
              Almondo RAG Chatの利用を始めるための新規登録
            </FormDescription>
          </FormHeader>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SignupForm onSubmit={handleSubmit}>
            <Input
              id="name"
              label="名前"
              type="text"
              placeholder="名前を入力"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              id="email"
              label="メールアドレス"
              type="email"
              placeholder="メールアドレスを入力"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              id="password"
              label="パスワード"
              type="password"
              placeholder="パスワードを入力（8文字以上）"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              required
            />

            <Input
              id="confirmPassword"
              label="パスワード（確認）"
              type="password"
              placeholder="パスワードを再入力"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <FormActions>
              <Button
                type="submit"
                fullWidth
                isLoading={loading}
                disabled={loading}
              >
                アカウント作成
              </Button>
            </FormActions>
          </SignupForm>

          <FormFooter>
            すでにアカウントをお持ちの方は{" "}
            <Link
              href="/auth/login"
              style={{ color: "var(--color-primary)", textDecoration: "none" }}
            >
              ログイン
            </Link>
          </FormFooter>
        </SignupCard>
      </SignupContainer>
    </AppLayout>
  );
}
