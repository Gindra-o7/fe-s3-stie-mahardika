import { useLanguage } from "@/contexts/LanguageContext";
import React, { useState } from "react";

// --- Helper Components ---

const CheckIcon: React.FC = () => (
	<svg
		className="h-5 w-5 flex-shrink-0 text-cyan-500"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 20 20"
		fill="currentColor"
		aria-hidden="true"
	>
		<path
			fillRule="evenodd"
			d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
			clipRule="evenodd"
		/>
	</svg>
);

const DocumentListItem: React.FC<{ text: string }> = ({ text }) => (
	<li className="flex items-start space-x-3 py-2">
		<CheckIcon />
		<span className="text-gray-600 text-sm">{text}</span>
	</li>
);

const DocumentAccordion: React.FC<{ documentKeys: string[] }> = ({
	documentKeys,
}) => {
	const [isOpen, setIsOpen] = useState(true);

    const { t } = useLanguage();

	return (
		<div className="bg-gray-50 border border-gray-200 rounded-lg mt-4">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full flex justify-between items-center p-4 text-left font-semibold text-cyan-800"
			>
				<span>{t("registration.step2.docs.title")}</span>
				<svg
					className={`w-5 h-5 transform transition-transform duration-300 ${
						isOpen ? "rotate-180" : ""
					}`}
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</button>
			{isOpen && (
				<div className="p-4 border-t border-gray-200">
					<ul className="space-y-1">
						{documentKeys.map((docKey) => (
							<DocumentListItem key={docKey} text={t(docKey)} />
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

interface TimelineStepProps {
	icon: React.ReactNode;
	title: string;
	isLast?: boolean;
	children: React.ReactNode;
}

const TimelineStep: React.FC<TimelineStepProps> = ({
	icon,
	title,
	isLast = false,
	children,
}) => (
	<div className="flex">
		<div className="flex flex-col items-center mr-6">
			<div
				className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-cyan-50 text-cyan-500 border-2 border-cyan-100"
				style={{ color: "#00bae2" }}
			>
				{icon}
			</div>
			{!isLast && (
				<div
					className="w-px h-full"
					style={{
						backgroundColor: "#00bae2",
						backgroundImage: "linear-gradient(180deg, #00bae2, #e0f7fa)",
					}}
				></div>
			)}
		</div>
		<div className={`pb-12 ${isLast ? "" : ""} w-full`}>
			<div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
				<h3 className="font-bold text-gray-800 text-lg mb-2">{title}</h3>
				<div className="text-gray-700 space-y-2">{children}</div>
			</div>
		</div>
	</div>
);

// --- Main Component ---
const RegistrationProcedure: React.FC = () => {
	const documents = [
		"registration.step2.docs.item1",
		"registration.step2.docs.item2",
		"registration.step2.docs.item3",
		"registration.step2.docs.item4",
		"registration.step2.docs.item5",
		"registration.step2.docs.item6",
		"registration.step2.docs.item7",
		"registration.step2.docs.item8",
		"registration.step2.docs.item9",
		"registration.step2.docs.item10",
		"registration.step2.docs.item11",
		"registration.step2.docs.item12",
		"registration.step2.docs.item13",
		"registration.step2.docs.item14",
	];

	const stepIcons = {
		step1: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
				/>
			</svg>
		),
		step2: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
				/>
			</svg>
		),
		step3: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		),
		step4: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.274-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.274.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
				/>
			</svg>
		),
	};

    const { t } = useLanguage();

	return (
		<div className="bg-gray-50 min-h-screen font-sans">
			<div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 mb-12 relative overflow-hidden">
					<div className="absolute top-0 right-0 -mt-16 -mr-16 w-40 h-40 rounded-full bg-cyan-50 opacity-70"></div>
					<div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-24 h-24 rounded-full bg-cyan-50 opacity-70"></div>
					<div className="relative text-center">
						<h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
							{t("registration.intro.title")}
						</h1>
						<div className="mt-4 text-lg max-w-5xl mx-auto space-y-2">
							<p className="text-gray-600">{t("registration.intro.line1")}</p>
							<p className="text-gray-600">{t("registration.intro.line2")}</p>
						</div>
						<a
							href="https://pmbs3.stiemahardhika.ac.id"
							target="_blank"
							rel="noopener noreferrer"
							className="mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white shadow-lg transform hover:-translate-y-1 transition-all duration-300"
							style={{ backgroundColor: "#00bae2" }}
						>
							{t("registration.cta.button")}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="ml-2 h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
								/>
							</svg>
						</a>
					</div>
				</div>

				{/* Timeline */}
				<div>
					<TimelineStep
						icon={stepIcons.step1}
						title={t("registration.step1.title")}
					>
						<p>{t("registration.step1.content")}</p>
					</TimelineStep>
					<TimelineStep
						icon={stepIcons.step2}
						title={t("registration.step2.title")}
					>
						<p>{t("registration.step2.content")}</p>
						<DocumentAccordion documentKeys={documents} />
					</TimelineStep>
					<TimelineStep
						icon={stepIcons.step3}
						title={t("registration.step3.title")}
					>
						<p>{t("registration.step3.content")}</p>
					</TimelineStep>
					<TimelineStep
						icon={stepIcons.step4}
						title={t("registration.step4.title")}
						isLast
					>
						<p>{t("registration.step4.content")}</p>
					</TimelineStep>
				</div>
			</div>
		</div>
	);
};

export default RegistrationProcedure;
