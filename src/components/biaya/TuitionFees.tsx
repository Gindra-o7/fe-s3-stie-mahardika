import { useLanguage } from "@/contexts/LanguageContext";
import React from "react";
import { ModalRegisOnline } from "../landing/ModalRegisOnline";

// --- Helper Components & Interfaces (within the same file) ---

// Interface for type safety for each fee item
interface FeeItemProps {
	label: string;
	amount: string;
	isSubItem?: boolean;
}

// A reusable component for displaying each line item of the fees
const FeeItem: React.FC<FeeItemProps> = ({
	label,
	amount,
	isSubItem = false,
}) => (
	<div
		className={`flex justify-between items-center py-4 ${
			isSubItem ? "ml-6" : ""
		}`}
	>
		<p className={`text-sm ${isSubItem ? "text-gray-500" : "text-gray-700"}`}>
			{label}
		</p>
		<p className="font-semibold text-gray-900 text-base">{amount}</p>
	</div>
);

// --- Main Component ---

const TuitionFees: React.FC = () => {
	const { t } = useLanguage();

	const feeData = [
		{ label: t('cost.details.item1'), amount: "Rp. 3.000.000,00" },
		{ label: t('cost.details.item2'), amount: "Rp. 3.000.000,00" },
		{
			label: t('cost.details.item3'),
			amount: "Rp. 20.000.000,00",
		},
	];

	const [isModalOpen, setIsModalOpen] = React.useState(false);

	return (
		// Main container with a light gray background
		<div className="bg-gray-100 py-5 flex items-center justify-center font-sans">
			{/* The main card for the content with a light theme */}
			<div className="w-full max-w-5xl bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
				{/* Header Section */}
				<div className="p-8 border-b border-gray-200">
					<h1 className="text-3xl font-bold text-gray-800 text-center tracking-tight">
						{t('cost.title')}
					</h1>
					<p className="text-gray-500 text-center mt-2 text-sm">
						{t('cost.subtitle')}
					</p>
				</div>

				{/* Schedule Information Section */}
				<div className="p-8">
					<div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 flex items-center space-x-4">
						{/* Calendar Icon */}
						<div className="flex-shrink-0">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-6 w-6"
								style={{ color: "#00bae2" }}
							>
								<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
								<line x1="16" y1="2" x2="16" y2="6"></line>
								<line x1="8" y1="2" x2="8" y2="6"></line>
								<line x1="3" y1="10" x2="21" y2="10"></line>
							</svg>
						</div>
						<div>
							<h3 className="font-semibold text-cyan-900">{t('cost.schedule.title')}</h3>
							<p className="text-cyan-800 text-sm">
								{t('cost.schedule.description')}
							</p>
						</div>
					</div>
				</div>

				{/* Fee Details Section */}
				<div className="px-8 pb-8">
					<h2 className="text-lg font-semibold text-gray-800 mb-4">
						{t('cost.details.title')}
					</h2>
					<div className="border border-gray-200 rounded-lg">
						{/* We map over the fee data to render each item */}
						{feeData.map((item, index) => (
							<div
								key={index}
								className={
									index < feeData.length - 1 ? "border-b border-gray-200" : ""
								}
							>
								<div className="px-6">
									<FeeItem label={item.label} amount={item.amount} />
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Footer / Call to Action */}
				<div className="bg-gray-50 p-6 text-center border-t border-gray-200">
					<button
						onClick={() => setIsModalOpen(true)}
						className="text-white font-semibold py-3 px-8 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
						style={{
							backgroundColor: "#00bae2",
							boxShadow:
								"0 10px 15px -3px rgba(0, 186, 226, 0.2), 0 4px 6px -2px rgba(0, 186, 226, 0.1)",
						}}
					>
						{t('cost.cta')}
					</button>
				</div>

				<ModalRegisOnline isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
			</div>
		</div>
	);
};

export default TuitionFees;