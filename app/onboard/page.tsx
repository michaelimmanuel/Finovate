"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ListSelect } from "@/components/onboarding/ListSelect";
import { AlertModal } from "@/components/onboarding/AlertModal";
import { IconSelect } from "@/components/onboarding/IconSelect";
import { MultiCapsuleSelect } from "@/components/onboarding/MultiCapsuleSelect";
import { InputField, SelectField } from "@/components/onboarding/Inputs";

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const total = 6;
  const router = useRouter();

  const [welcomeChoice, setWelcomeChoice] = useState("");
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [job, setJob] = useState("");
  const [field, setField] = useState("");
  const [topics, setTopics] = useState<string[]>([]);
  const [media1, setMedia1] = useState("");
  const [media2, setMedia2] = useState("");
  const [media3, setMedia3] = useState("");
  const [aiChoice, setAiChoice] = useState("");

  function renderStep() {
    switch (step) {
      // STEP 1 — Welcome
      case 0:
        return (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              What brings you to Finnovate?
            </h2>

            <ListSelect
              selected={welcomeChoice}
              setSelected={setWelcomeChoice}
              options={[
                {
                  label: "To learn about investing",
                  icon: "/onboard/learn.png",
                },
                {
                  label: "To understand market news",
                  icon: "/onboard/analysis.png",
                },
                {
                  label: "To get financial advice with AI",
                  icon: "/onboard/ai.png",
                },
                {
                  label: "To improve my budgeting",
                  icon: "/onboard/budget.png",
                },
                {
                  label: "To join community discussions",
                  icon: "/onboard/community.png",
                },
                { label: "Just look around", icon: "/onboard/look.png" },
              ]}
            />
          </div>
        );

      // STEP 2 — Source
      case 1:
        return (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Where did you hear about us?
            </h2>

            <div className="flex flex-wrap gap-4 md:gap-6">
              <IconSelect
                icon="/onboard/instagram.png"
                label="Instagram"
                selected={selectedOption === "Instagram"}
                onClick={() => setSelectedOption("Instagram")}
              />

              <IconSelect
                icon="/onboard/tiktok.png"
                label="TikTok"
                selected={selectedOption === "TikTok"}
                onClick={() => setSelectedOption("TikTok")}
              />

              <IconSelect
                icon="/onboard/youtube.png"
                label="Youtube"
                selected={selectedOption === "Youtube"}
                onClick={() => setSelectedOption("Youtube")}
              />

              <IconSelect
                icon="/onboard/twitter.png"
                label="Twitter"
                selected={selectedOption === "Twitter"}
                onClick={() => setSelectedOption("Twitter")}
              />

              <IconSelect
                icon="/onboard/other.png"
                label="Others"
                selected={selectedOption === "Others"}
                onClick={() => setSelectedOption("Others")}
              />
            </div>
          </div>
        );

      // STEP 3 — About you
      case 2:
        return (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Tell me more about you!</h2>

            <InputField label="Your name" value={name} setValue={setName} />
            <InputField label="Age" value={age} setValue={setAge} />

            <SelectField
              label="Your job"
              value={job}
              setValue={setJob}
              options={[
                "Student",
                "Freelancer",
                "Employee",
                "Entrepreneur",
                "Others",
              ]}
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
                "Journalism",
              ]}
            />
          </div>
        );

      // STEP 4 — Topics (min 3)
      case 3:
        return (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Your media habits</h2>

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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              How do you plan to use our AI Financial Assistant?
            </h2>

            <ListSelect
              selected={aiChoice}
              setSelected={setAiChoice}
              options={[
                {
                  label: "Daily AI recommendations",
                  icon: "/onboard/recommend.png",
                },
                { label: "Portfolio tracking", icon: "/onboard/porto.png" },
                {
                  label: "Learning finance concepts",
                  icon: "/onboard/finance.png",
                },
                {
                  label: "Market analysis summaries",
                  icon: "/onboard/money.png",
                },
                { label: "Budgeting help", icon: "/onboard/budgeting.png" },
              ]}
            />
          </div>
        );
    }
  }

  return (
    <div className="flex w-full min-h-screen bg-white">
      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 md:px-16 px-10 md:py-12 py-6 flex flex-col justify-between">
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
              if (step < total - 1) {
                setStep(step + 1);
              } else {
                setShowCompleteModal(true);
              }
            }}
            className="px-4 py-1 md:px-6 md:py-2 bg-amber-400 text-white rounded-md 
             transition-all duration-200 hover:bg-amber-400/80 hover:scale-[1.03] cursor-pointer"
          >
            {step === total - 1 ? "Finish" : "Continue →"}
          </button>
        </div>
      </div>
      {/* RIGHT ILLUSTRATION */}
      <div className="w-1/2 md:flex items-center justify-center hidden">
        <div className="w-[70%] h-[70%] bg-gray-200 rounded-xl flex items-center justify-center">
          <img src="/onboard/all.png" alt="" />
        </div>
      </div>
      <AlertModal
        open={showCompleteModal}
        onClose={() => {
          setShowCompleteModal(false);
          router.push("/news");
        }}
        title="Onboarding Completed!"
      >
        🎉 You're all set. Thanks for completing the setup!
      </AlertModal>
      ;
    </div>
  );
}
