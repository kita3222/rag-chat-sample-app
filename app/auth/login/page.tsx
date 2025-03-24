"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import styled from "styled-components";
import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useAuth } from "../AuthProvider";
import AppLayout from "../../components/layouts/AppLayout";

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 40px auto;
  width: 100%;
`;

const LoginCard = styled(Card)`
  margin-top: var(--space-6);
`;

const LoginForm = styled.form`
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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, error, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";

  useEffect(() => {
    if (user) {
      router.push(redirectTo);
    }
  }, [user, router, redirectTo]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <AppLayout>
      <LoginContainer>
        <LoginCard variant={Card.VARIANTS.ELEVATED}>
          <FormHeader>
            <FormTitle>Almondo RAG Chatにログイン</FormTitle>
            <FormDescription>
              アカウント情報を入力してログインしてください
            </FormDescription>
          </FormHeader>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <LoginForm onSubmit={handleSubmit}>
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
              placeholder="パスワードを入力"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <FormActions>
              <Button
                type="submit"
                fullWidth
                isLoading={loading}
                disabled={loading}
              >
                ログイン
              </Button>
            </FormActions>
          </LoginForm>

          <FormFooter>
            アカウントをお持ちでない方は{" "}
            <Link
              href="/auth/signup"
              style={{ color: "var(--color-primary)", textDecoration: "none" }}
            >
              サインアップ
            </Link>
          </FormFooter>
        </LoginCard>
      </LoginContainer>
    </AppLayout>
  );
}
