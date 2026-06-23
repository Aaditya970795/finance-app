import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showErrorToast } from "../../utils/ShowErrorToast";

import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../api/axiosInstance";

import { Button, Input } from "../../components/ui";

function LoginBrandPanel() {
  return (
    <div className="relative hidden overflow-hidden rounded-2xl border border-border bg-surface-raised p-10 lg:flex lg:flex-col lg:justify-between">
      <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 text-brand">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10.5L12 4l9 6.5V19a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-8.5z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          FinanceAI
        </h1>

        <p className="mt-3 max-w-sm leading-relaxed text-muted">
          Manage portfolios, track spending, and get AI-powered insights —
          all in one secure dashboard.
        </p>
      </div>

      <div className="relative mt-10 grid gap-4 sm:grid-cols-2">
        {[
          {
            label: "Real-time analytics",
            value: "Live",
          },
          {
            label: "Bank-grade security",
            value: "256-bit",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border-muted bg-surface p-4"
          >
            <p className="text-xs uppercase tracking-wider text-subtle">
              {stat.label}
            </p>

            <p className="mt-1 font-mono text-lg text-brand">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoginForm({
  onSubmit,
  isSubmitting,
  formData,
  handleChange,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5"
    >
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="you@company.com"
        autoComplete="email"
        required
      />

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">
            Password
          </label>

          <Link
            to="/forgot-password"
            className="text-sm text-brand transition hover:text-brand-hover"
          >
            Forgot password?
          </Link>
        </div>

        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />
      </div>

      <Button
        type="submit"
        fullWidth
        loading={isSubmitting}
      >
        Sign In
      </Button>
    </form>
  );
}

export default function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setIsSubmitting(true);
  
      const response = await axiosInstance.post(
        "/auth/login",
        formData
      );
  
      login(response.data.token, response.data.user);
  
      toast.success("Login successful");
  
      navigate("/dashboard");
    } catch (error) {
      showErrorToast(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-brand/5 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl items-center">
        <div className="grid w-full gap-8 lg:grid-cols-2 lg:gap-12">
          <LoginBrandPanel />

          <div className="flex flex-col justify-center">
            <div className="mb-8 lg:hidden">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand/15 text-brand">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10.5L12 4l9 6.5V19a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-8.5z"
                  />
                </svg>
              </div>

              <h1 className="text-2xl font-semibold text-foreground">
                FinanceAI
              </h1>

              <p className="mt-1 text-sm text-muted">
                Sign in to your finance dashboard
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface-raised p-6 shadow-elevated sm:p-8">
              <div className="mb-6 hidden lg:block">
                <h2 className="text-xl font-semibold text-foreground">
                  Welcome back
                </h2>

                <p className="mt-1 text-sm text-muted">
                  Enter your credentials to access your account.
                </p>
              </div>

              <LoginForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                formData={formData}
                handleChange={handleChange}
              />

              <p className="mt-6 text-center text-sm text-muted">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-brand transition hover:text-brand-hover"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}