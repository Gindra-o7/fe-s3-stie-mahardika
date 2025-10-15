import React from "react";
import FotoKaprodi from "@/assets/foto/foto-kaprodi.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

// --- Helper Component for Focus Cards ---
interface FocusCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
}

const FocusCard: React.FC<FocusCardProps> = ({ icon, title, description }) => (
	<div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
		<div
			className="flex items-center justify-center h-12 w-12 rounded-full"
			style={{ backgroundColor: "#e0f7fa" }}
		>
			{icon}
		</div>
		<h3 className="mt-4 text-lg font-bold text-gray-800">{title}</h3>
		<p className="mt-1 text-sm text-gray-600">{description}</p>
	</div>
);

// --- Helper Component for Program Highlights ---
interface HighlightItemProps {
	icon: React.ReactNode;
	title: string;
	description: string;
}

const HighlightItem: React.FC<HighlightItemProps> = ({
	icon,
	title,
	description,
}) => (
	<div className="flex items-start">
		<div className="flex-shrink-0">
			<div
				className="flex items-center justify-center h-10 w-10 rounded-lg"
				style={{ backgroundColor: "#00bae2" }}
			>
				{icon}
			</div>
		</div>
		<div className="ml-4">
			<h3 className="text-lg leading-6 font-bold text-gray-900">{title}</h3>
			<p className="mt-1 text-base text-gray-600">{description}</p>
		</div>
	</div>
);

// --- Main Component ---
const StudyProfile: React.FC = () => {

    const { t } = useLanguage();

	const focusAreas = [
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					style={{ color: "#00bae2" }}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
					/>
				</svg>
			),
			title: t("profile.focus.strategy.title"),
			description: t("profile.focus.strategy.desc"),
		},
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					style={{ color: "#00bae2" }}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.274-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.274.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
			),
			title: t("profile.focus.hr.title"),
			description: t("profile.focus.hr.desc"),
		},
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					style={{ color: "#00bae2" }}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
					/>
				</svg>
			),
			title: t("profile.focus.finance.title"),
			description: t("profile.focus.finance.desc"),
		},
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					style={{ color: "#00bae2" }}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
					/>
				</svg>
			),
			title: t("profile.focus.marketing.title"),
			description: t("profile.focus.marketing.desc"),
		},
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					style={{ color: "#00bae2" }}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
					/>
				</svg>
			),
			title: t("profile.focus.entrepreneurship.title"),
			description: t("profile.focus.entrepreneurship.desc"),
		},
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					style={{ color: "#00bae2" }}
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
					/>
				</svg>
			),
			title: t("profile.focus.ict.title"),
			description: t("profile.focus.ict.desc"),
		},
	];

	const programHighlights = [
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
					/>
				</svg>
			),
			title: t("profile.highlights.research.title"),
			description: t("profile.highlights.research.desc"),
		},
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
					/>
				</svg>
			),
			title: t("profile.highlights.mentorship.title"),
			description: t("profile.highlights.mentorship.desc"),
		},
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M13 10V3L4 14h7v7l9-11h-7z"
					/>
				</svg>
			),
			title: t("profile.highlights.spirit.title"),
			description: t("profile.highlights.spirit.desc"),
		},
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-1-3.72a4 4 0 00-4 0A6 6 0 003 20v1h12z"
					/>
				</svg>
			),
			title: t("profile.highlights.leadership.title"),
			description: t("profile.highlights.leadership.desc"),
		},
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.7 9.928l.346 2.684A2 2 0 0010.023 15h3.954a2 2 0 001.977-2.388l.346-2.684M12 21a9 9 0 100-18 9 9 0 000 18z"
					/>
				</svg>
			),
			title: t("profile.highlights.network.title"),
			description: t("profile.highlights.network.desc"),
		},
		{
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
					/>
				</svg>
			),
			title: t("profile.highlights.graduate.title"),
			description: t("profile.highlights.graduate.desc"),
		},
	];

	return (
		<div className="bg-gray-50 min-h-screen font-sans">
			<div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center mb-16">
					<h2
						className="text-xl font-semibold tracking-wider uppercase"
						style={{ color: "#00bae2" }}
					>
						{t("profile.master.title")}
					</h2>
					<h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
						{t("profile.title")}
					</h1>
				</div>

				<div className="max-w-7xl mx-auto space-y-16">
					{/* Head of Program Section */}
					<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
						<div className="md:grid md:grid-cols-5 items-center">
							<div className="md:col-span-2">
								<img
									className="w-72 object-top mx-auto"
									src={FotoKaprodi}
									alt={t("profile.head.name")}
								/>
							</div>
							<div className="p-8 md:col-span-3">
								<h2
									className="text-base font-semibold tracking-wider uppercase"
									style={{ color: "#00bae2" }}
								>
									{t("profile.head.greeting.title")}
								</h2>
								<blockquote className="mt-4 border-l-4 border-cyan-200 pl-6">
									<p className="text-xl text-gray-700 italic leading-relaxed">
										"{t("profile.vision.content")}"
									</p>
								</blockquote>
								<figcaption className="mt-6">
									<div className="font-bold text-gray-900 text-lg">
										{t("profile.head.name")}
									</div>
									<div className="text-gray-600">{t("profile.head.title")}</div>
								</figcaption>
							</div>
						</div>
					</div>

					{/* NEW Modern Description Section */}
					<div
						className="bg-white p-8 rounded-2xl shadow-md border-t-4"
						style={{ borderColor: "#00bae2" }}
					>
						<h2 className="text-2xl font-bold text-gray-800 mb-4">
							{t("profile.description.title")}
						</h2>
						<p className="text-gray-600 leading-relaxed">
							{t("profile.description.intro")}
						</p>
						<div className="mt-10">
							<dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
								{programHighlights.map((item) => (
									<HighlightItem key={item.title} {...item} />
								))}
							</dl>
						</div>
					</div>

					{/* Focus Area Section */}
					<div>
						<h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
							{t("profile.focus.title")}
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{focusAreas.map((area) => (
								<FocusCard key={area.title} {...area} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudyProfile;
