"use client";

import { useState } from "react";
import { ListSelect } from "@/components/onboarding/ListSelect";
import { IconSelect } from "@/components/onboarding/IconSelect";
import { MultiCapsuleSelect } from "@/components/onboarding/MultiCapsuleSelect";
import { InputField, SelectField } from "@/components/onboarding/Inputs";

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const total = 6;

  //-----------------------------------------
  // STATES FOR EACH STEP
  //-----------------------------------------
  const [welcomeChoice, setWelcomeChoice] = useState("");
  const [sourceChoice, setSourceChoice] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [job, setJob] = useState("");
  const [field, setField] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [media1, setMedia1] = useState("");
  const [media2, setMedia2] = useState("");
  const [media3, setMedia3] = useState("");
  const [aiChoice, setAiChoice] = useState("");

  //-----------------------------------------
  // RENDER STEP UI
  //-----------------------------------------
  function renderStep() {
    switch (step) {
      // STEP 1 — Welcome
      case 0:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              What brings you to Finnovate?
            </h2>

            <ListSelect
              selected={welcomeChoice}
              setSelected={setWelcomeChoice}
              options={[
                { label: "To learn about investing", icon: "/icons/learn.png" },
                {
                  label: "To understand market news",
                  icon: "/icons/company.png",
                },
                {
                  label: "To get financial advice with AI",
                  icon: "/icons/project.png",
                },
                {
                  label: "To improve my budgeting",
                  icon: "/icons/inspiration.png",
                },
                {
                  label: "To join community discussions",
                  icon: "/icons/all.png",
                },
                { label: "Just look around", icon: "/icons/all.png" },
              ]}
            />
          </div>
        );

      // STEP 2 — Source
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Where did you hear about us?
            </h2>

            <div className="flex flex-wrap gap-4">
              <IconSelect
                icon={
                  <svg className="w-8 h-8">
                    <circle cx="12" cy="12" r="10" fill="#E4405F" />
                  </svg>
                }
                label="Instagram"
                selected={sourceChoice === "Instagram"}
                onClick={() => setSourceChoice("Instagram")}
              />

              <IconSelect
                icon={
                  <svg className="w-8 h-8">
                    <circle cx="12" cy="12" r="10" fill="#000000" />
                  </svg>
                }
                label="TikTok"
                selected={sourceChoice === "TikTok"}
                onClick={() => setSourceChoice("TikTok")}
              />

              <IconSelect
                icon={
                  <svg className="w-8 h-8">
                    <circle cx="12" cy="12" r="10" fill="#1DA1F2" />
                  </svg>
                }
                label="Twitter / X"
                selected={sourceChoice === "Twitter/X"}
                onClick={() => setSourceChoice("Twitter/X")}
              />

              <IconSelect
                icon={
                  <svg className="w-8 h-8">
                    <circle cx="12" cy="12" r="10" fill="#22c55e" />
                  </svg>
                }
                label="Friend"
                selected={sourceChoice === "Friend"}
                onClick={() => setSourceChoice("Friend")}
              />

              <IconSelect
                icon={
                  <svg className="w-8 h-8">
                    <rect width="24" height="16" rx="2" fill="#FF0000" />
                  </svg>
                }
                label="YouTube"
                selected={sourceChoice === "YouTube"}
                onClick={() => setSourceChoice("YouTube")}
              />
            </div>
          </div>
        );

      // STEP 3 — About you
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Tell me more about you!</h2>

            <InputField label="Your name" value={name} setValue={setName} />
            <InputField label="Age" value={age} setValue={setAge} />

            <SelectField
              label="Your job"
              value={job}
              setValue={setJob}
              options={["Student", "Freelancer", "Employee", "Entrepreneur"]}
            />

            <SelectField
              label="Field of work"
              value={field}
              setValue={setField}
              options={[
                "IT",
                "Marketing",
                "Finance",
                "Creative",
                "Engineering",
              ]}
            />
          </div>
        );

      // STEP 4 — Topics (min 3)
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Which financial topics interest you most?
            </h2>

            <MultiCapsuleSelect
              options={[
                "Investing",
                "Trading",
                "Crypto",
                "Economy",
                "Budgeting",
                "Financial Planning",
                "Taxes",
                "Market News",
                "Personal Finance",
                "Risk Management",
              ]}
              selected={topics}
              setSelected={setTopics}
            />

            {topics.length < 3 && (
              <p className="text-sm text-red-400 mt-2">
                Please select at least 3 topics.
              </p>
            )}
          </div>
        );

      // STEP 5 — Media consumption
      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">Your media habits</h2>

            <SelectField
              label="How do you usually consume financial content?"
              value={media1}
              setValue={setMedia1}
              options={[
                "Videos",
                "Articles",
                "Podcasts",
                "Social Media",
                "Mixed",
              ]}
            />

            <SelectField
              label="How frequently do you check financial news?"
              value={media2}
              setValue={setMedia2}
              options={[
                "Daily",
                "A few times a week",
                "Weekly",
                "Occasionally",
              ]}
            />

            <SelectField
              label="Do you want to join community discussions?"
              value={media3}
              setValue={setMedia3}
              options={["Yes", "No", "Maybe"]}
            />
          </div>
        );

      case 5:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              How do you plan to use our AI Financial Assistant?
            </h2>

            <ListSelect
              selected={aiChoice}
              setSelected={setAiChoice}
              options={[
                { label: "Daily AI recommendations" },
                { label: "Portfolio tracking" },
                { label: "Learning finance concepts" },
                { label: "Market analysis summaries" },
                { label: "Budgeting help" },
              ]}
            />
          </div>
        );
    }
  }

  return (
    <div className="flex w-full h-screen bg-white">
      {/* LEFT SIDE */}
      <div className="w-1/2 px-16 py-12 flex flex-col justify-between">
        <div>
          {/* Progress */}
          <p className="text-sm text-gray-500 mb-2">
            {step + 1} of {total}
          </p>
          <div className="h-2 bg-gray-200 rounded-full mb-8">
            <div
              className="h-full bg-amber-400 rounded-full transition-all"
              style={{ width: `${((step + 1) / total) * 100}%` }}
            />
          </div>

          {/* Render step */}
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-10">
          <button
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
            className="text-gray-500 disabled:opacity-30"
          >
            Back
          </button>

          <button
            onClick={() => {
              if (step < total - 1) setStep(step + 1);
              else alert("Completed onboarding!");
            }}
            className="px-6 py-2 bg-amber-400 text-white rounded-md"
          >
            {step === total - 1 ? "Finish" : "Continue →"}
          </button>
        </div>
      </div>

      {/* RIGHT ILLUSTRATION */}
      <div className="w-1/2 bg-gray-50 flex items-center justify-center">
        <div className="w-[70%] h-[70%] bg-gray-200 rounded-xl flex items-center justify-center">
          <span className="text-gray-500">[ Illustration ]</span>
        </div>
      </div>
    </div>
  );
}
