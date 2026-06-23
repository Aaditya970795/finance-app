import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axiosInstance from "../../api/axiosInstance";
import { Button, Input } from "../../components/ui";

function RegisterBrandPanel() {
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
          Create your account and start managing portfolios, tracking spending,
          and unlocking AI-powered financial insights.
        </p>
      </div>

      <div className="relative mt-10 grid gap-4 sm:grid-cols-2">
        {[
          {
            label: "Free to start",
            value: "$0",
          },
          {
            label: "Setup time",
            value: "&lt; 2 min",
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

function RegisterForm({
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
        label="Username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="johndoe"
        autoComplete="username"
        required
      />

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

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Create a password"
        autoComplete="new-password"
        required
      />

      <Input
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm your password"
        autoComplete="new-password"
        required
      />

      <Button
        type="submit"
        fullWidth
        loading={isSubmitting}
      >
        Create Account
      </Button>
    </form>
  );
}

export default function Register() {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsSubmitting(true);

      await axiosInstance.post("/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Account created successfully");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ??
          error.response?.data?.error ??
          "Registration failed"
      );
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
          <RegisterBrandPanel />

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
                Create your finance dashboard account
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface-raised p-6 shadow-elevated sm:p-8">
              <div className="mb-6 hidden lg:block">
                <h2 className="text-xl font-semibold text-foreground">
                  Get started
                </h2>

                <p className="mt-1 text-sm text-muted">
                  Fill in your details to create a new account.
                </p>
              </div>

              <RegisterForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                formData={formData}
                handleChange={handleChange}
              />

              <p className="mt-6 text-center text-sm text-muted">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="font-medium text-brand transition hover:text-brand-hover"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
