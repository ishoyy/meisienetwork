"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.target;
    const data = {
      name: form.fullName.value.trim(),
      email: form.email.value.trim(),
      occupation: form.occupation.value.trim(),
      message: form.interest.value.trim(),
    };

    try {
      const res = await fetch("/admin/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Server error: ${res.status}`);
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <form className="input-container" id="waitlistForm" onSubmit={handleSubmit}>
      <div className="name-address-container">
        <input type="text" name="fullName" placeholder="Full Name *" required />
        <input type="email" name="email" placeholder="Email Address *" required />
      </div>

      <div className="occupation-community-container">
        <input type="text" name="occupation" placeholder="Occupation *" required />
        <textarea
          name="interest"
          placeholder="What are you looking for in this community? *"
          className="community-textarea"
          required
        />
      </div>

      {status === "error" && (
        <p style={{ color: "red", marginBottom: "0.5rem" }}>{errorMsg}</p>
      )}

      {status === "success" && (
        <p style={{ color: "green", marginBottom: "0.5rem" }}>
          🎉 You&apos;re on the list! We&apos;ll be in touch soon.
        </p>
      )}

      <button className="waitlist-button" type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Submitting…" : "Secure my spot"}
      </button>
    </form>
  );
}